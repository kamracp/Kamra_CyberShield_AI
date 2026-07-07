import KPICard from "../components/KPICard";

function ComplianceMonitor() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: "#0f172a" }}>🛡️ Compliance Center</h1>
      <p className="text-gray-500 text-sm mb-6">RBI • NPCI • PCI-DSS Compliance</p>

      <div className="flex flex-wrap gap-4">
        <KPICard title="Compliance Score" value="92%" accent="#16a34a" />
        <KPICard title="Open Findings" value="14" accent="#f97316" />
        <KPICard title="Audit Status" value="PASS" accent="#16a34a" />
      </div>
    </div>
  );
}

export default ComplianceMonitor;