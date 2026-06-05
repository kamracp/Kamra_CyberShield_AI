function AMLMonitor() {
  return (
    <div>
      <h1>💰 AML Monitoring Center</h1>

      <h2>
        Anti Money Laundering Dashboard
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
          <h3>Suspicious Accounts</h3>
          <h1>18</h1>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Mule Accounts</h3>
          <h1>7</h1>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>AML Alerts</h3>
          <h1>34</h1>
        </div>
      </div>
    </div>
  );
}

export default AMLMonitor;