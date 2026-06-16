export interface GeoRiskInput {
  country: string;

  vpnDetected: boolean;

  torDetected: boolean;

  ipReputationScore: number;

  crossBorderTransaction: boolean;
}

export interface GeoRiskResult {
  score: number;

  status:
    | "SAFE"
    | "WARNING"
    | "CRITICAL"
    | "BLOCK";

  warnings: string[];
}
