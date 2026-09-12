from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Numeric,
    DateTime,
    ForeignKey,
    Boolean
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.connection import Base


# =========================================================
# USER
# =========================================================

class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(150),
        unique=True,
        nullable=False,
        index=True
    )

    phone = Column(
        String(20),
        unique=True,
        nullable=True
    )

    password_hash = Column(
        String(255),
        nullable=False
    )

    preferred_language = Column(
        String(10),
        default="hi"
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )

    household = relationship(
        "Household",
        back_populates="user",
        uselist=False
    )

    expenses = relationship(
        "Expense",
        back_populates="user"
    )

    conversations = relationship(
        "AssistantConversation",
        back_populates="user"
    )


# =========================================================
# HOUSEHOLD
# =========================================================

class Household(Base):

    __tablename__ = "households"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    household_name = Column(
        String(100),
        default="My Household"
    )

    location = Column(
        String(150),
        nullable=True
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )

    user = relationship(
        "User",
        back_populates="household"
    )


# =========================================================
# EXPENSE
# =========================================================

class Expense(Base):

    __tablename__ = "expenses"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    title = Column(
        String(150),
        nullable=False
    )

    category = Column(
        String(50),
        nullable=False
    )

    amount = Column(
        Numeric(10, 2),
        nullable=False
    )

    note = Column(
        Text,
        nullable=True
    )

    expense_date = Column(
        DateTime,
        server_default=func.now()
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )

    user = relationship(
        "User",
        back_populates="expenses"
    )


# =========================================================
# ASSISTANT CONVERSATION
# =========================================================

class AssistantConversation(Base):

    __tablename__ = "assistant_conversations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    question = Column(
        Text,
        nullable=False
    )

    answer = Column(
        Text,
        nullable=False
    )

    language = Column(
        String(10),
        default="hi"
    )

    intent = Column(
        String(100),
        nullable=True
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )

    user = relationship(
        "User",
        back_populates="conversations"
    )


# =========================================================
# GOVERNMENT SCHEME
# =========================================================

class GovernmentScheme(Base):

    __tablename__ = "government_schemes"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(200),
        nullable=False
    )

    description = Column(
        Text,
        nullable=False
    )

    eligibility = Column(
        Text,
        nullable=True
    )

    benefits = Column(
        Text,
        nullable=True
    )

    application_process = Column(
        Text,
        nullable=True
    )

    official_url = Column(
        String(500),
        nullable=True
    )

    state = Column(
        String(100),
        nullable=True
    )

    is_active = Column(
        Boolean,
        default=True
    )

    last_verified = Column(
        DateTime,
        nullable=True
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )