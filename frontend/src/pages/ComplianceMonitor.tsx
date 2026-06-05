function ComplianceMonitor() {
  return (
    <div>
      <h1>🛡️ Compliance Center</h1>

      <h2>
        RBI • NPCI • PCI-DSS Compliance
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Compliance Score</h3>
          <h1>92%</h1>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Open Findings</h3>
          <h1>14</h1>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Audit Status</h3>
          <h1>PASS</h1>
        </div>
      </div>
    </div>
  );
}

export default ComplianceMonitor;