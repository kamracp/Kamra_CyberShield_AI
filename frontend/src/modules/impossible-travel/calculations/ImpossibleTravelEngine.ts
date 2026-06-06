import type {
  ImpossibleTravelInput,
  ImpossibleTravelResult,
} from "../types/ImpossibleTravelTypes";

export function calculateImpossibleTravel(
  input: ImpossibleTravelInput
): ImpossibleTravelResult {
  let score = 0;

  const warnings: string[] = [];

  const hours =
    input.timeDifferenceMinutes > 0
      ? input.timeDifferenceMinutes / 60
      : 0.01;

  const requiredSpeedKMPH =
    input.distanceKM / hours;

  // BLOCK

  if (requiredSpeedKMPH > 1500) {
    score = 100;

    warnings.push(
      "Impossible travel detected"
    );
  }

  // CRITICAL

  else if (requiredSpeedKMPH > 900) {
    score = 75;

    warnings.push(
      "Highly suspicious travel speed"
    );
  }

  // WARNING

  else if (requiredSpeedKMPH > 500) {
    score = 40;

    warnings.push(
      "Unusual travel speed"
    );
  }

  let status:
    | "SAFE"
    | "WARNING"
    | "CRITICAL"
    | "BLOCK";

  if (score >= 100) {
    status = "BLOCK";
  } else if (score >= 75) {
    status = "CRITICAL";
  } else if (score >= 40) {
    status = "WARNING";
  } else {
    status = "SAFE";
  }

  return {
    requiredSpeedKMPH:
      Math.round(requiredSpeedKMPH),

    score,

    status,

    warnings,
  };
}