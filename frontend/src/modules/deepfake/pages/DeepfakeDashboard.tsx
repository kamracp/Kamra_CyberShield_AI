import { useState } from "react";
import { analyzeDeepfake } from "../../../api/riskApi";
import DeepfakeResultCard from "../components/DeepfakeResultCard";
import DeepfakeUploadPanel from "../components/DeepfakeUploadPanel";
import type { DeepfakeRiskResult, FaceLivenessInput, VoiceCloneInput } from "../types/DeepfakeTypes";

const DEFAULT_FACE: FaceLivenessInput = {
  blinkDetected: true,
  headMovementDetected: true,
  reflectionScore: 70,
  textureScore: 75,
};

const DEFAULT_VOICE: VoiceCloneInput = {
  pitchVariation: 40,
  breathingDetected: true,
  syntheticArtifacts: 15,
};

function DeepfakeDashboard() {
  const [face, setFace] = useState<FaceLivenessInput>(DEFAULT_FACE);
  const [voice, setVoice] = useState<VoiceCloneInput>(DEFAULT_VOICE);
  const [result, setResult] = useState<DeepfakeRiskResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runDeepfakeAnalysis = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await analyzeDeepfake({ face, voice });
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Backend se connect nahi ho paaya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: "#0f172a" }}>🎭 Deepfake Shield</h1>
      <p className="text-gray-500 text-sm mb-6">Face liveness + voice clone signal analysis (backend API)</p>

      <DeepfakeUploadPanel />

      <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
        <h2 className="text-lg font-bold mb-3">Face Liveness Signals</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-2">Reflection Score (0-100)</label>
            <input
              type="number" min="0" max="100"
              value={face.reflectionScore}
              onChange={(e) => setFace({ ...face, reflectionScore: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Texture Score (0-100)</label>
            <input
              type="number" min="0" max="100"
              value={face.textureScore}
              onChange={(e) => setFace({ ...face, textureScore: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={face.blinkDetected}
              onChange={(e) => setFace({ ...face, blinkDetected: e.target.checked })}
            />
            Natural Blink Detected
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={face.headMovementDetected}
              onChange={(e) => setFace({ ...face, headMovementDetected: e.target.checked })}
            />
            Natural Head Movement Detected
          </label>
        </div>

        <h2 className="text-lg font-bold mb-3 mt-6">Voice Clone Signals</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-2">Pitch Variation (0-100)</label>
            <input
              type="number" min="0" max="100"
              value={voice.pitchVariation}
              onChange={(e) => setVoice({ ...voice, pitchVariation: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Synthetic Artifacts (0-100)</label>
            <input
              type="number" min="0" max="100"
              value={voice.syntheticArtifacts}
              onChange={(e) => setVoice({ ...voice, syntheticArtifacts: Number(e.target.value) })}
            />
          </div>
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={voice.breathingDetected}
            onChange={(e) => setVoice({ ...voice, breathingDetected: e.target.checked })}
          />
          Natural Breathing Pattern Detected
        </label>

        <button onClick={runDeepfakeAnalysis} className="btn-primary mt-6" disabled={loading}>
          {loading ? "Analyzing..." : "Run Deepfake Analysis"}
        </button>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      </div>

      <DeepfakeResultCard result={result} />
    </div>
  );
}

export default DeepfakeDashboard;