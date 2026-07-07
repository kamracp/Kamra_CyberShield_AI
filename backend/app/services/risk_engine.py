"""
CyberShield AI -- Risk Calculation Engine
Sabhi 8 modules ka asli business logic yahan hai (frontend TypeScript
engines se hi 1:1 port kiya gaya hai, taaki behavior same rahe).
"""

from app.models.schemas import (
    FraudResult,
    SimSwapInput, SimSwapResult,
    UPIInput, UPIResult,
    VelocityRiskInput, VelocityRiskResult,
    GeoRiskInput, GeoRiskResult,
    ImpossibleTravelInput, ImpossibleTravelResult,
    FaceLivenessInput, FaceLivenessResult,
    VoiceCloneInput, VoiceCloneResult,
    DeepfakeRiskResult,
    DeviceInput, DeviceResult,
)


# ---------------- Fraud Engine ----------------
def calculate_fraud_risk(upi_score: float, device_score: float) -> FraudResult:
    total_risk_score = upi_score + device_score

    status = "SAFE"
    if total_risk_score >= 150:
        status = "BLOCK"
    elif total_risk_score >= 80:
        status = "CRITICAL"
    elif total_risk_score >= 40:
        status = "WARNING"

    reasons = []
    if upi_score > 0:
        reasons.append(f"UPI Risk Score: {upi_score}")
    if device_score > 0:
        reasons.append(f"Device Risk Score: {device_score}")

    return FraudResult(totalRiskScore=total_risk_score, status=status, reasons=reasons)


# ---------------- SIM Swap ----------------
def calculate_sim_swap_risk(input: SimSwapInput) -> SimSwapResult:
    score = 0
    reasons = []

    if input.simChangedHours < 24:
        score += 50
        reasons.append("SIM changed within last 24 hours")
    elif input.simChangedHours < 168:
        score += 25
        reasons.append("SIM changed within last 7 days")

    if input.otpFailures >= 5:
        score += 25
        reasons.append("Multiple OTP failures detected")
    elif input.otpFailures >= 3:
        score += 15
        reasons.append("Several OTP failures detected")

    if input.newDevice:
        score += 15
        reasons.append("Transaction from new device")

    if input.highValueTransaction:
        score += 20
        reasons.append("High value transaction detected")

    risk_level = "SAFE"
    if score >= 90:
        risk_level = "BLOCK"
    elif score >= 60:
        risk_level = "CRITICAL"
    elif score >= 30:
        risk_level = "WARNING"

    return SimSwapResult(score=score, riskLevel=risk_level, reasons=reasons)


# ---------------- UPI Risk ----------------
def calculate_upi_risk(input: UPIInput) -> UPIResult:
    risk_score = 0
    reasons = []

    if input.amount > 50000:
        risk_score += 25
        reasons.append("High Transaction Amount")

    if input.deviceAgeDays < 7:
        risk_score += 20
        reasons.append("New Device Detected")

    if input.isNewSIM:
        risk_score += 25
        reasons.append("Recent SIM Change")

    if input.isNewDevice:
        risk_score += 20
        reasons.append("Unknown Device")

    if input.vpnDetected:
        risk_score += 30
        reasons.append("VPN Detected")

    status = "SAFE"
    if risk_score >= 70:
        status = "BLOCK"
    elif risk_score >= 40:
        status = "CRITICAL"
    elif risk_score >= 20:
        status = "WARNING"

    return UPIResult(riskScore=risk_score, status=status, reasons=reasons)


# ---------------- Velocity Risk ----------------
def calculate_velocity_risk(input: VelocityRiskInput) -> VelocityRiskResult:
    score = 0
    reasons = []

    if input.transactionsPerMinute >= 20:
        score += 50
        reasons.append("Very high transaction velocity detected")
    elif input.transactionsPerMinute >= 10:
        score += 30
        reasons.append("High transaction velocity detected")
    elif input.transactionsPerMinute >= 5:
        score += 15
        reasons.append("Moderate transaction velocity detected")

    if input.transactionsPerHour >= 100:
        score += 25
        reasons.append("Excessive hourly transactions")
    elif input.transactionsPerHour >= 50:
        score += 15
        reasons.append("High hourly transactions")

    if input.beneficiaryAdditions >= 10:
        score += 20
        reasons.append("Multiple beneficiaries added")
    elif input.beneficiaryAdditions >= 5:
        score += 10
        reasons.append("Several beneficiaries added")

    if input.failedAttempts >= 10:
        score += 20
        reasons.append("Excessive failed attempts")
    elif input.failedAttempts >= 5:
        score += 10
        reasons.append("Multiple failed attempts")

    risk_level = "SAFE"
    if score >= 80:
        risk_level = "BLOCK"
    elif score >= 50:
        risk_level = "CRITICAL"
    elif score >= 20:
        risk_level = "WARNING"

    return VelocityRiskResult(score=score, riskLevel=risk_level, reasons=reasons)


# ---------------- Geo Risk ----------------
HIGH_RISK_COUNTRIES = ["North Korea", "Iran", "Syria", "Afghanistan", "Nigeria", "Russia"]


