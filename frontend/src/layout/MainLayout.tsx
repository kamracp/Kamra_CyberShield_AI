import Sidebar from "../components/Sidebar";

interface Props {
  children: React.ReactNode;
}

function MainLayout({
  children,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default MainLayout;