from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.deepfake import router as deepfake_health_router
from app.routes.risk_routes import router as risk_router

app = FastAPI(
    title="CyberShield AI",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(deepfake_health_router)
app.include_router(risk_router)

@app.get("/")
def root():
    return {
        "message": "CyberShield AI Backend Running"
    }