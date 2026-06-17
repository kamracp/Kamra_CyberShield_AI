
import { useState } from "react";

import { calculateFaceLiveness } from "../calculations/FaceLivenessEngine";
import { calculateVoiceCloneRisk } from "../calculations/VoiceCloneEngine";
import { calculateDeepfakeRisk } from "../calculations/DeepfakeRiskEngine";

import DeepfakeResultCard from "../components/DeepfakeResultCard";
import DeepfakeUploadPanel from "../components/DeepfakeUploadPanel";

import type {
  DeepfakeRiskResult,
} from "../types/DeepfakeTypes";

function DeepfakeDashboard() {
  const [result, setResult] =
    useState<DeepfakeRiskResult | null>(null);

  const runDeepfakeAnalysis = () => {
    const faceResult =
      calculateFaceLiveness({
        blinkDetected: false,
        headMovementDetected: false,
        reflectionScore: 30,
        textureScore: 35,
      });

    const voiceResult =
      calculateVoiceCloneRisk({
        pitchVariation: 10,
        breathingDetected: false,
        syntheticArtifacts: 85,
      });

    const deepfakeResult =
      calculateDeepfakeRisk(
        faceResult.score,
        voiceResult.score
      );

    setResult(deepfakeResult);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        Deepfake Shield Dashboard
      </h1>

      <DeepfakeUploadPanel />

      <button
        onClick={runDeepfakeAnalysis}
      >
        Run Deepfake Analysis
      </button>

      <DeepfakeResultCard
        result={result}
      />
    </div>
  );
}

export default DeepfakeDashboard;

