interface Props {
  title: string;
  value: string;
}

function KPICard({
  title,
  value,
}: Props) {
  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
        minWidth: "220px",
      }}
    >
      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}

export default KPICard;