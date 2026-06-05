import { useState } from "react";

import { calculateVelocityRisk } from "../calculations/VelocityRiskEngine";
import VelocityRiskResultCard from "../components/VelocityRiskResultCard";

function VelocityRiskDashboard() {
  const [result, setResult] = useState(null);

  const runVelocityTest = () => {
    const risk = calculateVelocityRisk({
      transactionsPerMinute: 20,
      transactionsPerHour: 120,
      beneficiaryAdditions: 10,
      failedAttempts: 10,
    });

    setResult(risk);
  };

  return (
    <div>
      <h1>
        ⚡ Velocity Risk Engine
      </h1>

      <button onClick={runVelocityTest}>
        Run Velocity Risk Check
      </button>

      <VelocityRiskResultCard
        result={result}
      />
    </div>
  );
}

export default VelocityRiskDashboard;