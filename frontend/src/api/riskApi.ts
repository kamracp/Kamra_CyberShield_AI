// CyberShield AI -- Backend API client
// Yahan se hi sabhi 8 modules backend ko call karte hain (fetch API,
// koi extra dependency nahi chahiye).

// NOTE: Agar backend kisi aur port par chal raha ho (jaise 8005),
// to yahan BASE_URL badal dein.
export const BASE_URL = "http://localhost:8010";

async function postJSON<TResponse>(path: string, body: unknown): Promise<TResponse> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }

  return res.json() as Promise<TResponse>;
}

export function analyzeFraud(payload: { upiScore: number; deviceScore: number }) {
  return postJSON<{ totalRiskScore: number; status: string; reasons: string[] }>(
    "/api/fraud/analyze",
    payload
  );
}

export function analyzeSimSwap(payload: {
  simChangedHours: number;
  otpFailures: number;
  newDevice: boolean;
  highValueTransaction: boolean;
}) {
  return postJSON<{ score: number; riskLevel: string; reasons: string[] }>(
    "/api/sim-swap/analyze",
    payload
  );
}

export function analyzeUPI(payload: {
  amount: number;
  deviceAgeDays: number;
  isNewSIM: boolean;
  isNewDevice: boolean;
  vpnDetected: boolean;
}) {
  return postJSON<{ riskScore: number; status: string; reasons: string[] }>(
    "/api/upi/analyze",
    payload
  );
}

export function analyzeVelocityRisk(payload: {
  transactionsPerMinute: number;
  transactionsPerHour: number;
  beneficiaryAdditions: number;
  failedAttempts: number;
}) {
  return postJSON<{ score: number; riskLevel: string; reasons: string[] }>(
    "/api/velocity-risk/analyze",
    payload
  );
}

export function analyzeGeoRisk(payload: {
  country: string;
  vpnDetected: boolean;
  torDetected: boolean;
  ipReputationScore: number;
  crossBorderTransaction: boolean;
}) {
  return postJSON<{ score: number; status: string; warnings: string[] }>(
    "/api/geo-risk/analyze",
    payload
  );
}

export function analyzeImpossibleTravel(payload: {
  firstLocation: string;
  secondLocation: string;
  distanceKM: number;
  timeDifferenceMinutes: number;
}) {
  return postJSON<{ requiredSpeedKMPH: number; score: number; status: string; warnings: string[] }>(
    "/api/impossible-travel/analyze",
    payload
  );
}

export function analyzeDeepfake(payload: {
  face: {
    blinkDetected: boolean;
    headMovementDetected: boolean;
    reflectionScore: number;
    textureScore: number;
  };
  voice: {
    pitchVariation: number;
    breathingDetected: boolean;
    syntheticArtifacts: number;
  };
}) {
  return postJSON<{
    faceRisk: number;
    voiceRisk: number;
    overallRisk: number;
    status: string;
    reasons: string[];
  }>("/api/deepfake/analyze", payload);
}

export function analyzeDeviceFingerprint(payload: {
  isNewDevice: boolean;
  isRooted: boolean;
  isEmulator: boolean;
  vpnDetected: boolean;
  browserChanged: boolean;
  osChanged: boolean;
}) {
  return postJSON<{ riskScore: number; status: string; reasons: string[] }>(
    "/api/device-fingerprint/analyze",
    payload
  );
}