import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope, faLock, faUser, faPhone, faEye, faEyeSlash, faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    // basic frontend validation
    if (mode === "register" && password !== confirm) {
      return setError("كلمة المرور وتأكيدها غير متطابقتين");
    }

    setLoading(true);
    try {
      const url = mode === "login"
        ? "http://localhost:3000/auth/login"
        : "http://localhost:3000/auth/register";

      const body = mode === "login"
        ? { email, password }
        : { name: `${firstName} ${lastName}`, email, password, phone };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.error || "حدث خطأ ما");

      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      setError("فشل الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 flex flex-col font-sans">

      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-8 py-4 flex flex-row-reverse items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">ب</span>
          </div>
          <span className="text-green-800 font-semibold text-sm">بلدية بيروت</span>
        </NavLink>
        <NavLink to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-700 transition">
          <FontAwesomeIcon icon={faArrowRight} />
          <span>العودة إلى الرئيسية</span>
        </NavLink>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-white text-2xl font-bold">ب</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {mode === "login" ? "أهلاً بعودتك" : "إنشاء حساب جديد"}
            </h1>
            <p className="text-sm text-gray-400">
              {mode === "login"
                ? "سجّل دخولك للوصول إلى خدمات بلدية بيروت"
                : "انضم إلى منصة بلدية بيروت الرقمية"}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex flex-row-reverse bg-gray-100 rounded-xl p-1 mb-6">
            <button type="button" onClick={() => { setMode("login"); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition
                ${mode === "login" ? "bg-white text-green-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
              تسجيل الدخول
            </button>
            <button type="button" onClick={() => { setMode("register"); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition
                ${mode === "register" ? "bg-white text-green-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
              حساب جديد
            </button>
          </div>

          {/* Form card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">

            {mode === "register" && (
              <div className="flex flex-row-reverse gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-sm text-gray-500">الاسم الأول</label>
                  <div className="relative">
                    <input type="text" placeholder="أحمد" value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-right text-sm focus:outline-none focus:border-green-500 transition" />
                    <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-sm text-gray-500">الاسم الأخير</label>
                  <div className="relative">
                    <input type="text" placeholder="خالد" value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-right text-sm focus:outline-none focus:border-green-500 transition" />
                    <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-500">البريد الإلكتروني</label>
              <div className="relative">
                <input type="email" placeholder="example@email.com" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-right text-sm focus:outline-none focus:border-green-500 transition" />
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
              </div>
            </div>

            {mode === "register" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-gray-500">رقم الهاتف</label>
                <div className="relative">
                  <input type="tel" placeholder="+961 XX XXX XXX" value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-right text-sm focus:outline-none focus:border-green-500 transition" />
                  <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-500">كلمة المرور</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-right text-sm focus:outline-none focus:border-green-500 transition" />
                <FontAwesomeIcon icon={faLock} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition">
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-sm cursor-pointer" />
                </button>
              </div>
            </div>

            {mode === "register" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-gray-500">تأكيد كلمة المرور</label>
                <div className="relative">
                  <input type={showConfirm ? "text" : "password"} placeholder="••••••••" value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-right text-sm focus:outline-none focus:border-green-500 transition" />
                  <FontAwesomeIcon icon={faLock} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition">
                    <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} className="text-sm cursor-pointer" />
                  </button>
                </div>
              </div>
            )}

            {mode === "login" && (
              <div className="flex flex-row-reverse justify-between items-center text-sm">
                <label className="flex flex-row-reverse items-center gap-2 text-gray-500 cursor-pointer">
                  <input type="checkbox" className="accent-green-700" />
                  <span>تذكرني</span>
                </label>
                <button type="button" className="text-green-700 hover:underline">
                  نسيت كلمة المرور؟
                </button>
              </div>
            )}

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-500 text-right bg-red-50 border border-red-100 rounded-xl px-4 py-2">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-600 disabled:bg-green-400 text-white font-medium py-3 rounded-xl transition text-sm text-center mt-1"
            >
              {loading ? "جاري التحميل..." : mode === "login" ? "تسجيل الدخول" : "إنشاء الحساب"}
            </button>

          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
            {mode === "login" ? "ليس لديك حساب؟ " : "لديك حساب بالفعل؟ "}
            <button type="button"
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
              className="text-green-700 font-medium hover:underline">
              {mode === "login" ? "سجّل الآن مجاناً" : "سجّل دخولك"}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;