def calculate_geo_risk(input: GeoRiskInput) -> GeoRiskResult:
    score = 0
    warnings = []

    if input.vpnDetected:
        score += 25
        warnings.append("VPN Detected")

    if input.torDetected:
        score += 40
        warnings.append("TOR Network Detected")

    if input.country in HIGH_RISK_COUNTRIES:
        score += 20
        warnings.append("High Risk Geography Detected")

    if input.crossBorderTransaction:
        score += 15
        warnings.append("Cross Border Transaction")

    if input.ipReputationScore < 30:
        score += 30
        warnings.append("Poor IP Reputation")
    elif input.ipReputationScore < 60:
        score += 15
        warnings.append("Average IP Reputation")

    status = "SAFE"
    if score >= 80:
        status = "BLOCK"
    elif score >= 60:
        status = "CRITICAL"
    elif score >= 30:
        status = "WARNING"

    return GeoRiskResult(score=score, status=status, warnings=warnings)


# ---------------- Impossible Travel ----------------
def calculate_impossible_travel(input: ImpossibleTravelInput) -> ImpossibleTravelResult:
    hours = input.timeDifferenceMinutes / 60 if input.timeDifferenceMinutes > 0 else 0.01
    required_speed_kmph = input.distanceKM / hours

    score = 0
    warnings = []

    if required_speed_kmph > 1500:
        score = 100
        warnings.append("Impossible travel detected")
    elif required_speed_kmph > 900:
        score = 75
        warnings.append("Highly suspicious travel speed")
    elif required_speed_kmph > 500:
        score = 40
        warnings.append("Unusual travel speed")

    status = "SAFE"
    if score >= 100:
        status = "BLOCK"
    elif score >= 75:
        status = "CRITICAL"
    elif score >= 40:
        status = "WARNING"

    return ImpossibleTravelResult(
        requiredSpeedKMPH=round(required_speed_kmph),
        score=score,
        status=status,
        warnings=warnings,
    )


# ---------------- Deepfake Shield ----------------
def calculate_face_liveness(input: FaceLivenessInput) -> FaceLivenessResult:
    score = 0
    reasons = []

    if not input.blinkDetected:
        score += 30
        reasons.append("No eye blink detected")

    if not input.headMovementDetected:
        score += 25
        reasons.append("No natural head movement detected")

    if input.reflectionScore < 50:
        score += 20
        reasons.append("Abnormal reflection pattern")

    if input.textureScore < 50:
        score += 25
        reasons.append("Artificial facial texture detected")

    status = "LIVE"
    if score >= 70:
        status = "DEEPFAKE"
    elif score >= 40:
        status = "SUSPECT"

    return FaceLivenessResult(score=score, status=status, reasons=reasons)


def calculate_voice_clone_risk(input: VoiceCloneInput) -> VoiceCloneResult:
    score = 0
    reasons = []

    if input.pitchVariation < 20:
        score += 30
        reasons.append("Abnormally consistent voice pitch detected")

    if not input.breathingDetected:
        score += 30
        reasons.append("No natural breathing pattern detected")

    if input.syntheticArtifacts > 70:
        score += 40
        reasons.append("Strong synthetic voice artifacts detected")
    elif input.syntheticArtifacts > 40:
        score += 20
        reasons.append("Possible synthetic voice artifacts detected")

    status = "GENUINE"
    if score >= 70:
        status = "CLONED"
    elif score >= 40:
        status = "SUSPECT"

    return VoiceCloneResult(score=score, status=status, reasons=reasons)


def calculate_deepfake_risk(face_risk: float, voice_risk: float) -> DeepfakeRiskResult:
    overall_risk = round((face_risk + voice_risk) / 2)

    reasons = []
    if face_risk >= 70:
        reasons.append("Face analysis indicates possible deepfake activity")
    if voice_risk >= 70:
        reasons.append("Voice analysis indicates possible cloning activity")

    status = "SAFE"
    if overall_risk >= 70:
        status = "BLOCK"
    elif overall_risk >= 40:
        status = "REVIEW"

    return DeepfakeRiskResult(
        faceRisk=face_risk,
        voiceRisk=voice_risk,
        overallRisk=overall_risk,
        status=status,
        reasons=reasons,
    )


# ---------------- Device Fingerprint ----------------
def calculate_device_risk(input: DeviceInput) -> DeviceResult:
    risk_score = 0
    reasons = []

    if input.isNewDevice:
        risk_score += 25
        reasons.append("New Device Detected")

    if input.isRooted:
        risk_score += 30
        reasons.append("Rooted Device")

    if input.isEmulator:
        risk_score += 35
        reasons.append("Emulator Detected")

    if input.vpnDetected:
        risk_score += 20
        reasons.append("VPN Detected")

    if input.browserChanged:
        risk_score += 15
        reasons.append("Browser Changed")

    if input.osChanged:
        risk_score += 15
        reasons.append("Operating System Changed")

    status = "SAFE"
    if risk_score >= 70:
        status = "BLOCK"
    elif risk_score >= 40:
        status = "CRITICAL"
    elif risk_score >= 20:
        status = "WARNING"

    return DeviceResult(riskScore=risk_score, status=status, reasons=reasons)