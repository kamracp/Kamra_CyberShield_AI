import React, { useState } from "react";

import type {
  ImpossibleTravelInput,
  ImpossibleTravelResult,
} from "../types/ImpossibleTravelTypes";

import { calculateImpossibleTravel }
from "../calculations/ImpossibleTravelEngine";

import ImpossibleTravelResultCard
from "../components/ImpossibleTravelResultCard";

const ImpossibleTravelDashboard: React.FC = () => {

  const [input, setInput] =
    useState<ImpossibleTravelInput>({
      firstLocation: "Delhi",
      secondLocation: "Mumbai",
      distanceKM: 1400,
      timeDifferenceMinutes: 90,
    });

  const [result, setResult] =
    useState<ImpossibleTravelResult | null>(null);

  const handleCheck = () => {
    const calculatedResult =
      calculateImpossibleTravel(input);

    setResult(calculatedResult);
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        ✈️ Impossible Travel Detection
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="block font-semibold mb-2">
              First Location
            </label>

            <input
              type="text"
              className="w-full border p-2 rounded"
              value={input.firstLocation}
              onChange={(e) =>
                setInput({
                  ...input,
                  firstLocation:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Second Location
            </label>

            <input
              type="text"
              className="w-full border p-2 rounded"
              value={input.secondLocation}
              onChange={(e) =>
                setInput({
                  ...input,
                  secondLocation:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Distance (KM)
            </label>

            <input
              type="number"
              className="w-full border p-2 rounded"
              value={input.distanceKM}
              onChange={(e) =>
                setInput({
                  ...input,
                  distanceKM:
                    Number(e.target.value),
                })
              }
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Time Difference (Minutes)
            </label>

            <input
              type="number"
              className="w-full border p-2 rounded"
              value={
                input.timeDifferenceMinutes
              }
              onChange={(e) =>
                setInput({
                  ...input,
                  timeDifferenceMinutes:
                    Number(e.target.value),
                })
              }
            />
          </div>

        </div>

        <button
          onClick={handleCheck}
          className="
          mt-6
          bg-blue-600
          text-white
          px-6
          py-3
          rounded-lg
          hover:bg-blue-700"
        >
          Run Travel Risk Check
        </button>

      </div>

      <ImpossibleTravelResultCard
        result={result}
      />

    </div>
  );
};

export default ImpossibleTravelDashboard;