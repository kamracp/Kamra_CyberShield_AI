
import type {
  DeepfakeRiskResult,
} from "../types/DeepfakeTypes";

interface Props {
  result: DeepfakeRiskResult | null;
}

function DeepfakeResultCard({
  result,
}: Props) {
  if (!result) {
    return null;
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        marginTop: "20px",
        borderRadius: "8px",
      }}
    >
      <h2>Deepfake Analysis Result</h2>

      <p>
        <strong>Face Risk:</strong>{" "}
        {result.faceRisk}
      </p>

      <p>
        <strong>Voice Risk:</strong>{" "}
        {result.voiceRisk}
      </p>

      <p>
        <strong>Overall Risk:</strong>{" "}
        {result.overallRisk}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {result.status}
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

export default DeepfakeResultCard;

