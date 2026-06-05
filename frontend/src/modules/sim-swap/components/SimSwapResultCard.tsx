import type { SimSwapResult } from "../types/SimSwapTypes";

interface Props {
  result: SimSwapResult | null;
}

function SimSwapResultCard({
  result,
}: Props) {
  if (!result) return null;

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>SIM Swap Risk Analysis</h2>

      <p>
        <strong>Risk Score:</strong>{" "}
        {result.score}
      </p>

      <p>
        <strong>Risk Level:</strong>{" "}
        {result.riskLevel}
      </p>

      <h3>Reasons</h3>

      <ul>
        {result.reasons.map(
          (reason, index) => (
            <li key={index}>
              {reason}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default SimSwapResultCard;