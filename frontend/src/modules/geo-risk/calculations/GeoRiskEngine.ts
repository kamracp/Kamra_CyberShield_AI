

export function calculateGeoRisk(
  input: GeoRiskInput
): GeoRiskResult {
  let score = 0;

  const warnings: string[] = [];

  const highRiskCountries = [
    "North Korea",
    "Iran",
    "Syria",
    "Afghanistan",
    "Nigeria",
    "Russia",
  ];

  // VPN Detection

  if (input.vpnDetected) {
    score += 25;

    warnings.push("VPN Detected");
  }

  // TOR Detection

  if (input.torDetected) {
    score += 40;

    warnings.push("TOR Network Detected");
  }

  // Country Risk

  if (
    highRiskCountries.includes(input.country)
  ) {
    score += 20;

    warnings.push(
      "High Risk Geography Detected"
    );
  }

  // Cross Border Transaction

  if (input.crossBorderTransaction) {
    score += 15;

    warnings.push(
      "Cross Border Transaction"
    );
  }

  // IP Reputation

  if (input.ipReputationScore < 30) {
    score += 30;

    warnings.push(
      "Poor IP Reputation"
    );
  } else if (
    input.ipReputationScore < 60
  ) {
    score += 15;

    warnings.push(
      "Average IP Reputation"
    );
  }

  let status:
    | "SAFE"
    | "WARNING"
    | "CRITICAL"
    | "BLOCK";

  if (score >= 80) {
    status = "BLOCK";
  } else if (score >= 60) {
    status = "CRITICAL";
  } else if (score >= 30) {
    status = "WARNING";
  } else {
    status = "SAFE";
  }

  return {
    score,
    status,
    warnings,
  };
}