# 🍳 CookBookAI — AI-Powered Recipe Platform 

**CookBookAI** is a full-stack application combining intelligent recipe generation powered by GPT-4 mini with a modern frontend built in Next.js and a FastAPI backend in Python.  
It allows users to request, save, and visualize recipes with automatically generated images using Unsplash or DALL·E.

---

## 🧱 Project Structure

```
CookBookAI/
├── backend/
│   ├── app/
│   ├── venv/
│   ├── recipes.db
│   ├── .env
│   └── main.py
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── node_modules/
│   ├── package.json
│   ├── next.config.ts
│   └── tailwind.config.ts
│
├── .gitignore
└── README.md
```

---

## ⚙️ Tech Stack

### Backend
- **FastAPI** for REST API endpoints.  
- **LangChain / LangGraph** for stateful conversational logic.  
- **ChatOpenAI (GPT-4 mini)** for recipe generation.  
- **Pydantic** for schema validation.  
- **dotenv** for environment variable management.  
- **SQLite** for local storage (`recipes.db`).

### Frontend
- **Next.js 15** with App Router.  
- **TypeScript** for strong typing.  
- **TailwindCSS**, **HeroUI**, and **Lucide React** for styling and icons.  
- **React Hooks** (`useState`, `useEffect`) for state management.  
- **API layer** via `/lib/api.ts` for backend integration.

---

## 🧠 System Flow

1. The user asks for a recipe (e.g., “Generate me a vegan pasta recipe”).  
2. The backend agent creates a JSON recipe object with title, labels, ingredients, and instructions.  
3. If Unsplash has no matching image, DALL·E is used as a fallback.  
4. The recipe is saved to a local SQLite database via FastAPI.

---

## 🧡 Credits

Developed by **Roy Naor**

