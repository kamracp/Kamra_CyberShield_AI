import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

interface Props {
  children: React.ReactNode;
}

function MainLayout({ children }: Props) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }} className="bg-gray-100">
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar />

        <main
          style={{ flex: 1, padding: "28px", maxWidth: "1400px", width: "100%", margin: "0 auto" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;