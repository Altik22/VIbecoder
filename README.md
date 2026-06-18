# VibeCoder

**VibeCoder** — a platform dedicated to creating and selling modern, high-tech websites.

## Architecture

### Frontend (React + Vite + TypeScript)
- **Home Page**: Interactive interface with smooth animations (Framer Motion + GSAP)
- **About Page**: Tech stack showcase with live GitHub API integration
- **AI Copilot**: Conversational AI chat for lead qualification

### Backend (FastAPI + Python)
- JWT authentication with SQLite (SQLAlchemy)
- AI Copilot service (OpenAI-powered)
- WhatsApp brief forwarding
- GitHub API proxy

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secret-key
OPENAI_API_KEY=your-openai-api-key
GITHUB_USERNAME=Altik22
WHATSAPP_PHONE=your-phone-number
```

## Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS + Framer Motion + GSAP
- FastAPI + SQLAlchemy + SQLite
- OpenAI API + WhatsApp Business API
