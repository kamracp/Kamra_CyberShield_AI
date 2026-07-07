"""
CyberShield AI -- Risk API Routes
Sabhi 8 modules ke real endpoints yahan hain. Frontend inhe fetch()
se call karta hai (koi bhi calculation ab frontend me nahi hoti).
"""

from fastapi import APIRouter

from app.models.schemas import (
    FraudInput, FraudResult,
    SimSwapInput, SimSwapResult,
    UPIInput, UPIResult,
    VelocityRiskInput, VelocityRiskResult,
    GeoRiskInput, GeoRiskResult,
    ImpossibleTravelInput, ImpossibleTravelResult,
    DeepfakeAnalysisInput, DeepfakeRiskResult,
    DeviceInput, DeviceResult,
)
from app.services import risk_engine

router = APIRouter(prefix="/api", tags=["Risk Engine"])


@router.post("/fraud/analyze", response_model=FraudResult)
def analyze_fraud(payload: FraudInput):
    return risk_engine.calculate_fraud_risk(payload.upiScore, payload.deviceScore)


@router.post("/sim-swap/analyze", response_model=SimSwapResult)
def analyze_sim_swap(payload: SimSwapInput):
    return risk_engine.calculate_sim_swap_risk(payload)


@router.post("/upi/analyze", response_model=UPIResult)
def analyze_upi(payload: UPIInput):
    return risk_engine.calculate_upi_risk(payload)


@router.post("/velocity-risk/analyze", response_model=VelocityRiskResult)
def analyze_velocity_risk(payload: VelocityRiskInput):
    return risk_engine.calculate_velocity_risk(payload)


@router.post("/geo-risk/analyze", response_model=GeoRiskResult)
def analyze_geo_risk(payload: GeoRiskInput):
    return risk_engine.calculate_geo_risk(payload)


@router.post("/impossible-travel/analyze", response_model=ImpossibleTravelResult)
def analyze_impossible_travel(payload: ImpossibleTravelInput):
    return risk_engine.calculate_impossible_travel(payload)


@router.post("/deepfake/analyze", response_model=DeepfakeRiskResult)
def analyze_deepfake(payload: DeepfakeAnalysisInput):
    face_result = risk_engine.calculate_face_liveness(payload.face)
    voice_result = risk_engine.calculate_voice_clone_risk(payload.voice)
    return risk_engine.calculate_deepfake_risk(face_result.score, voice_result.score)


@router.post("/device-fingerprint/analyze", response_model=DeviceResult)
def analyze_device_fingerprint(payload: DeviceInput):
    return risk_engine.calculate_device_risk(payload)