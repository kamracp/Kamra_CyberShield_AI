import { useState } from "react";
import type { DeviceInput, DeviceResult } from "../types/DeviceRiskTypes";
import { analyzeDeviceFingerprint } from "../../../api/riskApi";
import DeviceRiskResultCard from "../components/DeviceRiskResultCard";

const DEFAULT_INPUT: DeviceInput = {
  isNewDevice: false,
  isRooted: false,
  isEmulator: false,
  vpnDetected: false,
  browserChanged: false,
  osChanged: false,
};

function DeviceFingerprintDashboard() {
  const [input, setInput] = useState<DeviceInput>(DEFAULT_INPUT);
  const [result, setResult] = useState<DeviceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await analyzeDeviceFingerprint(input);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Backend se connect nahi ho paaya");
    } finally {
      setLoading(false);
    }
  };

  const CHECKS: { key: keyof DeviceInput; label: string }[] = [
    { key: "isNewDevice", label: "New / Unrecognised Device" },
    { key: "isRooted", label: "Rooted / Jailbroken Device" },
    { key: "isEmulator", label: "Emulator Detected" },
    { key: "vpnDetected", label: "VPN Detected" },
    { key: "browserChanged", label: "Browser Changed Since Last Login" },
    { key: "osChanged", label: "Operating System Changed" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: "#0f172a" }}>🖥️ Device Fingerprint Risk</h1>
      <p className="text-gray-500 text-sm mb-6">Evaluate risk based on device/browser signals at login (backend API)</p>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-3">
          {CHECKS.map((c) => (
            <label key={c.key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={input[c.key]}
                onChange={(e) => setInput({ ...input, [c.key]: e.target.checked })}
              />
              {c.label}
            </label>
          ))}
        </div>

        <button onClick={handleCheck} className="btn-primary mt-6" disabled={loading}>
          {loading ? "Analyzing..." : "Run Device Risk Check"}
        </button>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      </div>

      <DeviceRiskResultCard result={result} />
    </div>
  );
}

export default DeviceFingerprintDashboard;