import React from "react";

import type {
  GeoRiskResult,
} from "../types/GeoRiskTypes";

interface Props {
  result: GeoRiskResult | null;
}

const GeoRiskResultCard: React.FC<Props> = ({
  result,
}) => {
  if (!result) return null;

  const getStatusColor = () => {
    switch (result.status) {
      case "SAFE":
        return "bg-green-500";

      case "WARNING":
        return "bg-yellow-500";

      case "CRITICAL":
        return "bg-orange-500";

      case "BLOCK":
        return "bg-red-600";

      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6">

      <h2 className="text-xl font-bold mb-4">
        🌍 Geo Risk Analysis Result
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="border rounded-lg p-4">

          <p className="text-gray-500">
            Risk Score
          </p>

          <h3 className="text-3xl font-bold">
            {result.score}
          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-gray-500">
            Risk Status
          </p>

          <span
            className={`${getStatusColor()}
            text-white px-4 py-2 rounded-lg
            font-bold inline-block`}
          >
            {result.status}
          </span>

        </div>

      </div>

      <div className="mt-6">

        <h3 className="font-bold text-lg mb-3">
          Warnings
        </h3>

        {result.warnings.length === 0 ? (
          <div className="text-green-600 font-semibold">
            No Risk Detected
          </div>
        ) : (
          <ul className="space-y-2">

            {result.warnings.map(
              (warning, index) => (
                <li
                  key={index}
                  className="bg-red-50 border
                  border-red-200 rounded-lg
                  p-2"
                >
                  ⚠️ {warning}
                </li>
              )
            )}

          </ul>
        )}

      </div>

    </div>
  );
};

export default GeoRiskResultCard;