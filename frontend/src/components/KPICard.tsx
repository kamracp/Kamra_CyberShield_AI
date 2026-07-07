interface Props {
  title: string;
  value: string;
  accent?: string;
}

function KPICard({ title, value, accent = "#2563eb" }: Props) {
  return (
    <div
      className="kpi-card"
      style={{ borderLeft: `4px solid ${accent}` }}
    >
      <p className="text-gray-500 text-sm font-semibold">{title}</p>
      <h1 className="text-3xl font-bold" style={{ color: "#0f172a", margin: "6px 0 0" }}>
        {value}
      </h1>
    </div>
  );
}

export default KPICard;