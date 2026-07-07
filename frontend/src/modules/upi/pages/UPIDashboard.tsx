import { useState } from "react";
import type { UPIInput } from "../types/UPIRiskTypes";
import { analyzeUPI } from "../../../api/riskApi";
import UPIResultCard from "../components/UPIResultCard";

const DEFAULT_INPUT: UPIInput = {
  amount: 5000,
  deviceAgeDays: 30,
  isNewSIM: false,
  isNewDevice: false,
  vpnDetected: false,
};

function UPIDashboard() {
  const [input, setInput] = useState<UPIInput>(DEFAULT_INPUT);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await analyzeUPI(input);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Backend se connect nahi ho paaya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: "#0f172a" }}>💳 UPI Security Check</h1>
      <p className="text-gray-500 text-sm mb-6">Evaluate transaction risk before UPI payment goes through (backend API)</p>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">Transaction Amount (₹)</label>
            <input
              type="number" min="0"
              value={input.amount}
              onChange={(e) => setInput({ ...input, amount: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Device Age (days)</label>
            <input
              type="number" min="0"
              value={input.deviceAgeDays}
              onChange={(e) => setInput({ ...input, deviceAgeDays: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={input.isNewSIM}
              onChange={(e) => setInput({ ...input, isNewSIM: e.target.checked })}
            />
            New SIM Card
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={input.isNewDevice}
              onChange={(e) => setInput({ ...input, isNewDevice: e.target.checked })}
            />
            New Device
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={input.vpnDetected}
              onChange={(e) => setInput({ ...input, vpnDetected: e.target.checked })}
            />
            VPN Detected
          </label>
        </div>

        <button onClick={handleCheck} className="btn-primary mt-6" disabled={loading}>
          {loading ? "Analyzing..." : "Run UPI Risk Check"}
        </button>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      </div>

      {result && (
        <UPIResultCard
          riskScore={result.riskScore}
          status={result.status}
          reasons={result.reasons}
        />
      )}
    </div>
  );
}

export default UPIDashboard;