import type {
  RiskInput,
  RiskResult,
} from "../types/RiskTypes";

export const calculateRiskScore = (
  input: RiskInput
): RiskResult => {
  let score = 0;

  if (input.amount > 100000)
    score += 40;
  else if (input.amount > 50000)
    score += 20;

  if (
    input.location.toLowerCase() !== "india"
  )
    score += 30;

  if (
    input.device.toLowerCase() === "new"
  )
    score += 30;

  let status = "SAFE";

  if (score >= 70)
    status = "CRITICAL";
  else if (score >= 30)
    status = "WARNING";

  return {
    score,
    status,
  };
};