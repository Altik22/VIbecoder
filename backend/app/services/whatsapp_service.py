import logging

import httpx

from app.config import settings

logger = logging.getLogger(__name__)


async def send_whatsapp_brief(brief: dict) -> bool:
    """Send the collected brief to the owner's WhatsApp."""

    if not settings.WHATSAPP_API_URL or not settings.WHATSAPP_API_TOKEN:
        logger.info("WhatsApp not configured — logging brief instead")
        logger.info(f"Brief to forward: {brief}")
        return False

    message = _format_brief_message(brief)

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                settings.WHATSAPP_API_URL,
                headers={
                    "Authorization": f"Bearer {settings.WHATSAPP_API_TOKEN}",
                    "Content-Type": "application/json",
                },
                json={
                    "messaging_product": "whatsapp",
                    "to": settings.WHATSAPP_PHONE,
                    "type": "text",
                    "text": {"body": message},
                },
                timeout=10.0,
            )
            response.raise_for_status()
            logger.info("WhatsApp brief sent successfully")
            return True
    except Exception as e:
        logger.error(f"Failed to send WhatsApp message: {e}")
        return False


def _format_brief_message(brief: dict) -> str:
    """Format the brief as a readable WhatsApp message."""
    lines = [
        "🆕 *New Project Brief from VibeCoder AI Copilot*",
        "",
        f"👤 *Client:* {brief.get('client_name', 'N/A')}",
        f"📧 *Email:* {brief.get('client_email', 'N/A')}",
        f"📱 *Phone:* {brief.get('client_phone', 'N/A')}",
        "",
        f"📋 *Project Type:* {brief.get('project_type', 'N/A')}",
        f"📝 *Description:* {brief.get('description', 'N/A')}",
        "",
        "*Features:*",
    ]

    features = brief.get("features", [])
    for feat in features:
        lines.append(f"  • {feat}")

    lines.extend([
        "",
        f"🎨 *Design:* {brief.get('design_preferences', 'N/A')}",
        f"💰 *Budget:* {brief.get('budget_range', 'N/A')}",
        f"📅 *Timeline:* {brief.get('timeline', 'N/A')}",
        f"📌 *Notes:* {brief.get('additional_notes', 'N/A')}",
    ])

    return "\n".join(lines)
