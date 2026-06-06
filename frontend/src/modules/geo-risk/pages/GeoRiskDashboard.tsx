import React, { useState } from "react";

import type {
  GeoRiskInput,
  GeoRiskResult,
} from "../types/GeoRiskTypes";
import { calculateGeoRisk }
from "../calculations/GeoRiskEngine";

import GeoRiskResultCard
from "../components/GeoRiskResultCard";

const GeoRiskDashboard: React.FC = () => {

  const [input, setInput] =
    useState<GeoRiskInput>({
      country: "India",
      vpnDetected: false,
      torDetected: false,
      ipReputationScore: 80,
      crossBorderTransaction: false,
    });

  const [result, setResult] =
    useState<GeoRiskResult | null>(null);

  const handleCheck = () => {
    const calculatedResult =
      calculateGeoRisk(input);

    setResult(calculatedResult);
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        🌍 Geo Risk Engine
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <div className="grid md:grid-cols-2 gap-4">

          {/* Country */}

          <div>

            <label className="block font-semibold mb-2">
              Country
            </label>

            <select
              className="w-full border p-2 rounded"
              value={input.country}
              onChange={(e) =>
                setInput({
                  ...input,
                  country: e.target.value,
                })
              }
            >
              <option>India</option>
              <option>Nigeria</option>
              <option>Russia</option>
              <option>Iran</option>
              <option>Afghanistan</option>
              <option>Syria</option>
              <option>North Korea</option>
              <option>United Kingdom</option>
              <option>United States</option>
            </select>

          </div>

          {/* IP Reputation */}

          <div>

            <label className="block font-semibold mb-2">
              IP Reputation Score
            </label>

            <input
              type="number"
              min="0"
              max="100"
              className="w-full border p-2 rounded"
              value={input.ipReputationScore}
              onChange={(e) =>
                setInput({
                  ...input,
                  ipReputationScore:
                    Number(e.target.value),
                })
              }
            />

          </div>

        </div>

        {/* Checkboxes */}

        <div className="mt-6 space-y-3">

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={input.vpnDetected}
              onChange={(e) =>
                setInput({
                  ...input,
                  vpnDetected:
                    e.target.checked,
                })
              }
            />

            VPN Detected

          </label>

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={input.torDetected}
              onChange={(e) =>
                setInput({
                  ...input,
                  torDetected:
                    e.target.checked,
                })
              }
            />

            TOR Network Detected

          </label>

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={
                input.crossBorderTransaction
              }
              onChange={(e) =>
                setInput({
                  ...input,
                  crossBorderTransaction:
                    e.target.checked,
                })
              }
            />

            Cross Border Transaction

          </label>

        </div>

        <button
          onClick={handleCheck}
          className="mt-6 bg-blue-600
          text-white px-6 py-3 rounded-lg
          hover:bg-blue-700"
        >
          Run Geo Risk Check
        </button>

      </div>

      <GeoRiskResultCard result={result} />

    </div>
  );
};

export default GeoRiskDashboard;