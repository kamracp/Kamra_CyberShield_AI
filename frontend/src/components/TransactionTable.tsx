import { transactions } from "../data/TransactionData";

import { calculateRiskScore } from "../calculations/RiskCalculationEngine";

function TransactionTable() {
  return (
    <div
      style={{
        marginTop: "40px",
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>Recent Transactions</h2>

      <table
  style={{
    width: "100%",
    marginTop: "20px",
    borderCollapse: "separate",
    borderSpacing: "0 10px",
  }}
>
  <thead>
    <tr>
      <th style={{ padding: "12px" }}>ID</th>
      <th style={{ padding: "12px" }}>Amount</th>
      <th style={{ padding: "12px" }}>Location</th>
      <th style={{ padding: "12px" }}>Device</th>
      <th style={{ padding: "12px" }}>Risk Score</th>
      <th style={{ padding: "12px" }}>Status</th>
    </tr>
  </thead>

  <tbody>
    {transactions.map((txn) => {
      const result = calculateRiskScore({
        amount: txn.amount,
        location: txn.location,
        device: txn.device,
      });

      let badgeColor = "#22c55e";

      if (result.status === "WARNING")
        badgeColor = "#eab308";

      if (result.status === "CRITICAL")
        badgeColor = "#ef4444";

      return (
        <tr
          key={txn.id}
          style={{
            background: "#0f172a",
          }}
        >
          <td style={{ padding: "15px" }}>
            {txn.id}
          </td>

          <td style={{ padding: "15px" }}>
            ₹{txn.amount.toLocaleString()}
          </td>

          <td style={{ padding: "15px" }}>
            {txn.location}
          </td>

          <td style={{ padding: "15px" }}>
            {txn.device}
          </td>

          <td style={{ padding: "15px" }}>
            {result.score}
          </td>

          <td style={{ padding: "15px" }}>
            <span
              style={{
                background: badgeColor,
                padding: "8px 16px",
                borderRadius: "20px",
                fontWeight: "bold",
                display: "inline-block",
                minWidth: "100px",
                textAlign: "center",
                color: "white",
              }}
            >
              {result.status}
            </span>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>
    </div>
  );
}

export default TransactionTable;