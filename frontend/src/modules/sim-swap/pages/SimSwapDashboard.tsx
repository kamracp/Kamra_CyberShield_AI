import { useState } from "react";
import { calculateSimSwapRisk } from "../calculations/SimSwapEngine";

function SimSwapDashboard() {
  const [result, setResult] = useState(null);

  const runTest = () => {
    const risk = calculateSimSwapRisk({
      simChangedHours: 2,
      otpFailures: 5,
      newDevice: true,
      highValueTransaction: true,
    });

    setResult(risk);
  };

  return (
    <div>
      <h1>SIM SWAP WORKING</h1>

      <button onClick={runTest}>
        Run SIM Swap Check
      </button>

      <pre>
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}

export default SimSwapDashboard;