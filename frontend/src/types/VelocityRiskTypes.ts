export interface VelocityRiskInput {
  transactionsPerMinute: number;
  transactionsPerHour: number;
  beneficiaryAdditions: number;
  failedAttempts: number;
}

export interface VelocityRiskResult {
  score: number;

  riskLevel:
    | "SAFE"
    | "WARNING"
    | "CRITICAL"
    | "BLOCK";

  reasons: string[];
}