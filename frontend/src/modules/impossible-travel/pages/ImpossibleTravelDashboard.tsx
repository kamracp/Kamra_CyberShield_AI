import React, { useState } from "react";

import type {
  ImpossibleTravelInput,
  ImpossibleTravelResult,
} from "../types/ImpossibleTravelTypes";

import { analyzeImpossibleTravel } from "../../../api/riskApi";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await analyzeImpossibleTravel(input);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Backend se connect nahi ho paaya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-1">
        ✈️ Impossible Travel Detection
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Backend API se real-time evaluation
      </p>

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
          disabled={loading}
          className="
          mt-6
          bg-blue-600
          text-white
          px-6
          py-3
          rounded-lg
          hover:bg-blue-700"
        >
          {loading ? "Analyzing..." : "Run Travel Risk Check"}
        </button>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

      </div>

      <ImpossibleTravelResultCard
        result={result}
      />

    </div>
  );
};

export default ImpossibleTravelDashboard;