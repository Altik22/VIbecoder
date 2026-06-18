import logging

from fastapi import APIRouter

from app.schemas.copilot import ChatRequest, ChatResponse
from app.services.copilot_service import get_ai_response
from app.services.whatsapp_service import send_whatsapp_brief

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/copilot", tags=["AI Copilot"])


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    messages = [{"role": m.role, "content": m.content} for m in request.messages]

    response_text, brief_complete, brief = get_ai_response(messages)

    if brief_complete and brief:
        logger.info(f"Brief complete for client: {brief.get('client_name', 'Unknown')}")
        await send_whatsapp_brief(brief)

    return ChatResponse(
        message=response_text,
        brief_complete=brief_complete,
        brief=brief,
    )
