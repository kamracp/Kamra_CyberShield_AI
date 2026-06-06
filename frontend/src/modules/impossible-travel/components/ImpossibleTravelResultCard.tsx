import React from "react";

import type {
  ImpossibleTravelResult,
} from "../types/ImpossibleTravelTypes";

interface Props {
  result: ImpossibleTravelResult | null;
}

const ImpossibleTravelResultCard: React.FC<Props> = ({
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

      <h2 className="text-2xl font-bold mb-6">
        ✈️ Impossible Travel Analysis
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="border rounded-lg p-4">
          <p className="text-gray-500">
            Required Speed
          </p>

          <h3 className="text-2xl font-bold">
            {result.requiredSpeedKMPH} km/h
          </h3>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-gray-500">
            Risk Score
          </p>

          <h3 className="text-2xl font-bold">
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

        <h3 className="text-lg font-bold mb-3">
          Travel Warnings
        </h3>

        {result.warnings.length === 0 ? (
          <div className="text-green-600 font-semibold">
            ✅ No Travel Risk Detected
          </div>
        ) : (
          <ul className="space-y-2">

            {result.warnings.map(
              (warning, index) => (
                <li
                  key={index}
                  className="bg-red-50
                  border border-red-200
                  rounded-lg p-3"
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

export default ImpossibleTravelResultCard;