import type {
  VelocityRiskInput,
  VelocityRiskResult,
} from "../types/VelocityRiskTypes";

export const calculateVelocityRisk = (
  input: VelocityRiskInput
): VelocityRiskResult => {
  let score = 0;

  const reasons: string[] = [];

  // Transactions Per Minute

  if (input.transactionsPerMinute >= 20) {
    score += 50;
    reasons.push(
      "Very high transaction velocity detected"
    );
  } else if (
    input.transactionsPerMinute >= 10
  ) {
    score += 30;
    reasons.push(
      "High transaction velocity detected"
    );
  } else if (
    input.transactionsPerMinute >= 5
  ) {
    score += 15;
    reasons.push(
      "Moderate transaction velocity detected"
    );
  }

  // Transactions Per Hour

  if (input.transactionsPerHour >= 100) {
    score += 25;
    reasons.push(
      "Excessive hourly transactions"
    );
  } else if (
    input.transactionsPerHour >= 50
  ) {
    score += 15;
    reasons.push(
      "High hourly transactions"
    );
  }

  // Beneficiary Additions

  if (input.beneficiaryAdditions >= 10) {
    score += 20;
    reasons.push(
      "Multiple beneficiaries added"
    );
  } else if (
    input.beneficiaryAdditions >= 5
  ) {
    score += 10;
    reasons.push(
      "Several beneficiaries added"
    );
  }

  // Failed Attempts

  if (input.failedAttempts >= 10) {
    score += 20;
    reasons.push(
      "Excessive failed attempts"
    );
  } else if (
    input.failedAttempts >= 5
  ) {
    score += 10;
    reasons.push(
      "Multiple failed attempts"
    );
  }

  let riskLevel:
    | "SAFE"
    | "WARNING"
    | "CRITICAL"
    | "BLOCK" = "SAFE";

  if (score >= 80) {
    riskLevel = "BLOCK";
  } else if (score >= 50) {
    riskLevel = "CRITICAL";
  } else if (score >= 20) {
    riskLevel = "WARNING";
  }

  return {
    score,
    riskLevel,
    reasons,
  };
};