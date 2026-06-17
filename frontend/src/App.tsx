import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import FraudMonitor from "./pages/FraudMonitor";
import SimSwapDashboard from "./modules/sim-swap/pages/SimSwapDashboard";
import VelocityRiskDashboard from "./modules/velocity-risk/pages/VelocityRiskDashboard";
import AMLMonitor from "./pages/AMLMonitor";
import ComplianceMonitor from "./pages/ComplianceMonitor";
import UPIDashboard from "./modules/upi/pages/UPIDashboard";
import FraudDashboard from "./modules/fraud/pages/FraudDashboard";
import GeoRiskDashboard from "./modules/geo-risk/pages/GeoRiskDashboard";
import ImpossibleTravelDashboard from "./modules/impossible-travel/pages/ImpossibleTravelDashboard";
import DeepfakeDashboard from "./modules/deepfake/pages/DeepfakeDashboard";
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
<Route
  path="/velocity-risk"
  element={<VelocityRiskDashboard />}
/>
<Route
 path="/geo-risk"
 element={<GeoRiskDashboard />}
/>
<Route
  path="/impossible-travel"
  element={<ImpossibleTravelDashboard />}
/>
<Route
  path="/deepfake"
  element={<DeepfakeDashboard />}
/>
        </Routes>
        
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;