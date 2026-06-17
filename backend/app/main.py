
from fastapi import FastAPI

from app.routes.deepfake import router as deepfake_router

app = FastAPI(
    title="CyberShield AI",
    version="1.0"
)

app.include_router(
    deepfake_router
)

@app.get("/")
def root():
    return {
        "message": "CyberShield AI Backend Running"
    }

