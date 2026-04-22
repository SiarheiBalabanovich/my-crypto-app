import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import DashboardSection from "./components/DashboardSection";
import ProgressSection from "./components/ProgressSection";
import ReadyToTrySection from "./components/ReadyToTrySection";
import Footer from "./components/Footer";
import DashboardPage from "./components/DashboardPage";


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