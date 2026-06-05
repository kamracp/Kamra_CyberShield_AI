interface Props {
  score: number;
  status: string;
  reasons: string[];
}

function FraudResultCard({
  score,
  status,
  reasons,
}: Props) {
  let color = "#22c55e";

  if (status === "WARNING")
    color = "#eab308";

  if (status === "CRITICAL")
    color = "#ef4444";

  if (status === "BLOCK")
    color = "#7f1d1d";

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>
        Unified Fraud Score: {score}
      </h2>

      <div
        style={{
          background: color,
          padding: "10px",
          borderRadius: "8px",
          width: "150px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {status}
      </div>

      <h3>Risk Sources</h3>

      <ul>
        {reasons.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

export default FraudResultCard;