"""
CyberShield AI -- Pydantic Schemas
Sabhi 8 risk modules ke request/response models yahan hain.
"""

from pydantic import BaseModel
from typing import List


# ---------------- Fraud Engine ----------------
class FraudInput(BaseModel):
    upiScore: float
    deviceScore: float


class FraudResult(BaseModel):
    totalRiskScore: float
    status: str
    reasons: List[str]


# ---------------- SIM Swap ----------------
class SimSwapInput(BaseModel):
    simChangedHours: float
    otpFailures: int
    newDevice: bool
    highValueTransaction: bool


class SimSwapResult(BaseModel):
    score: float
    riskLevel: str
    reasons: List[str]


# ---------------- UPI Risk ----------------
class UPIInput(BaseModel):
    amount: float
    deviceAgeDays: int
    isNewSIM: bool
    isNewDevice: bool
    vpnDetected: bool


class UPIResult(BaseModel):
    riskScore: float
    status: str
    reasons: List[str]


# ---------------- Velocity Risk ----------------
class VelocityRiskInput(BaseModel):
    transactionsPerMinute: float
    transactionsPerHour: float
    beneficiaryAdditions: int
    failedAttempts: int


class VelocityRiskResult(BaseModel):
    score: float
    riskLevel: str
    reasons: List[str]


# ---------------- Geo Risk ----------------
class GeoRiskInput(BaseModel):
    country: str
    vpnDetected: bool
    torDetected: bool
    ipReputationScore: float
    crossBorderTransaction: bool


class GeoRiskResult(BaseModel):
    score: float
    status: str
    warnings: List[str]


# ---------------- Impossible Travel ----------------
class ImpossibleTravelInput(BaseModel):
    firstLocation: str
    secondLocation: str
    distanceKM: float
    timeDifferenceMinutes: float


class ImpossibleTravelResult(BaseModel):
    requiredSpeedKMPH: float
    score: float
    status: str
    warnings: List[str]


# ---------------- Deepfake Shield ----------------
class FaceLivenessInput(BaseModel):
    blinkDetected: bool
    headMovementDetected: bool
    reflectionScore: float
    textureScore: float


class FaceLivenessResult(BaseModel):
    score: float
    status: str
    reasons: List[str]


class VoiceCloneInput(BaseModel):
    pitchVariation: float
    breathingDetected: bool
    syntheticArtifacts: float


class VoiceCloneResult(BaseModel):
    score: float
    status: str
    reasons: List[str]


class DeepfakeAnalysisInput(BaseModel):
    face: FaceLivenessInput
    voice: VoiceCloneInput


class DeepfakeRiskResult(BaseModel):
    faceRisk: float
    voiceRisk: float
    overallRisk: float
    status: str
    reasons: List[str]


# ---------------- Device Fingerprint ----------------
class DeviceInput(BaseModel):
    isNewDevice: bool
    isRooted: bool
    isEmulator: bool
    vpnDetected: bool
    browserChanged: bool
    osChanged: bool


class DeviceResult(BaseModel):
    riskScore: float
    status: str
    reasons: List[str]