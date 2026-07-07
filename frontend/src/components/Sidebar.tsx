import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: "📊" },
  { to: "/fraud", label: "Fraud Monitor", icon: "🚨" },
  { to: "/aml", label: "AML Center", icon: "🏦" },
  { to: "/compliance", label: "Compliance", icon: "📋" },
  { to: "/upi", label: "UPI Security", icon: "💳" },
  { to: "/fraud-engine", label: "Unified Fraud Engine", icon: "🧠" },
  { to: "/sim-swap", label: "SIM Swap", icon: "📱" },
  { to: "/velocity-risk", label: "Velocity Risk", icon: "⚡" },
  { to: "/geo-risk", label: "Geo Risk", icon: "🌍" },
  { to: "/impossible-travel", label: "Impossible Travel", icon: "✈️" },
  { to: "/deepfake", label: "Deepfake Shield", icon: "🎭" },
  { to: "/device-fingerprint", label: "Device Fingerprint", icon: "🖥️" },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div
      style={{ width: "260px", minHeight: "100vh", flexShrink: 0 }}
      className="bg-slate-900"
    >
      <div className="px-4 py-4" style={{ borderBottom: "1px solid #1e293b" }}>
        <h1 className="text-white text-xl font-bold">🛡️ CyberShield AI</h1>
        <p className="text-gray-400 text-xs mt-1">Fraud &amp; Risk Intelligence</p>
      </div>

      <div className="flex" style={{ flexDirection: "column", gap: "2px", padding: "12px" }}>
        {NAV_ITEMS.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-2 px-3 py-2 rounded"
              style={{
                textDecoration: "none",
                color: active ? "#ffffff" : "#94a3b8",
                background: active ? "#2563eb" : "transparent",
                fontSize: "14px",
                fontWeight: active ? 600 : 500,
                transition: "background 0.15s ease, color 0.15s ease",
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;