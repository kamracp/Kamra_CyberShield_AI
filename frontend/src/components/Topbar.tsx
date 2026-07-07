function Topbar() {
  return (
    <div
      className="flex items-center justify-between px-6"
      style={{
        background: "#1e293b",
        height: "64px",
        flexShrink: 0,
      }}
    >
      <h2 className="text-white text-lg font-bold">
        🛡️ Banking Fraud Detection Center
      </h2>
      <span className="text-gray-400 text-sm">
        CyberShield AI — Risk Intelligence Suite
      </span>
    </div>
  );
}

export default Topbar;