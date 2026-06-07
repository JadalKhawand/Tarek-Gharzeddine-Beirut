import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser, faShield, faBell, faPen, faGear,
  faGlobe, faWrench, faCheck, faEye, faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

// ── Toggle switch ─────────────────────────────────────────────────────────────
function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-11 h-6 rounded-full transition-colors duration-200 relative shrink-0
        ${on ? "bg-green-600" : "bg-gray-300"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200
        ${on ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function formatPasswordAge(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "أقل من دقيقة";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `قبل ${minutes} دقيقة`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `قبل ${hours} ساعة`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `قبل ${days} يومًا`;
  const months = Math.floor(days / 30);
  if (months < 12) return `قبل ${months} شهرًا`;
  const years = Math.floor(months / 12);
  return years === 1 ? "قبل سنة" : `قبل ${years} سنوات`;
}

// ── User Settings ─────────────────────────────────────────────────────────────
function UserSettings() {
  const { user, token, login } = useAuth();

  const [editing, setEditing]         = useState(false);
  const [name, setName]               = useState(user?.name || "");
  const [phone, setPhone]             = useState((user as any)?.phone || "");
  const [neighborhood, setNeighborhood] = useState("الأشرفية، بيروت");
  const [saving, setSaving]           = useState(false);
  const [saveMsg, setSaveMsg]         = useState("");

  const [showPwForm, setShowPwForm]   = useState(false);
  const [currentPw, setCurrentPw]     = useState("");
  const [newPw, setNewPw]             = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [pwLoading, setPwLoading]     = useState(false);
  const [pwMsg, setPwMsg]             = useState("");

  const [emailNotif, setEmailNotif] = useState(() => {
    const stored = localStorage.getItem("settings_emailNotif");
    return stored === null ? true : stored === "true";
  });
  const [smsNotif, setSmsNotif] = useState(() => {
    const stored = localStorage.getItem("settings_smsNotif");
    return stored === null ? false : stored === "true";
  });

  useEffect(() => {
    localStorage.setItem("settings_emailNotif", String(emailNotif));
  }, [emailNotif]);

  useEffect(() => {
    localStorage.setItem("settings_smsNotif", String(smsNotif));
  }, [smsNotif]);

  const passwordChangedAt = user?.passwordChangedAt
    ? new Date(user.passwordChangedAt)
    : null;

  const passwordChangeNotice = passwordChangedAt
    ? `آخر تغيير ${formatPasswordAge(passwordChangedAt)}`
    : "لم تقم بتغيير كلمة المرور بعد. ننصح بتحديثها الآن لحماية حسابك.";

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaveMsg("");
    try {
      const res = await fetch("http://localhost:3000/auth/me", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      const data = await res.json();
      if (!res.ok) return setSaveMsg(data.error || "حدث خطأ");
      login(token!, { ...user!, name: data.name });
      setSaveMsg("✓ تم حفظ التغييرات");
      setEditing(false);
    } catch {
      setSaveMsg("فشل الاتصال بالخادم");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!newPw || !currentPw) return setPwMsg("يرجى ملء جميع الحقول");
    setPwLoading(true);
    setPwMsg("");
    try {
      const res = await fetch("http://localhost:3000/auth/password", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      const data = await res.json();
      if (!res.ok) return setPwMsg(data.error || "حدث خطأ");
      setPwMsg("✓ تم تغيير كلمة المرور");
      setCurrentPw(""); setNewPw(""); setShowPwForm(false);
    } catch {
      setPwMsg("فشل الاتصال بالخادم");
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="mx-auto text-right flex flex-col gap-5 p-5 max-w-2xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">إعدادات الحساب</h1>
        <p className="text-sm text-gray-400 mt-0.5">إدارة معلوماتك الشخصية، الأمان وتفضيلات التواصل الخاصة بك</p>
      </div>

      {/* Personal Info */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-row-reverse items-center justify-between mb-4">
          <div className="flex flex-row-reverse items-center gap-2">
            <FontAwesomeIcon icon={faUser} className="text-green-700" />
            <p className="text-base font-semibold text-gray-800">المعلومات الشخصية</p>
          </div>
          <button type="button" onClick={() => setEditing(!editing)}
            className="flex items-center gap-1.5 text-xs text-green-700 hover:underline">
            <FontAwesomeIcon icon={faPen} className="text-xs" />
            تعديل
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400">الاسم الكامل</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              disabled={!editing}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-600 transition" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400">البريد الإلكتروني</label>
            <input type="email" value={user?.email || ""} disabled
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm bg-gray-50 text-gray-500" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400">رقم الهاتف</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
              disabled={!editing}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-600 transition" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400">المنطقة / الحي</label>
            <input type="text" value={neighborhood} onChange={e => setNeighborhood(e.target.value)}
              disabled={!editing}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-600 transition" />
          </div>
        </div>

        {editing && (
          <div className="flex flex-row-reverse gap-3 mt-4">
            <button type="button" onClick={handleSaveProfile} disabled={saving}
              className="bg-green-700 hover:bg-green-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition disabled:opacity-50">
              {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
            </button>
            <button type="button" onClick={() => { setEditing(false); setName(user?.name || ""); }}
              className="border border-gray-200 text-gray-600 text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 transition">
              إلغاء
            </button>
          </div>
        )}
        {saveMsg && <p className={`text-xs mt-3 ${saveMsg.startsWith("✓") ? "text-green-600" : "text-red-500"}`}>{saveMsg}</p>}
      </div>

      {/* Account Security */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-row-reverse items-center gap-2 mb-4">
          <FontAwesomeIcon icon={faShield} className="text-green-700" />
          <p className="text-base font-semibold text-gray-800">أمان الحساب</p>
        </div>

        <div className="flex flex-row-reverse items-center justify-between py-3 border-b border-gray-50">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">كلمة المرور</p>
            <p className="text-xs text-gray-400 mt-0.5">{passwordChangeNotice}</p>
          </div>
          <button type="button" onClick={() => setShowPwForm(!showPwForm)}
            className="bg-green-700 hover:bg-green-600 text-white text-xs font-medium px-4 py-2 rounded-xl transition">
            تغيير كلمة المرور
          </button>
        </div>

        {showPwForm && (
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-400">كلمة المرور الحالية</label>
              <div className="relative">
                <input type={showCurrent ? "text" : "password"} value={currentPw}
                  onChange={e => setCurrentPw(e.target.value)} placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition" />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FontAwesomeIcon icon={showCurrent ? faEyeSlash : faEye} className="text-sm" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-400">كلمة المرور الجديدة</label>
              <div className="relative">
                <input type={showNew ? "text" : "password"} value={newPw}
                  onChange={e => setNewPw(e.target.value)} placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition" />
                <button type="button" onClick={() => setShowNew(!showNew)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FontAwesomeIcon icon={showNew ? faEyeSlash : faEye} className="text-sm" />
                </button>
              </div>
            </div>
            <div className="flex flex-row-reverse gap-3">
              <button type="button" onClick={handleChangePassword} disabled={pwLoading}
                className="bg-green-700 hover:bg-green-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition disabled:opacity-50">
                {pwLoading ? "جاري التغيير..." : "تأكيد التغيير"}
              </button>
              <button type="button" onClick={() => setShowPwForm(false)}
                className="border border-gray-200 text-gray-600 text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 transition">
                إلغاء
              </button>
            </div>
            {pwMsg && <p className={`text-xs ${pwMsg.startsWith("✓") ? "text-green-600" : "text-red-500"}`}>{pwMsg}</p>}
          </div>
        )}
      </div>

      {/* Notification Preferences */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-row-reverse items-center gap-2 mb-4">
          <FontAwesomeIcon icon={faBell} className="text-green-700" />
          <p className="text-base font-semibold text-gray-800">تفضيلات التنبيهات</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row-reverse items-center justify-between">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">تنبيهات البريد الإلكتروني</p>
              <p className="text-xs text-gray-400 mt-0.5">استلام تحديثات الطلبات والمعاملات الرسمية</p>
            </div>
            <Toggle on={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
          </div>
          <div className="flex flex-row-reverse items-center justify-between">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">الرسائل النصية (SMS)</p>
              <p className="text-xs text-gray-400 mt-0.5">استلام رسائل عاجلة بخصوص حالة المعاملات</p>
            </div>
            <Toggle on={smsNotif} onChange={() => setSmsNotif(!smsNotif)} />
          </div>
        </div>
      </div>

      {/* Quick action */}
      <NavLink to="/dashboard/requests"
        className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition text-sm w-full">
        <FontAwesomeIcon icon={faCheck} />
        تقديم طلب جديد
      </NavLink>

    </div>
  );
}

// ── Admin Settings ─────────────────────────────────────────────────────────────
function AdminSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [backupFreq, setBackupFreq]           = useState("يومياً");
  const [logLevel, setLogLevel]               = useState("Warning");
  const [saving, setSaving]                   = useState(false);
  const [saveMsg, setSaveMsg]                 = useState("");

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaveMsg("✓ تم حفظ إعدادات النظام");
      setTimeout(() => setSaveMsg(""), 3000);
    }, 800);
  };

  return (
    <div className="mx-auto text-right flex flex-col gap-5 p-5 max-w-2xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">إعدادات النظام</h1>
        <p className="text-sm text-gray-400 mt-0.5">إدارة تكوين النظام، الأداء وعمليات النظام لبلدية بيروت</p>
      </div>

      {/* System Config */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-row-reverse items-center justify-between mb-4">
          <div className="flex flex-row-reverse items-center gap-2">
            <FontAwesomeIcon icon={faGear} className="text-green-700" />
            <p className="text-base font-semibold text-gray-800">تكوين النظام الأساسي</p>
          </div>
          <button type="button" onClick={handleSave} disabled={saving}
            className="bg-green-700 hover:bg-green-600 text-white text-xs font-medium px-4 py-2 rounded-xl transition disabled:opacity-50">
            {saving ? "جاري الحفظ..." : "تحديث التكوين"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400">اسم الدائرة البلدية</label>
            <input type="text" defaultValue="إدارة التحول الرقمي"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400">بيئة المنصة (Environment)</label>
            <div className="flex flex-row-reverse items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-gray-700">الإنتاج (Production)</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs text-gray-400">رابط واجهة البرمجة (API Endpoint)</label>
            <input type="text" defaultValue="https://api.beirut.gov.lb/v1"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition" />
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs text-gray-400">حالة اتصال قاعدة البيانات</label>
            <div className="flex flex-row-reverse items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-700 font-medium">متصل ومستقر</span>
            </div>
          </div>
        </div>
        {saveMsg && <p className="text-xs text-green-600 mt-3">{saveMsg}</p>}
      </div>

      {/* Regional Settings */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-row-reverse items-center gap-2 mb-4">
          <FontAwesomeIcon icon={faGlobe} className="text-green-700" />
          <p className="text-base font-semibold text-gray-800">الإعدادات الإقليمية والمحلية</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400">المنطقة الإدارية المرجعية</label>
            <div className="border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 text-sm text-gray-700 text-right">
              وسط بيروت
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400">المنطقة الزمنية</label>
            <div className="border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 text-sm text-gray-700 text-right">
              GMT+3 (Beirut)
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400">تنسيق العملة</label>
            <div className="border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 text-sm text-gray-700 text-right">
              ليرة لبنانية (LBP)
            </div>
          </div>
        </div>
      </div>

      {/* System Operations */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-row-reverse items-center gap-2 mb-4">
          <FontAwesomeIcon icon={faWrench} className="text-green-700" />
          <p className="text-base font-semibold text-gray-800">عمليات النظام</p>
        </div>
        <div className="flex flex-col gap-4">

          {/* Backup */}
          <div className="flex flex-row-reverse items-center justify-between py-3 border-b border-gray-50">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">توالر النسخ الاحتياطي التلقائي</p>
              <p className="text-xs text-gray-400 mt-0.5">يتم النسخ كل ٢٤ ساعة في تمام الساعة ٣ صباحاً</p>
            </div>
            <select value={backupFreq} onChange={e => setBackupFreq(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-green-500 bg-white">
              <option>يومياً</option>
              <option>أسبوعياً</option>
              <option>شهرياً</option>
            </select>
          </div>

          {/* Log Level */}
          <div className="flex flex-row-reverse items-center justify-between py-3 border-b border-gray-50">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">مستوى تسجيل الأخطاء (Logging)</p>
              <p className="text-xs text-gray-400 mt-0.5">تحديد مدى تفصيل سجلات الأخطاء البرمجية</p>
            </div>
            <select value={logLevel} onChange={e => setLogLevel(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-green-500 bg-white">
              <option value="Error">أخطاء فقط (Error)</option>
              <option value="Warning">تحذيرات (Warning)</option>
              <option value="Info">معلومات (Info)</option>
              <option value="Debug">تصحيح (Debug)</option>
            </select>
          </div>

          {/* Maintenance Mode */}
          <div className="flex flex-row-reverse items-center justify-between py-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">وضع الصيانة (Maintenance Mode)</p>
              <p className="text-xs text-gray-400 mt-0.5">إيقاف وصول الجمهور لإجراء تحديثات طارئة</p>
            </div>
            <Toggle on={maintenanceMode} onChange={() => setMaintenanceMode(!maintenanceMode)} />
          </div>
          {maintenanceMode && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-right">
              <p className="text-xs text-orange-700 font-medium">⚠️ وضع الصيانة مفعّل — الجمهور لا يستطيع الوصول للمنصة حالياً</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

// ── Router component — goes in App.tsx as <Route path="settings" element={<Settings />} /> ──
function Settings() {
  const { user } = useAuth();
  return user?.role === "admin" ? <AdminSettings /> : <UserSettings />;
}

export default Settings;