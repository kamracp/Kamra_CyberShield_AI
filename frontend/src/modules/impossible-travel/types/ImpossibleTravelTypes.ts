export interface ImpossibleTravelInput {
  firstLocation: string;
  secondLocation: string;

  distanceKM: number;
  timeDifferenceMinutes: number;
}

export interface ImpossibleTravelResult {
  requiredSpeedKMPH: number;

  score: number;

  status:
    | "SAFE"
    | "WARNING"
    | "CRITICAL"
    | "BLOCK";

  warnings: string[];
}