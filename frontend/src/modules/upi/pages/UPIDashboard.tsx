import { useState } from "react";

import UPIResultCard from "../components/UPIResultCard";

import { calculateUPIRisk } from "../calculations/UPIRiskEngine";

function UPIDashboard() {
  const [result, setResult] =
    useState<any>(null);

  const runRiskTest = () => {
    const risk =
      calculateUPIRisk({
        amount: 100000,
        deviceAgeDays: 2,
        isNewSIM: true,
        isNewDevice: true,
        vpnDetected: true,
      });

    setResult(risk);
  };

  return (
    <div>
      <h1>
        💳 UPI Fraud Detection Center
      </h1>

      <button
        onClick={runRiskTest}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Run UPI Risk Check
      </button>

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