from app.core.agent import workflow_agent
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.firebase_auth import verify_firebase_token

router = APIRouter(prefix="/agent", tags=["Agent"])
chat_memory = {}

class PromptRequest(BaseModel):
    prompt: str
    thread_id: str = "default"

@router.post("/generate")
async def generate_recipe(req: PromptRequest, user=Depends(verify_firebase_token)):
    try:
        if req.thread_id not in chat_memory:
            chat_memory[req.thread_id] = []
            
        chat_memory[req.thread_id].append({"role": "user", "content": req.prompt})

        result = await workflow_agent.ainvoke(
            {"messages": chat_memory[req.thread_id]},
            config={"configurable": {"thread_id": req.thread_id}},
        )

        display_text = result["display_text"]
        chat_memory[req.thread_id].append({"role": "assistant", "content": display_text})
        return {"reply": display_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"שגיאה בהרצת הסוכן: {e}")
