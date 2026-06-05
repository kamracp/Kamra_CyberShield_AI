import type {
  UPIInput,
  UPIResult,
} from "../types/UPIRiskTypes";

export const calculateUPIRisk = (
  input: UPIInput
): UPIResult => {
  let riskScore = 0;

  const reasons: string[] = [];

  if (input.amount > 50000) {
    riskScore += 25;
    reasons.push(
      "High Transaction Amount"
    );
  }

  if (input.deviceAgeDays < 7) {
    riskScore += 20;
    reasons.push(
      "New Device Detected"
    );
  }

  if (input.isNewSIM) {
    riskScore += 25;
    reasons.push(
      "Recent SIM Change"
    );
  }

  if (input.isNewDevice) {
    riskScore += 20;
    reasons.push(
      "Unknown Device"
    );
  }

  if (input.vpnDetected) {
    riskScore += 30;
    reasons.push(
      "VPN Detected"
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