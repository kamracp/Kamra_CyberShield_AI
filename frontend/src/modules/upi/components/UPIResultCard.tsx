interface Props {
  riskScore: number;
  status: string;
  reasons: string[];
}

function UPIResultCard({ riskScore, status, reasons }: Props) {
  let color = "#22c55e";
  if (status === "WARNING") color = "#eab308";
  if (status === "CRITICAL") color = "#f97316";
  if (status === "BLOCK") color = "#dc2626";

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">UPI Risk Analysis</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Risk Score</p>
          <h3 className="text-3xl font-bold">{riskScore}</h3>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Status</p>
          <span className="badge" style={{ background: color }}>{status}</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-lg mb-3">Reasons</h3>
        {reasons.length === 0 ? (
          <div className="text-green-600 font-semibold">No Risk Detected</div>
        ) : (
          <ul className="space-y-2">
            {reasons.map((reason, index) => (
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

export default UPIResultCard;