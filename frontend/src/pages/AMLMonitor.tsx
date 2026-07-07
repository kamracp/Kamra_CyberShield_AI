import KPICard from "../components/KPICard";

function AMLMonitor() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: "#0f172a" }}>💰 AML Monitoring Center</h1>
      <p className="text-gray-500 text-sm mb-6">Anti Money Laundering Dashboard</p>

      <div className="flex flex-wrap gap-4">
        <KPICard title="Suspicious Accounts" value="18" accent="#f97316" />
        <KPICard title="Mule Accounts" value="7" accent="#dc2626" />
        <KPICard title="AML Alerts" value="34" accent="#eab308" />
      </div>
    </div>
  );
}

export default AMLMonitor;