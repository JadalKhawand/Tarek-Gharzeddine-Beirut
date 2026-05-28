import {
  BrowserRouter, Routes, Route, useLocation, Outlet,
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
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

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
    <AuthProvider>        {/* 👈 wrap everything here */}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/municipality" element={<Municipality />} />
            <Route path="/news" element={<News />} />
            <Route path="/city" element={<City />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/spayment" element={<Spayment />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
            <Route path="/fpayments" element={<ProtectedRoute><Fpayments /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;