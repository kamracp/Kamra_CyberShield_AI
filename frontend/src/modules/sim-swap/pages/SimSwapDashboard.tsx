import { useState } from "react";
import type { SimSwapInput, SimSwapResult } from "../types/SimSwapTypes";
import { analyzeSimSwap } from "../../../api/riskApi";
import SimSwapResultCard from "../components/SimSwapResultCard";

const DEFAULT_INPUT: SimSwapInput = {
  simChangedHours: 12,
  otpFailures: 2,
  newDevice: false,
  highValueTransaction: false,
};

function SimSwapDashboard() {
  const [input, setInput] = useState<SimSwapInput>(DEFAULT_INPUT);
  const [result, setResult] = useState<SimSwapResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await analyzeSimSwap(input);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Backend se connect nahi ho paaya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: "#0f172a" }}>📱 SIM Swap Detection</h1>
      <p className="text-gray-500 text-sm mb-6">Detect fraud risk from recent SIM changes (backend API)</p>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">SIM Changed (hours ago)</label>
            <input
              type="number" min="0"
              value={input.simChangedHours}
              onChange={(e) => setInput({ ...input, simChangedHours: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">OTP Failures</label>
            <input
              type="number" min="0"
              value={input.otpFailures}
              onChange={(e) => setInput({ ...input, otpFailures: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={input.newDevice}
              onChange={(e) => setInput({ ...input, newDevice: e.target.checked })}
            />
            New / Unrecognised Device
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={input.highValueTransaction}
              onChange={(e) => setInput({ ...input, highValueTransaction: e.target.checked })}
            />
            High Value Transaction Attempted
          </label>
        </div>

        <button onClick={handleCheck} className="btn-primary mt-6" disabled={loading}>
          {loading ? "Analyzing..." : "Run SIM Swap Check"}
        </button>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      </div>

      <SimSwapResultCard result={result} />
    </div>
  );
}

export default SimSwapDashboard;