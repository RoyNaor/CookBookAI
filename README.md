# 🍳 CookBookAI

> **AI-powered cooking assistant**  
> Generate recipes, manage ingredients, and interact with an intelligent chef agent – all in one modern web app.

---

## ✨ Overview

**CookBookAI** is a full-stack application that combines:
- A modern **Next.js** frontend
- A robust **FastAPI** backend
- **Firebase Authentication**
- An **AI agent** for recipe generation and cooking assistance

The goal is to provide a smart, intuitive platform where users can explore recipes, interact with an AI chef, and manage personalized cooking experiences.

---

## 🧠 Key Features

- 🤖 **AI Chef Agent** – conversational recipe generation & guidance  
- 📖 **Recipe Management** – create, view, and explore recipes  
- 🔐 **Firebase Authentication** – secure user login  
- ⚡ **FastAPI Backend** – clean, scalable API  
- 🎨 **Next.js Frontend** – modern UI with App Router  
- 🔄 **CORS-ready** – seamless frontend ↔ backend communication  

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 15**
- **TypeScript**
- **Tailwind CSS**
- **App Router**

### Backend
- **FastAPI**
- **SQLAlchemy**
- **Firebase Admin SDK**
- **LangChain / LangGraph**
- **OpenAI API**

---

## 📂 Project Structure

```txt
CookBookAI/
├── backend/
│   ├── app/
│   │   ├── core/           # Firebase, AI agent logic
│   │   ├── routes/         # API routes (recipes, agent, users)
│   │   ├── models.py       # SQLAlchemy models
│   │   ├── schemas.py      # Pydantic schemas
│   │   ├── database.py
│   │   └── main.py         # FastAPI entry point
│   ├── requirements.txt
│   └── venv/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── next.config.ts
│
└── README.md
