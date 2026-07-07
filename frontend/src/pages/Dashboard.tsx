import KPICard from "../components/KPICard";
import TransactionTable from "../components/TransactionTable";

function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: "#0f172a" }}>
        Risk Overview
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Real-time snapshot across all fraud &amp; risk modules
      </p>

      <div className="flex flex-wrap gap-4">
        <KPICard title="Transactions" value="12,500" accent="#2563eb" />
        <KPICard title="High Risk Alerts" value="230" accent="#f97316" />
        <KPICard title="Blocked" value="41" accent="#dc2626" />
        <KPICard title="Compliance" value="92%" accent="#16a34a" />
      </div>

      <TransactionTable />
    </div>
  );
}

export default Dashboard;