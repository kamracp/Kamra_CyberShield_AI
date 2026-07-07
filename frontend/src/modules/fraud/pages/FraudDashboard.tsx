import { useState } from "react";
import FraudResultCard from "../components/FraudResultCard";
import { analyzeFraud } from "../../../api/riskApi";

function FraudDashboard() {
  const [upiScore, setUpiScore] = useState(50);
  const [deviceScore, setDeviceScore] = useState(30);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runFraudTest = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await analyzeFraud({ upiScore, deviceScore });
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Backend se connect nahi ho paaya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: "#0f172a" }}>🧠 Unified Fraud Engine</h1>
      <p className="text-gray-500 text-sm mb-6">Combines UPI risk + Device risk into one fraud score (backend API)</p>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">UPI Risk Score (0-100)</label>
            <input
              type="number" min="0" max="100"
              value={upiScore}
              onChange={(e) => setUpiScore(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Device Risk Score (0-100)</label>
            <input
              type="number" min="0" max="100"
              value={deviceScore}
              onChange={(e) => setDeviceScore(Number(e.target.value))}
            />
          </div>
        </div>

        <button onClick={runFraudTest} className="btn-primary mt-6" disabled={loading}>
          {loading ? "Analyzing..." : "Run Fraud Analysis"}
        </button>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      </div>

      {result && (
        <FraudResultCard
          score={result.totalRiskScore}
          status={result.status}
          reasons={result.reasons}
        />
      )}
    </div>
  );
}

export default FraudDashboard;