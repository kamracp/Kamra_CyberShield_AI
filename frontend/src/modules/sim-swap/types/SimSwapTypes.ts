export interface SimSwapInput {
  simChangedHours: number;
  otpFailures: number;
  newDevice: boolean;
  highValueTransaction: boolean;
}

export interface SimSwapResult {
  score: number;

  riskLevel:
    | "SAFE"
    | "WARNING"
    | "CRITICAL"
    | "BLOCK";

  reasons: string[];
}