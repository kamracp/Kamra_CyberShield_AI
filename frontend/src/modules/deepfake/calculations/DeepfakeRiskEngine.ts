
import type {
  DeepfakeRiskResult,
} from "../types/DeepfakeTypes";

export function calculateDeepfakeRisk(
  faceRisk: number,
  voiceRisk: number
): DeepfakeRiskResult {
  const overallRisk = Math.round(
    (faceRisk + voiceRisk) / 2
  );

  const reasons: string[] = [];

  if (faceRisk >= 70) {
    reasons.push(
      "Face analysis indicates possible deepfake activity"
    );
  }

  if (voiceRisk >= 70) {
    reasons.push(
      "Voice analysis indicates possible cloning activity"
    );
  }

  let status:
    | "SAFE"
    | "REVIEW"
    | "BLOCK";

  if (overallRisk >= 70) {
    status = "BLOCK";
  } else if (overallRisk >= 40) {
    status = "REVIEW";
  } else {
    status = "SAFE";
  }

  return {
    faceRisk,
    voiceRisk,
    overallRisk,
    status,
    reasons,
  };
}

