from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.routes.assistant import router as assistant_router
from app.routes.expenses import router as expenses_router
from app.routes import auth

from app.database.connection import engine, Base
from app import models

app = FastAPI(
    title="ASRA API",
    description="Backend API for the ASRA household support system",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# ROUTES
# ---------------------------------------------------------

app.include_router(
    assistant_router,
    prefix="/api"
)

app.include_router(
    expenses_router,
    prefix="/api"
)

app.include_router(
    auth.router,
    prefix="/api"
)

# ---------------------------------------------------------
# ROOT
# ---------------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "ASRA Backend is running",
        "status": "success"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/database-test")
def database_test():

    try:
        with engine.connect() as connection:

            result = connection.execute(
                text("SELECT 1")
            )

            value = result.scalar()

        return {
            "success": True,
            "database": "connected",
            "test_value": value
        }

    except Exception as error:

        return {
            "success": False,
            "database": "connection failed",
            "error": str(error)
        }