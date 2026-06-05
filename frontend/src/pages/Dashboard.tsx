import KPICard from "../components/KPICard";
import TransactionTable from "../components/TransactionTable";

function Dashboard() {
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <KPICard
          title="Transactions"
          value="12,500"
        />

        <KPICard
          title="High Risk Alerts"
          value="230"
        />

        <KPICard
          title="Blocked"
          value="41"
        />

        <KPICard
          title="Compliance"
          value="92%"
        />
      </div>

      <TransactionTable />
    </>
  );
}

export default Dashboard;