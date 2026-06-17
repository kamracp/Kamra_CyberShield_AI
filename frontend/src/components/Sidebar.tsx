
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "260px",
        background: "#111827",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2>CyberShield AI</h2>

      <hr />

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none" }}
        >
          Dashboard
        </Link>

        <Link
          to="/fraud"
          style={{ color: "white", textDecoration: "none" }}
        >
          Fraud Monitor
        </Link>

        <Link
          to="/aml"
          style={{ color: "white", textDecoration: "none" }}
        >
          AML Center
        </Link>

        <Link
          to="/compliance"
          style={{ color: "white", textDecoration: "none" }}
        >
          Compliance
        </Link>

        <Link
          to="/upi"
          style={{ color: "white", textDecoration: "none" }}
        >
          UPI Security
        </Link>

        <Link
          to="/fraud-engine"
          style={{ color: "white", textDecoration: "none" }}
        >
          Unified Fraud Engine
        </Link>

        <Link
          to="/sim-swap"
          style={{ color: "white", textDecoration: "none" }}
        >
          SIM Swap
        </Link>

        <Link
          to="/velocity-risk"
          style={{ color: "white", textDecoration: "none" }}
        >
          Velocity Risk
        </Link>

        <Link
          to="/geo-risk"
          style={{ color: "white", textDecoration: "none" }}
        >
          Geo Risk
        </Link>

        <Link
          to="/impossible-travel"
          style={{ color: "white", textDecoration: "none" }}
        >
          Impossible Travel
        </Link>

        <Link
          to="/deepfake"
          style={{ color: "#22c55e", textDecoration: "none" }}
        >
          Deepfake Shield
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;

