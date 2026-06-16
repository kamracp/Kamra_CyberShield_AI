export interface FraudResult {
  totalRiskScore: number;
  status: string;
  reasons: string[];
}