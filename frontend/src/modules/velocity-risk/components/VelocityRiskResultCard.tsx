import type { VelocityRiskResult } from "../types/VelocityRiskTypes";

interface Props {
  result: VelocityRiskResult | null;
}

function VelocityRiskResultCard({ result }: Props) {
  if (!result) return null;

  let color = "#22c55e";
  if (result.riskLevel === "WARNING") color = "#eab308";
  if (result.riskLevel === "CRITICAL") color = "#f97316";
  if (result.riskLevel === "BLOCK") color = "#dc2626";

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Velocity Risk Analysis</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Risk Score</p>
          <h3 className="text-3xl font-bold">{result.score}</h3>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Risk Level</p>
          <span className="badge" style={{ background: color }}>{result.riskLevel}</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-lg mb-3">Reasons</h3>
        {result.reasons.length === 0 ? (
          <div className="text-green-600 font-semibold">No Risk Detected</div>
        ) : (
          <ul className="space-y-2">
            {result.reasons.map((reason, index) => (
              <li key={index} className="bg-red-50 border border-red-200 rounded-lg p-2 text-sm">
                ⚠️ {reason}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default VelocityRiskResultCard;