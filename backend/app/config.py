from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "VibeCoder API"
    SECRET_KEY: str = "change-me-in-production-use-a-strong-random-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    DATABASE_URL: str = "sqlite:///./vibecoder.db"

    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"

    GITHUB_USERNAME: str = "Altik22"

    WHATSAPP_PHONE: str = ""
    WHATSAPP_API_URL: str = ""
    WHATSAPP_API_TOKEN: str = ""

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
