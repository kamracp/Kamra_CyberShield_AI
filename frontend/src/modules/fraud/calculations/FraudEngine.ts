import type {
  FraudResult,
} from "../types/FraudTypes";

export const calculateFraudRisk = (
  upiScore: number,
  deviceScore: number
): FraudResult => {
  const totalRiskScore =
    upiScore + deviceScore;

  let status = "SAFE";

  if (totalRiskScore >= 150)
    status = "BLOCK";
  else if (totalRiskScore >= 80)
    status = "CRITICAL";
  else if (totalRiskScore >= 40)
    status = "WARNING";

  const reasons: string[] = [];

  if (upiScore > 0)
    reasons.push(
      `UPI Risk Score: ${upiScore}`
    );

  if (deviceScore > 0)
    reasons.push(
      `Device Risk Score: ${deviceScore}`
    );

  return {
    totalRiskScore,
    status,
    reasons,
  };
};