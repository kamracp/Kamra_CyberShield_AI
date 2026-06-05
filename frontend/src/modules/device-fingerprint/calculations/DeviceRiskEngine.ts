import type {
  DeviceInput,
  DeviceResult,
} from "../types/DeviceRiskTypes";

export const calculateDeviceRisk = (
  input: DeviceInput
): DeviceResult => {
  let riskScore = 0;

  const reasons: string[] = [];

  if (input.isNewDevice) {
    riskScore += 25;
    reasons.push(
      "New Device Detected"
    );
  }

  if (input.isRooted) {
    riskScore += 30;
    reasons.push(
      "Rooted Device"
    );
  }

  if (input.isEmulator) {
    riskScore += 35;
    reasons.push(
      "Emulator Detected"
    );
  }

  if (input.vpnDetected) {
    riskScore += 20;
    reasons.push(
      "VPN Detected"
    );
  }

  if (input.browserChanged) {
    riskScore += 15;
    reasons.push(
      "Browser Changed"
    );
  }

  if (input.osChanged) {
    riskScore += 15;
    reasons.push(
      "Operating System Changed"
    );
  }

  let status = "SAFE";

  if (riskScore >= 70)
    status = "BLOCK";
  else if (riskScore >= 40)
    status = "CRITICAL";
  else if (riskScore >= 20)
    status = "WARNING";

  return {
    riskScore,
    status,
    reasons,
  };
};