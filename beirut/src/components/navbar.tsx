import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative pb-1 transition hover:text-green-700 ${
      isActive
        ? "text-green-700 font-bold after:content-[''] after:absolute after:right-0 after:bottom-0 after:w-full after:h-0.5 after:bg-green-700"
        : "text-gray-700"
    }`;

  return (
    <div className="sticky top-0 z-50">
      <div className="h-1.5 bg-green-700" />

      <div className="bg-gray-100 shadow-sm px-6 xl:px-20 py-4">
        <div className="flex items-center justify-between flex-row-reverse">
          {/* Right Side */}
          <div className="flex items-center gap-8 flex-row-reverse">
            <h1 className="text-green-700 font-bold text-xl whitespace-nowrap">
              بلدية بيروت
            </h1>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex flex-row-reverse gap-6">
              <NavLink to="/" end className={linkClass}>
                الرئيسية
              </NavLink>

              <NavLink to="/municipality" className={linkClass}>
                عن البلدية
              </NavLink>

              <NavLink to="/services" className={linkClass}>
                الخدمات
              </NavLink>

              <NavLink to="/news" className={linkClass}>
                الأخبار
              </NavLink>

              <NavLink to="/projects" className={linkClass}>
                المشاريع
              </NavLink>

              <NavLink to="/city" className={linkClass}>
                الأحياء
              </NavLink>
            </nav>
          </div>

          {/* Left Side */}
          <div className="hidden xl:flex flex-row-reverse items-center gap-4">
            <div className="relative flex items-center">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-gray-400 absolute right-3 pointer-events-none"
              />

              <input
                type="text"
                placeholder=". . . بحث عن مشاريع"
                className="bg-gray-200 border border-gray-300 rounded-xl h-10 pr-9 pl-4 text-right text-sm w-52 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <NavLink
                  to="/dashboard"
                  className="flex items-center gap-2 text-sm text-green-800 font-medium hover:underline"
                >
                  <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.charAt(0)}
                  </div>
                  <span>أهلاً، {user?.name}</span>
                </NavLink>
                <button
                  type="button"
                  onClick={logout}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-100 transition cursor-pointer"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <NavLink to="/login">
                <button className="bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-green-600 transition cursor-pointer w-full">
                  دخول المواطن
                </button>
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden text-2xl text-green-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="xl:hidden mt-4 flex flex-col items-end gap-4 text-right">
            <NavLink to="/" end className={linkClass}>
              الرئيسية
            </NavLink>

            <NavLink to="/municipality" className={linkClass}>
              عن البلدية
            </NavLink>

            <NavLink to="/services" className={linkClass}>
              الخدمات
            </NavLink>

            <NavLink to="/news" className={linkClass}>
              الأخبار
            </NavLink>

            <NavLink to="/projects" className={linkClass}>
              المشاريع
            </NavLink>

            <NavLink to="/city" className={linkClass}>
              الأحياء
            </NavLink>

            {/* Mobile Search */}
            <div className="relative flex items-center w-full">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-gray-400 absolute right-3 pointer-events-none"
              />

              <input
                type="text"
                placeholder=". . . بحث عن مشاريع"
                className="w-full bg-gray-200 border border-gray-300 rounded-xl h-10 pr-9 pl-4 text-right text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <NavLink
                  to="/dashboard"
                  className="flex items-center gap-2 text-sm text-green-800 font-medium hover:underline"
                >
                  <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.charAt(0)}
                  </div>
                  <span>أهلاً، {user?.name}</span>
                </NavLink>
                <button
                  type="button"
                  onClick={logout}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-100 transition cursor-pointer"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <NavLink to="/login">
                <button className="bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-green-600 transition cursor-pointer w-full">
                  دخول المواطن
                </button>
              </NavLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
