from fastapi import APIRouter, HTTPException
import httpx

from app.config import settings

router = APIRouter(prefix="/api/github", tags=["GitHub"])


@router.get("/repos")
async def get_repos():
    """Proxy GitHub API to avoid CORS and rate limits from the frontend."""
    url = f"https://api.github.com/users/{settings.GITHUB_USERNAME}/repos"
    params = {"sort": "updated", "per_page": 30, "type": "owner"}

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params, timeout=10.0)
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"GitHub API error: {str(e)}")
