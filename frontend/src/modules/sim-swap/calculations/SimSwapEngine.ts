import type {
  SimSwapInput,
  SimSwapResult,
} from "../types/SimSwapTypes";

export const calculateSimSwapRisk = (
  input: SimSwapInput
): SimSwapResult => {
  let score = 0;

  const reasons: string[] = [];

  if (input.simChangedHours < 24) {
    score += 50;
    reasons.push(
      "SIM changed within last 24 hours"
    );
  } else if (input.simChangedHours < 168) {
    score += 25;
    reasons.push(
      "SIM changed within last 7 days"
    );
  }

  if (input.otpFailures >= 5) {
    score += 25;
    reasons.push(
      "Multiple OTP failures detected"
    );
  } else if (input.otpFailures >= 3) {
    score += 15;
    reasons.push(
      "Several OTP failures detected"
    );
  }

  if (input.newDevice) {
    score += 15;
    reasons.push(
      "Transaction from new device"
    );
  }

  if (input.highValueTransaction) {
    score += 20;
    reasons.push(
      "High value transaction detected"
    );
  }

  let riskLevel:
    | "SAFE"
    | "WARNING"
    | "CRITICAL"
    | "BLOCK" = "SAFE";

  if (score >= 90) {
    riskLevel = "BLOCK";
  } else if (score >= 60) {
    riskLevel = "CRITICAL";
  } else if (score >= 30) {
    riskLevel = "WARNING";
  }

  return {
    score,
    riskLevel,
    reasons,
  };
};