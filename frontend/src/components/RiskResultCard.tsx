interface Props {
  score: number;
  status: string;
}

function RiskResultCard({
  score,
  status,
}: Props) {
  let badgeColor = "#22c55e";

  if (status === "WARNING")
    badgeColor = "#eab308";

  if (status === "CRITICAL")
    badgeColor = "#ef4444";

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        borderRadius: "10px",
        border: "1px solid #334155",
        background: "#1e293b",
      }}
    >
      <h2>
        Risk Score: {score}
      </h2>

      <div
        style={{
          background: badgeColor,
          padding: "10px",
          borderRadius: "8px",
          width: "150px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {status}
      </div>
    </div>
  );
}

export default RiskResultCard;