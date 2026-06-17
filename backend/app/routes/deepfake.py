
from fastapi import APIRouter

router = APIRouter(
    prefix="/api/deepfake",
    tags=["Deepfake"]
)

@router.get("/health")
def health_check():
    return {
        "module": "Deepfake Shield",
        "status": "online"
    }

@router.get("/analyze")
def analyze():
    return {
        "faceRisk": 65,
        "voiceRisk": 40,
        "overallRisk": 53,
        "status": "REVIEW"
    }

