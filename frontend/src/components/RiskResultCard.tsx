interface Props {
  score: number;
  status: string;
}

function RiskResultCard({ score, status }: Props) {
  let badgeColor = "#22c55e";
  if (status === "WARNING") badgeColor = "#eab308";
  if (status === "CRITICAL") badgeColor = "#ef4444";

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-xl font-bold mb-3">Risk Score: {score}</h2>
      <span className="badge" style={{ background: badgeColor }}>{status}</span>
    </div>
  );
}

export default RiskResultCard;