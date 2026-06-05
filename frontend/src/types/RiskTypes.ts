export interface RiskInput {
  amount: number;
  location: string;
  device: string;
}

export interface RiskResult {
  score: number;
  status: string;
}