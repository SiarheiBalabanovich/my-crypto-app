import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HeroSection } from "./widgets/landing/hero-section";
import { FeatureSection } from "./widgets/landing/feature-section";
import { DashboardSection } from "./widgets/dashboard/dashboard-section";
import { ProgressSection } from "./widgets/landing/progress-section";
import { ReadyToTrySection } from "./widgets/landing/ready-to-try-section";
import Footer from "./widgets/layout/footer";
import DashboardPage from "./pages/dashboard/dashboard-page";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen">
              <HeroSection />
              <FeatureSection />
              <DashboardSection />
              <ProgressSection />
              <ReadyToTrySection />
              <Footer />
            </div>
          }
        />
        {/* Dashboard Page with token */}
        <Route path="/dashboard/:token" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}