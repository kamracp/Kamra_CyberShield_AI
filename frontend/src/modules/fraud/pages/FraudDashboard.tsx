import { useState } from "react";

import FraudResultCard from "../components/FraudResultCard";

import { calculateFraudRisk }
from "../calculations/FraudEngine";

function FraudDashboard() {

  const [result, setResult] =
    useState<any>(null);

  const runFraudTest = () => {

    const fraudResult =
      calculateFraudRisk(
        120,
        75
      );

    setResult(fraudResult);
  };

  return (
    <div>
      <h1>
        🚨 Unified Fraud Engine
      </h1>

      <button
        onClick={runFraudTest}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Run Fraud Analysis
      </button>

      {result && (
        <FraudResultCard
          score={
            result.totalRiskScore
          }
          status={result.status}
          reasons={result.reasons}
        />
      )}
    </div>
  );
}

export default FraudDashboard;