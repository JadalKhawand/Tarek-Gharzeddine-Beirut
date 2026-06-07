import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableColumns,
  faFileLines,
  faTriangleExclamation,
  faMoneyBill,
  faGear,
  faRightFromBracket,
  faBars,
  faXmark,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { NameDisplay, avatarLetter } from "./nameUtils";
import { useState } from "react";

const navItems = [
  { label: "لوحة القيادة", path: "/dashboard", icon: faTableColumns },
  { label: "طلباتي", path: "/dashboard/requests", icon: faFileLines },
  {
    label: "البلاغات",
    path: "/dashboard/complaints",
    icon: faTriangleExclamation,
  },
  {
    label: "الرسوم والمدفوعات",
    path: "/dashboard/payments",
    icon: faMoneyBill,
  },
  { label: "الإعدادات", path: "/dashboard/settings", icon: faGear },
];

function DashboardLayout() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* User card */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex flex-row-reverse items-center gap-3">
          <div className="w-11 h-11 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {avatarLetter(user?.name)}
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">
              أهلاً، <NameDisplay name={user?.name} />
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              بوابة المواطن الرقمية
            </p>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 p-4 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex flex-row-reverse items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition
              ${
                isActive
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`
            }
          >
            <FontAwesomeIcon icon={item.icon} className="w-4" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          type="button"
          onClick={handleLogout}
          className="flex flex-row-reverse items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition w-full cursor-pointer"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="w-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
  useEffect(() => {
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiresAt = payload.exp * 1000;
      const now = Date.now();

      if (expiresAt <= now) {
        logout();
        setSessionExpired(true);
        return;
      }

      // auto logout exactly when token expires
      const timeout = setTimeout(() => {
        logout();
        setSessionExpired(true);
      }, expiresAt - now);

      return () => clearTimeout(timeout);
    } catch {
      logout();
      setSessionExpired(true);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-l border-gray-100 fixed right-0 top-0 h-full z-30">
        {/* Logo */}
        <div className="px-5 py-4 border-b border-gray-100">
          <NavLink to="/" className="flex flex-row-reverse items-center gap-2">
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">ب</span>
            </div>
            <span className="text-green-800 font-semibold text-sm">
              بلدية بيروت
            </span>
          </NavLink>
        </div>
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={`fixed right-0 top-0 h-full w-64 bg-white z-50 lg:hidden transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="px-5 py-4 border-b border-gray-100 flex flex-row-reverse items-center justify-between">
          <NavLink to="/" className="flex flex-row-reverse items-center gap-2">
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">ب</span>
            </div>
            <span className="text-green-800 font-semibold text-sm">
              بلدية بيروت
            </span>
          </NavLink>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:mr-64 min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex flex-row-reverse items-center justify-between sticky top-0 z-20">
          <div className="flex flex-row-reverse items-center gap-3">
            <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>
        </div>

        {/* Page content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
      {sessionExpired && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            dir="rtl"
            className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl"
          >
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon
                icon={faLock}
                className="text-orange-500 text-xl"
              />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              انتهت مدة الجلسة
            </h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              انتهت صلاحية الوصول إلى لوحة التحكم. يرجى تسجيل الدخول مجدداً
              للمتابعة.
            </p>
            <NavLink
              to="/login"
              className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition text-sm block"
            >
              تسجيل الدخول
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
