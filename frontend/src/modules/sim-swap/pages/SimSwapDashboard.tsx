
import { useState } from "react";
import { calculateSimSwapRisk } from "../calculations/SimSwapEngine";
import type { SimSwapResult } from "../types/SimSwapTypes";

function SimSwapDashboard() {
  const [result, setResult] =
    useState<SimSwapResult | null>(null);

  const runTest = () => {
    const risk = calculateSimSwapRisk({
      simChangedHours: 2,
      otpFailures: 5,
      newDevice: true,
      highValueTransaction: true,
    });

    setResult(risk);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        SIM SWAP WORKING
      </h1>

      <button
        onClick={runTest}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Run SIM Swap Check
      </button>

      {result && (
        <div className="mt-4">
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default SimSwapDashboard;

