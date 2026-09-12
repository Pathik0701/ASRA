from fastapi import APIRouter
from pydantic import BaseModel

from app.services.assistant_service import generate_response


router = APIRouter(
    prefix="/assistant",
    tags=["Assistant"]
)


# ---------------------------------------------------------
# REQUEST MODEL
# ---------------------------------------------------------

class AssistantRequest(BaseModel):
    question: str


# ---------------------------------------------------------
# ASSISTANT ENDPOINT
# ---------------------------------------------------------

@router.post("/ask")
def ask_assistant(request: AssistantRequest):

    answer = generate_response(
        request.question
    )

    return {
        "success": True,
        "question": request.question,
        "answer": answer
    }