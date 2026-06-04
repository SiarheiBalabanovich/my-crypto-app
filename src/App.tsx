import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DashboardPage } from "./pages/dashboard";
import { DashboardSection } from "./widgets/dashboard/dashboard-section";
import { FeatureSection } from "./widgets/landing/feature-section";
import { HeroSection } from "./widgets/landing/hero-section";
import { ProgressSection } from "./widgets/landing/progress-section";
import { ReadyToTrySection } from "./widgets/landing/ready-to-try-section";
import { Footer } from "./widgets/layout/footer";

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

        <Route path="/dashboard/:token" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}