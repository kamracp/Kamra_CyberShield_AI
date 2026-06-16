
import type {
  FaceLivenessInput,
  FaceLivenessResult,
} from "../types/DeepfakeTypes";

export function calculateFaceLiveness(
  input: FaceLivenessInput
): FaceLivenessResult {
  let score = 0;

  const reasons: string[] = [];

  if (!input.blinkDetected) {
    score += 30;
    reasons.push(
      "No eye blink detected"
    );
  }

  if (!input.headMovementDetected) {
    score += 25;
    reasons.push(
      "No natural head movement detected"
    );
  }

  if (input.reflectionScore < 50) {
    score += 20;
    reasons.push(
      "Abnormal reflection pattern"
    );
  }

  if (input.textureScore < 50) {
    score += 25;
    reasons.push(
      "Artificial facial texture detected"
    );
  }

  let status:
    | "LIVE"
    | "SUSPECT"
    | "DEEPFAKE";

  if (score >= 70) {
    status = "DEEPFAKE";
  } else if (score >= 40) {
    status = "SUSPECT";
  } else {
    status = "LIVE";
  }

  return {
    score,
    status,
    reasons,
  };
}

