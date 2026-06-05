export interface UPIInput {
  amount: number;
  deviceAgeDays: number;
  isNewSIM: boolean;
  isNewDevice: boolean;
  vpnDetected: boolean;
}

export interface UPIResult {
  riskScore: number;
  status: string;
  reasons: string[];
}