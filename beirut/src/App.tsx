import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/navbar";
import MainPage from "./components/mainpage";
import Municipality from "./components/municipality";
import News from "./components/news";
import City from "./components/city";
import Projects from "./components/projects";
import Services from "./components/services";
import "./App.css";
import Payments from "./components/payments";
import Fpayments from "./components/fpayments";
import ScrollToTop from "./components/ScrollToTop";
import Spayment from "./components/spayment";
import Reports from "./components/reports";
import LoginPage from "./components/user/login";
import DashboardLayout from "./components/dashboardlayout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardRequests from "./components/dashborardrequests";
import DashboardOverview from "./components/dashboardmain";

// Pages that use the public navbar
function Layout() {
  const location = useLocation();
  const hideNav = location.pathname === "/login";
  return (
    <>
      {!hideNav && <Navbar />}
      <Outlet />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>

          {/* ── Public pages (with navbar) ── */}
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/municipality" element={<Municipality />} />
            <Route path="/news" element={<News />} />
            <Route path="/city" element={<City />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route
            path="/dashboard"
            element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}
          >
            <Route index element={<DashboardOverview/>} />
            <Route path="complaints" element={<Reports />} />
            <Route path="payments" element={<Payments />} />
            <Route path="fpayments" element={<Fpayments />} />
            <Route path="spayment" element={<Spayment />} />
            <Route path="requests" element={<DashboardRequests />} />
            <Route path="settings" element={<div className="text-right"><h1 className="text-2xl font-bold text-green-800">الإعدادات</h1></div>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;