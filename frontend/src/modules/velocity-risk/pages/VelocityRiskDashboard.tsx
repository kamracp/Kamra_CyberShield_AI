import { useState } from "react";
import { analyzeVelocityRisk } from "../../../api/riskApi";
import VelocityRiskResultCard from "../components/VelocityRiskResultCard";
import type { VelocityRiskInput, VelocityRiskResult } from "../types/VelocityRiskTypes";

const DEFAULT_INPUT: VelocityRiskInput = {
  transactionsPerMinute: 3,
  transactionsPerHour: 15,
  beneficiaryAdditions: 1,
  failedAttempts: 1,
};

function VelocityRiskDashboard() {
  const [input, setInput] = useState<VelocityRiskInput>(DEFAULT_INPUT);
  const [result, setResult] = useState<VelocityRiskResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runVelocityTest = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await analyzeVelocityRisk(input);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Backend se connect nahi ho paaya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: "#0f172a" }}>⚡ Velocity Risk Engine</h1>
      <p className="text-gray-500 text-sm mb-6">Flags abnormal transaction speed/frequency patterns (backend API)</p>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">Transactions / Minute</label>
            <input
              type="number" min="0"
              value={input.transactionsPerMinute}
              onChange={(e) => setInput({ ...input, transactionsPerMinute: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Transactions / Hour</label>
            <input
              type="number" min="0"
              value={input.transactionsPerHour}
              onChange={(e) => setInput({ ...input, transactionsPerHour: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Beneficiary Additions</label>
            <input
              type="number" min="0"
              value={input.beneficiaryAdditions}
              onChange={(e) => setInput({ ...input, beneficiaryAdditions: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Failed Attempts</label>
            <input
              type="number" min="0"
              value={input.failedAttempts}
              onChange={(e) => setInput({ ...input, failedAttempts: Number(e.target.value) })}
            />
          </div>
        </div>

        <button onClick={runVelocityTest} className="btn-primary mt-6" disabled={loading}>
          {loading ? "Analyzing..." : "Run Velocity Risk Check"}
        </button>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      </div>

      <VelocityRiskResultCard result={result} />
    </div>
  );
}

export default VelocityRiskDashboard;