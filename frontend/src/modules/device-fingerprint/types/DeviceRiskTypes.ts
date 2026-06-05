export interface DeviceInput {
  isNewDevice: boolean;
  isRooted: boolean;
  isEmulator: boolean;
  vpnDetected: boolean;
  browserChanged: boolean;
  osChanged: boolean;
}

export interface DeviceResult {
  riskScore: number;
  status: string;
  reasons: string[];
}