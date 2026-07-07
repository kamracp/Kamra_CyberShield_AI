import type { DeepfakeRiskResult } from "../types/DeepfakeTypes";

interface Props {
  result: DeepfakeRiskResult | null;
}

function DeepfakeResultCard({ result }: Props) {
  if (!result) return null;

  let color = "#22c55e";
  if (result.status === "REVIEW") color = "#eab308";
  if (result.status === "BLOCK") color = "#dc2626";

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Deepfake Analysis Result</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Face Risk</p>
          <h3 className="text-2xl font-bold">{result.faceRisk}</h3>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Voice Risk</p>
          <h3 className="text-2xl font-bold">{result.voiceRisk}</h3>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Overall Risk</p>
          <h3 className="text-2xl font-bold">{result.overallRisk}</h3>
        </div>
      </div>

      <div className="mt-4">
        <span className="badge" style={{ background: color }}>{result.status}</span>
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

export default DeepfakeResultCard;