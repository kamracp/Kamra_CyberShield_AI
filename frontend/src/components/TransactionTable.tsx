import { transactions } from "../data/TransactionData";
import { calculateRiskScore } from "../calculations/RiskCalculationEngine";

function TransactionTable() {
  return (
    <div
      className="rounded-xl shadow-lg"
      style={{ marginTop: "24px", background: "#1e293b", padding: "22px" }}
    >
      <h2 className="text-white text-lg font-bold mb-3">Recent Transactions</h2>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }}>
          <thead>
            <tr>
              {["ID", "Amount", "Location", "Device", "Risk Score", "Status"].map((h) => (
                <th
                  key={h}
                  className="text-gray-400 text-xs uppercase tracking-wide"
                  style={{ padding: "10px 12px", textAlign: "left" }}
                >
                  {h}
                </th>
              ))}
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
              if (result.status === "WARNING") badgeColor = "#eab308";
              if (result.status === "CRITICAL") badgeColor = "#ef4444";

              return (
                <tr key={txn.id} style={{ background: "#0f172a" }}>
                  <td className="text-white text-sm" style={{ padding: "14px 12px", borderRadius: "8px 0 0 8px" }}>
                    {txn.id}
                  </td>
                  <td className="text-white text-sm" style={{ padding: "14px 12px" }}>
                    ₹{txn.amount.toLocaleString()}
                  </td>
                  <td className="text-gray-400 text-sm" style={{ padding: "14px 12px" }}>
                    {txn.location}
                  </td>
                  <td className="text-gray-400 text-sm" style={{ padding: "14px 12px" }}>
                    {txn.device}
                  </td>
                  <td className="text-white text-sm font-semibold" style={{ padding: "14px 12px" }}>
                    {result.score}
                  </td>
                  <td style={{ padding: "14px 12px", borderRadius: "0 8px 8px 0" }}>
                    <span className="badge" style={{ background: badgeColor, minWidth: "100px", textAlign: "center" }}>
                      {result.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;