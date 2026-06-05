function FraudMonitor() {
  return (
    <div
      style={{
        color: "white",
      }}
    >
      <h1>🚨 Fraud Monitoring Center</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            background: "#dc2626",
            padding: "20px",
            borderRadius: "10px",
            minWidth: "250px",
          }}
        >
          <h3>Critical Alerts</h3>

          <h1>18</h1>
        </div>

        <div
          style={{
            background: "#ca8a04",
            padding: "20px",
            borderRadius: "10px",
            minWidth: "250px",
          }}
        >
          <h3>High Risk Users</h3>

          <h1>57</h1>
        </div>

        <div
          style={{
            background: "#2563eb",
            padding: "20px",
            borderRadius: "10px",
            minWidth: "250px",
          }}
        >
          <h3>Blocked Accounts</h3>

          <h1>23</h1>
        </div>
      </div>
    </div>
  );
}

export default FraudMonitor;