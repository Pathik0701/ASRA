from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models import Expense


router = APIRouter(
    prefix="/expenses",
    tags=["Expenses"]
)


# =========================================================
# REQUEST MODEL
# =========================================================

class ExpenseCreate(BaseModel):

    user_id: int

    title: str = Field(
        min_length=1,
        max_length=150
    )

    category: str = Field(
        min_length=1,
        max_length=50
    )

    amount: float = Field(
        gt=0
    )

    note: str | None = None


# =========================================================
# RESPONSE HELPER
# =========================================================

def expense_to_dict(expense: Expense):

    return {
        "id": expense.id,
        "user_id": expense.user_id,
        "title": expense.title,
        "category": expense.category,
        "amount": float(expense.amount),
        "note": expense.note,
        "expense_date": expense.expense_date,
        "created_at": expense.created_at
    }


# =========================================================
# ADD EXPENSE
# =========================================================

@router.post("")
def create_expense(
    expense_data: ExpenseCreate,
    db: Session = Depends(get_db)
):

    expense = Expense(
        user_id=expense_data.user_id,
        title=expense_data.title,
        category=expense_data.category,
        amount=expense_data.amount,
        note=expense_data.note
    )

    db.add(expense)

    db.commit()

    db.refresh(expense)

    return {
        "success": True,
        "message": "Expense added successfully",
        "expense": expense_to_dict(expense)
    }


# =========================================================
# GET ALL EXPENSES
# =========================================================

@router.get("")
def get_expenses(
    user_id: int,
    db: Session = Depends(get_db)
):

    expenses = (
        db.query(Expense)
        .filter(Expense.user_id == user_id)
        .order_by(Expense.created_at.desc())
        .all()
    )

    return {
        "success": True,
        "count": len(expenses),
        "expenses": [
            expense_to_dict(expense)
            for expense in expenses
        ]
    }


# =========================================================
# GET ONE EXPENSE
# =========================================================

@router.get("/{expense_id}")
def get_expense(
    expense_id: int,
    db: Session = Depends(get_db)
):

    expense = (
        db.query(Expense)
        .filter(Expense.id == expense_id)
        .first()
    )

    if not expense:

        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    return {
        "success": True,
        "expense": expense_to_dict(expense)
    }


# =========================================================
# DELETE EXPENSE
# =========================================================

@router.delete("/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db)
):

    expense = (
        db.query(Expense)
        .filter(Expense.id == expense_id)
        .first()
    )

    if not expense:

        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    db.delete(expense)

    db.commit()

    return {
        "success": True,
        "message": "Expense deleted successfully"
    }