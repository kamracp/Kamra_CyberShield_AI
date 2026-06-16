
export interface FaceLivenessInput {
  blinkDetected: boolean;
  headMovementDetected: boolean;
  reflectionScore: number;
  textureScore: number;
}

export interface FaceLivenessResult {
  score: number;

  status:
    | "LIVE"
    | "SUSPECT"
    | "DEEPFAKE";

  reasons: string[];
}

export interface VoiceCloneInput {
  pitchVariation: number;
  breathingDetected: boolean;
  syntheticArtifacts: number;
}

export interface VoiceCloneResult {
  score: number;

  status:
    | "GENUINE"
    | "SUSPECT"
    | "CLONED";

  reasons: string[];
}

export interface DeepfakeRiskResult {
  faceRisk: number;
  voiceRisk: number;

  overallRisk: number;

  status:
    | "SAFE"
    | "REVIEW"
    | "BLOCK";

  reasons: string[];
}

