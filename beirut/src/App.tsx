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
import LoginPage from "./components/user/login";
import DashboardLayout from "./components/dashboardlayout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardRequests from "./components/dashborardrequests";
import DashboardOverview from "./components/dashboardmain";
import AdminDashboard from "./components/admindashboard";
import AdminRequests from "./components/adminrequests";
import Reports from "./components/reports";
import AdminComplaints from "./components/adminComplaints";
import AdminPayments from "./components/adminpayments";
import Settings from "./components/settings";

function DashboardIndex() {
  const { user } = useAuth();
  return user?.role === "admin" ? <AdminDashboard /> : <DashboardOverview />;
}
function RequestsPage() {
  const { user } = useAuth();
  return user?.role === "admin" ? <AdminRequests /> : <DashboardRequests />;
}
function ReportsPage() {
  const { user, token } = useAuth();
  return user?.role === "admin" ? (
    <AdminComplaints token={token} />
  ) : (
    <Reports />
  );
}
function PaymentsPage() {
  const { user } = useAuth();
  return user?.role === "admin" ? (
    <AdminPayments />
  ) : (
    <Payments />
  );
}
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
            <Route index element={<DashboardIndex />} />
            <Route path="complaints" element={<ReportsPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="fpayments" element={<Fpayments />} />
            <Route path="spayment" element={<Spayment />} />
            <Route path="requests" element={<RequestsPage />} />
            <Route path="settings" element={<Settings />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;