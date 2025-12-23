# 🍳 CookBookAI

AI-powered digital recipe book that pairs a polished **Next.js** experience with a **FastAPI** backend, **Firebase Auth** sign-in, and a LangGraph-driven agent that generates Hebrew recipes, finds images, and stores everything in SQLite.

## ✨ Features
- **AI recipe agent (Hebrew-first):** LangGraph workflow calls OpenAI to produce structured recipe JSON, enriches it with Unsplash/DALL·E imagery, persists it, and returns human-friendly text for the chat UI.【F:backend/app/core/agent.py†L12-L164】【F:backend/app/tools.py†L12-L94】
- **Authenticated recipe CRUD:** FastAPI routes require Firebase ID tokens and scope recipes to the signed-in user for creation, listing, update, and delete.【F:backend/app/routes/recipes.py†L7-L55】
- **Recipe browser & filters:** Next.js page fetches recipes, supports text search, category filters, sorting, and inline creation modal for new dishes.【F:frontend/app/recipes/page.tsx†L22-L199】
- **Firebase sign-in:** Frontend initializes Firebase Auth (email/Google) for login and token acquisition used in API calls.【F:frontend/lib/firebase.ts†L1-L16】【F:frontend/lib/fetchWithAuth.ts†L1-L30】
- **Media uploads (optional):** Cloudinary widget can upload custom photos for recipes when the related env vars are provided.【F:frontend/components/CloudinaryUpload.tsx†L10-L84】

## 🧱 Tech Stack
**Frontend**
- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Firebase Web SDK.【F:frontend/package.json†L1-L29】

**Backend**
- FastAPI, SQLAlchemy (SQLite), Pydantic, Firebase Admin SDK, LangGraph + LangChain OpenAI, OpenAI Images, Requests, python-dotenv.【F:backend/app/main.py†L1-L28】【F:backend/app/core/agent.py†L1-L164】【F:backend/app/core/firebase_auth.py†L1-L50】【F:backend/app/tools.py†L1-L94】

## 📂 Folder Structure
```
CookBookAI/
├── backend/
│   ├── app/
│   │   ├── core/            # Agent workflow + Firebase token verification
│   │   ├── routes/          # API routers (recipes, agent, users)
│   │   ├── models.py        # SQLAlchemy models
│   │   ├── schemas.py       # Pydantic schemas
│   │   ├── database.py      # SQLite engine/session helpers
│   │   └── main.py          # FastAPI app entry
│   └── requirements.txt     # Backend dependencies
├── frontend/
│   ├── app/                 # Next.js routes & pages
│   ├── components/          # UI components & modals
│   ├── lib/                 # API + Firebase helpers
│   ├── public/              # Static assets (images, video)
│   └── next.config.ts
└── README.md
```

## 🚀 Getting Started
### Prerequisites
- Python 3.11+
- Node.js 18+ and npm
- OpenAI API key, Firebase project with Web credentials, and Unsplash access key (optional fallback to DALL·E for images)

### Backend Setup
1. Copy environment variables (see `.env` guidance below).
2. Install dependencies:
   ```bash
   cd backend
   python -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   ```
3. Run the API (SQLite file `recipes.db` is created locally):
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup
1. Install packages:
   ```bash
   cd frontend
   npm install
   ```
2. Configure Firebase/Web env vars (see below) and ensure the backend URL in `frontend/lib/api.ts` matches your FastAPI host/port.【F:frontend/lib/api.ts†L1-L97】
3. Start the dev server:
   ```bash
   npm run dev
   ```

## 🔐 Environment Variables
Create a `.env` in `backend/` (or export variables) with:
- `OPENAI_API_KEY` – for ChatOpenAI + image generation.【F:backend/app/tools.py†L12-L31】
- `UNSPLASH_ACCESS_KEY` – for Unsplash search; if missing, image generation falls back to DALL·E.【F:backend/app/tools.py†L23-L45】
- `FIREBASE_ADMIN_CREDENTIALS` – JSON string of Firebase service account, with `\n` escaped in the private key.【F:backend/app/core/firebase_auth.py†L11-L36】
- Optional: customize `SQLALCHEMY_DATABASE_URL` in `database.py` if you prefer another database backend.【F:backend/app/database.py†L1-L18】

For the frontend, set a `.env.local` with keys used by the Cloudinary widget:
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `NEXT_PUBLIC_GOOGLE_API_KEY`
- `NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID`
- (If you externalize Firebase config, add the standard `NEXT_PUBLIC_FIREBASE_*` entries and import them into `frontend/lib/firebase.ts`.)

## 🛠 Running Locally
1. Start the backend server (`uvicorn ...` as above).
2. Launch the frontend (`npm run dev`).
3. Sign in via Firebase (Google/email) to obtain an ID token; the UI uses it automatically for API calls.【F:frontend/lib/fetchWithAuth.ts†L1-L30】
4. Create recipes manually or via the AI agent; generated recipes will include images and persist to your user account.【F:backend/app/routes/agent_routes.py†L1-L30】【F:backend/app/tools.py†L12-L94】

## 🔒 Security Notes
- Keep `FIREBASE_ADMIN_CREDENTIALS` out of version control; it must only be loaded from environment variables at runtime.【F:backend/app/core/firebase_auth.py†L11-L36】
- Frontend Firebase config is currently hard-coded; move it to environment variables before production to avoid exposing project keys.【F:frontend/lib/firebase.ts†L4-L15】
- The API URL is fixed to `http://127.0.0.1:8000`; promote it to an env-based setting when deploying.【F:frontend/lib/api.ts†L3-L97】
- Store OpenAI/Unsplash keys in `.env` and avoid logging them. Service accounts should have least-privilege roles.

## 🔎 Code Review Notes
- `users` router does not verify Firebase tokens; consider reusing `verify_firebase_token` to avoid unauthenticated user creation.【F:backend/app/routes/users.py†L1-L29】【F:backend/app/core/firebase_auth.py†L39-L50】
- Frontend depends on Cloudinary env vars but lacks validation; adding runtime checks would improve UX before opening the widget.【F:frontend/components/CloudinaryUpload.tsx†L10-L84】
- Dependency check: `next-cloudinary` is listed but the widget uses Cloudinary’s script directly—if unused elsewhere, consider removing the package to slim the bundle.【F:frontend/package.json†L14-L23】【F:frontend/components/CloudinaryUpload.tsx†L10-L84】
- Persisted `API_URL` and Firebase config are constants; lifting them into env-configured values would simplify multi-environment deployments.【F:frontend/lib/api.ts†L3-L97】【F:frontend/lib/firebase.ts†L4-L16】

## 🗺️ Roadmap
- Apply auth middleware to all user-facing endpoints and add per-user rate limiting.
- Externalize frontend configs (API base URL, Firebase keys) into `.env.local` with type-safe loading.
- Add automated tests (unit + integration) for agent workflow and recipe CRUD.
- Extend database beyond SQLite for production (e.g., Postgres) and add migrations.

## 📦 Backend Requirements (bonus)
A minimal dependency list is provided at `backend/requirements.txt` for reproducing the backend environment.【F:backend/requirements.txt†L1-L11】
