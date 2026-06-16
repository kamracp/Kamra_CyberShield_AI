
import type {
  VoiceCloneInput,
  VoiceCloneResult,
} from "../types/DeepfakeTypes";

export function calculateVoiceCloneRisk(
  input: VoiceCloneInput
): VoiceCloneResult {
  let score = 0;

  const reasons: string[] = [];

  if (input.pitchVariation < 20) {
    score += 30;

    reasons.push(
      "Abnormally consistent voice pitch detected"
    );
  }

  if (!input.breathingDetected) {
    score += 30;

    reasons.push(
      "No natural breathing pattern detected"
    );
  }

  if (input.syntheticArtifacts > 70) {
    score += 40;

    reasons.push(
      "Strong synthetic voice artifacts detected"
    );
  } else if (
    input.syntheticArtifacts > 40
  ) {
    score += 20;

    reasons.push(
      "Possible synthetic voice artifacts detected"
    );
  }

  let status:
    | "GENUINE"
    | "SUSPECT"
    | "CLONED";

  if (score >= 70) {
    status = "CLONED";
  } else if (score >= 40) {
    status = "SUSPECT";
  } else {
    status = "GENUINE";
  }

  return {
    score,
    status,
    reasons,
  };
}

