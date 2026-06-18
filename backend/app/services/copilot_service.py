import json
import logging

from openai import OpenAI

from app.config import settings

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are the VibeCoder AI Copilot — a friendly, professional AI project manager for a web development studio called VibeCoder.

Your job is to have a natural conversation with potential clients to understand their project needs. You are NOT a generic chatbot — you are a sales-qualified lead collector.

## Your Goals (in order):
1. **Understand the project**: What kind of website/app do they need? (e-commerce, landing page, SaaS, portfolio, etc.)
2. **Gather design preferences**: Style, colors, reference sites, mood/vibe
3. **Determine features**: What functionality do they need? (auth, payments, CMS, API integrations, etc.)
4. **Get budget & timeline**: Approximate budget range and desired launch date
5. **Collect contact info**: Name, email, phone/WhatsApp number

## Rules:
- Be conversational and warm, not robotic or form-like
- Ask ONE question at a time — don't overwhelm
- Use markdown formatting for clarity
- If the client is vague, suggest options to help them decide
- Once you have ALL required info (project type, key features, contact name, email, and phone), generate a structured brief
- When the brief is complete, end with: `[BRIEF_COMPLETE]` followed by a JSON block:

```json
{
  "client_name": "...",
  "client_email": "...",
  "client_phone": "...",
  "project_type": "...",
  "description": "...",
  "features": ["..."],
  "design_preferences": "...",
  "budget_range": "...",
  "timeline": "...",
  "additional_notes": "..."
}
```

- Keep responses concise (2-4 sentences max per message)
- Be enthusiastic about their project — make them feel excited!
"""


def get_ai_response(messages: list[dict]) -> tuple[str, bool, dict | None]:
    """Get response from OpenAI and check if brief is complete."""

    if not settings.OPENAI_API_KEY:
        return _get_fallback_response(messages), False, None

    try:
        client = OpenAI(api_key=settings.OPENAI_API_KEY)

        api_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        for msg in messages:
            if msg["role"] in ("user", "assistant"):
                api_messages.append({"role": msg["role"], "content": msg["content"]})

        response = client.chat.completions.create(
            model=settings.OPENAI_MODEL,
            messages=api_messages,
            temperature=0.7,
            max_tokens=500,
        )

        content = response.choices[0].message.content or ""

        brief_complete = "[BRIEF_COMPLETE]" in content
        brief = None

        if brief_complete:
            try:
                json_start = content.index("{")
                json_end = content.rindex("}") + 1
                brief = json.loads(content[json_start:json_end])
                content = content[:content.index("[BRIEF_COMPLETE]")].strip()
            except (ValueError, json.JSONDecodeError):
                brief_complete = False

        return content, brief_complete, brief

    except Exception as e:
        logger.error(f"OpenAI API error: {e}")
        return _get_fallback_response(messages), False, None


def _get_fallback_response(messages: list[dict]) -> str:
    """Smart fallback when OpenAI API is not configured."""
    user_messages = [m for m in messages if m["role"] == "user"]
    count = len(user_messages)

    responses = [
        "Great question! So, **what type of website** are you looking to build? For example:\n\n- 🛒 E-commerce / Online Store\n- 🏢 Corporate / Business site\n- 🎨 Portfolio / Personal brand\n- 📱 Web Application (SaaS)\n- 📄 Landing Page\n\nOr something else entirely?",
        "Awesome choice! Now let's talk **design** — do you have any preferences?\n\n- Any **color schemes** you like?\n- Any **reference websites** that inspire you?\n- Preferred style: minimal, bold, playful, corporate?",
        "Perfect! What **key features** does your site need?\n\nCommon ones include:\n- 🔐 User authentication\n- 💳 Payment processing\n- 📊 Admin dashboard\n- 📝 Blog / CMS\n- 🔍 Search functionality\n- 📧 Contact forms",
        "Great! A couple more things:\n\n- 💰 What's your **approximate budget range**?\n- 📅 Do you have a **target launch date**?",
        "Almost done! Could you share your **contact details** so our team can follow up?\n\n- 👤 Your **name**\n- 📧 **Email** address\n- 📱 **Phone/WhatsApp** number",
        "Thank you so much for sharing all that! 🎉\n\nI've compiled everything into a project brief. Our team at VibeCoder will review it and reach out to you within 24 hours.\n\n**We're excited to bring your vision to life!** 🚀",
    ]

    idx = min(count, len(responses) - 1)
    return responses[idx]
