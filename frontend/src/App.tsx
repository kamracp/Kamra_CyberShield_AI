import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import FraudMonitor from "./pages/FraudMonitor";
import SimSwapDashboard from "./modules/sim-swap/pages/SimSwapDashboard";
import AMLMonitor from "./pages/AMLMonitor";
import ComplianceMonitor from "./pages/ComplianceMonitor";
import UPIDashboard from "./modules/upi/pages/UPIDashboard";
import FraudDashboard from "./modules/fraud/pages/FraudDashboard";
function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/fraud"
            element={<FraudMonitor />}
          />

          <Route
            path="/aml"
            element={<AMLMonitor />}
          />

          <Route
            path="/compliance"
            element={
              <ComplianceMonitor />
            }
          />
          <Route
            path="/upi"
            element={<UPIDashboard />}
          />
          <Route
  path="/fraud-engine"
  element={<FraudDashboard />}
/>

<Route
  path="/sim-swap"
  element={<SimSwapDashboard />}
/>


        </Routes>
        
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;