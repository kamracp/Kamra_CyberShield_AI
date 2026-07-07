import KPICard from "../components/KPICard";

function FraudMonitor() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: "#0f172a" }}>🚨 Fraud Monitoring Center</h1>
      <p className="text-gray-500 text-sm mb-6">Live overview of flagged accounts and alerts</p>

      <div className="flex flex-wrap gap-4">
        <KPICard title="Critical Alerts" value="18" accent="#dc2626" />
        <KPICard title="High Risk Users" value="57" accent="#ca8a04" />
        <KPICard title="Blocked Accounts" value="23" accent="#2563eb" />
      </div>
    </div>
  );
}

export default FraudMonitor;