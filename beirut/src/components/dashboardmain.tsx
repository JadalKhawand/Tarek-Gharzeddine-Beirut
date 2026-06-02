import { useEffect, useState } from "react";
import WeatherWidget from "./watherwidgit";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faMoneyBill,
  faClipboardList,
  faFileLines,
  faTriangleExclamation,
  faPhone,
  faChevronLeft,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import Footer from "./footer";
import RemindersModal from "./remindersmodal";
// ── Static mock data ──────────────────────────────────────────────────────────
const activity = [
  {
    color: "bg-green-500",
    title: "تم دفع رسوم رخصة البناء",
    sub: "رقم المعاملة: TRX-992814",
  },
  {
    color: "bg-orange-400",
    title: "تحديث حالة بلاغ: صيانة إنارة الشوارع",
    sub: "تم تحويل البلاغ إلى القسم الفني المختص",
  },
  {
    color: "bg-blue-500",
    title: "تقديم طلب جديد: إقامة سكن",
    sub: "بانتظار المراجعة الإدارية الأولية",
  },
  {
    color: "bg-red-500",
    title: "تنبيه رسوم متأخرة",
    sub: "يُرجى تسديد رسوم النظافة خلال الشهر الحال لتجنب الغرامة",
  },
];

const timeFilters = ["منذ مالفين", "يوم أمس", "آخر أسبوع", "أسبوع ماضي"];

const requests = [
  {
    title: "رخصة بناء رقم# 9822",
    sub: "تم استلام المستندات — حي الأشرفية",
    badge: "قيد المعالجة",
    badgeColor: "bg-blue-50 text-blue-700",
  },
  {
    title: "بلاغ إنارة شوارع #441",
    sub: "تم تسجيل البلاغ — شارع الحمرا",
    badge: "مسجل",
    badgeColor: "bg-gray-100 text-gray-600",
  },
];

const quickActions = [
  {
    label: "طلب مستند",
    icon: faFileLines,
    to: "/dashboard/requests",
    active: false,
  },
  {
    label: "دفع الرسوم",
    icon: faMoneyBill,
    to: "/dashboard/payments",
    active: true,
  },
  {
    label: "تقديم بلاغ جديد",
    icon: faTriangleExclamation,
    to: "/dashboard/complaints",
    active: true,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
function DashboardOverview() {
  const { user, token } = useAuth();
  const [activeFilter, setActiveFilter] = useState("منذ مالفين");
  const [reminderCount, setReminderCount] = useState(0);
  const [remindersOpen, setRemindersOpen] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  const [reminders, setReminders] = useState<
    { projectTitle: string; projectTag: string; createdAt: string }[]
  >([]);

  useEffect(() => {
  if (!token) return;

  const fetchData = () => {
    // reminders
    fetch("http://localhost:3000/reminders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReminders(data);
          setReminderCount(data.length);
        }
      })
      .catch(() => {});

    // suggestions/requests
    fetch("http://localhost:3000/suggestions/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRequestCount(data.length);
      })
      .catch(() => {});
  };

  fetchData();
  const interval = setInterval(fetchData, 20000);
  return () => clearInterval(interval);
}, [token]);
  
  // fetch reminder count for the stats card
  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:3000/reminders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setReminderCount(Array.isArray(data) ? data.length : 0))
      .catch(() => {});
  }, [token]);
  
  

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "صباحاً" : hour < 17 ? "ظهراً" : "مساءً";

  return (
    <>
      <div className="text-right flex flex-col gap-6 p-5">
        {/* ── Greeting ── */}
        <div className="flex flex-row-reverse items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              أهلاً بك يا {user?.name}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              آخر تسجيل دخول: اليوم،{" "}
              {new Date().toLocaleTimeString("ar-LB", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              {greeting}
            </p>
          </div>
          <div className="flex flex-row-reverse items-center gap-3">
            <WeatherWidget />
            <span className="bg-green-50 text-green-700 text-xs px-3 py-2 rounded-xl border border-green-100 font-medium">
              حساب مواطن ✓
            </span>
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Reminders */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
            <div className="flex flex-row-reverse items-start justify-between">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faBell} className="text-orange-500" />
              </div>
              <span className="text-3xl font-bold text-gray-900">
                {reminderCount}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-800">تنبيهات جديدة</p>
            <p className="text-xs text-gray-400">إشعارات وتحديثات النظام</p>
            <div className="flex flex-row-reverse gap-1 mt-1">
              <span className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">
                A
              </span>
              <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                B
              </span>
            </div>
          </div>

          {/* Fees */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
            <div className="flex flex-row-reverse items-start justify-between">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  className="text-green-600"
                />
              </div>
              <span className="text-3xl font-bold text-gray-900">150K</span>
            </div>
            <p className="text-sm font-medium text-gray-800">رسوم مستحقة</p>
            <p className="text-xs text-gray-400">لـ 1 إجمالي الرسوم والضرائب</p>
            <NavLink
              to="/dashboard/payments"
              className="text-xs text-green-700 hover:underline font-medium mt-1"
            >
              عرض التفاصيل ←
            </NavLink>
          </div>

          {/* Active requests */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
            <div className="flex flex-row-reverse items-start justify-between">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faClipboardList}
                  className="text-blue-500"
                />
              </div>
              <span className="text-3xl font-bold text-gray-900">{requestCount}</span>
            </div>
            <p className="text-sm font-medium text-gray-800">طلبات نشطة</p>
            <p className="text-xs text-gray-400">
              تحت المعالجة في أقسام البلدية
            </p>
          </div>
        </div>

        {/* ── Recent activity ── */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-row-reverse items-center justify-between mb-4">
            <p className="text-base font-semibold text-gray-800">
              النشاط الأخير
            </p>
            <button
              type="button"
              className="text-xs text-green-700 hover:underline"
            >
              مشاهدة الكل
            </button>
          </div>

          {/* Time filters */}
          <div className="flex flex-row-reverse gap-2 mb-4 flex-wrap">
            {timeFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition
                ${activeFilter === f ? "bg-green-700 text-white border-green-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {activity.map((a, i) => (
              <div key={i} className="flex flex-row-reverse items-start gap-3">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${a.color} mt-1.5 shrink-0`}
                />
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom 3 columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left: Notifications */}
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
              <div className="flex flex-row-reverse items-center gap-2">
                <FontAwesomeIcon icon={faBell} className="text-green-700" />
                <p className="text-sm font-semibold text-gray-800">
                  الإشعارات والتنبيهات
                </p>
              </div>
              {/* inside الإشعارات والتنبيهات card, replace the notifications.map with: */}
              {reminders.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-2">
                  لا توجد تذكيرات بعد
                </p>
              ) : (
                reminders.map((r, i) => (
                  <div
                    key={i}
                    className="flex flex-row-reverse items-start gap-2 border-b border-gray-50 pb-3 last:border-0 last:pb-0"
                  >
                    <FontAwesomeIcon
                      icon={faBell}
                      className="text-orange-500 mt-0.5 shrink-0"
                    />
                    <div className="text-right flex-1">
                      <div className="flex flex-row-reverse items-center justify-between">
                        <p className="text-sm font-medium text-gray-800">
                          {r.projectTitle}
                        </p>
                        <span className="text-xs text-gray-400">
                          {new Date(r.createdAt).toLocaleDateString("ar-LB")}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        تذكير بمشروع: {r.projectTag}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <button
                type="button"
                onClick={() => setRemindersOpen(true)}
                className="w-full text-xs text-gray-400 hover:text-green-700 transition text-center mt-1 cursor-pointer"
              >
                عرض جميع التنبيهات
              </button>
            </div>

            {/* Quick help */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-sm font-semibold text-gray-800 mb-3">
                المساعدة السريعة
              </p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="flex flex-row-reverse items-center gap-2 text-sm text-gray-600 hover:text-green-700 transition"
                >
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-green-700 w-4"
                  />
                  <span>تحدث مع المساعد الذكي</span>
                </button>
                <a
                  href="tel:01986001"
                  className="flex flex-row-reverse items-center gap-2 text-sm text-green-700 hover:underline"
                >
                  <FontAwesomeIcon icon={faPhone} className="w-4" />
                  <span>01986001</span>
                </a>
              </div>
            </div>
          </div>

          {/* Middle: Quick actions + request tracking */}
          <div className="flex flex-col gap-4">
            {/* Quick actions */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <div className="grid grid-cols-3 gap-2">
                {quickActions.map((a) => (
                  <NavLink
                    key={a.to}
                    to={a.to}
                    className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl transition text-center
                    ${a.active ? "bg-gray-50 text-gray-600 hover:bg-gray-100" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
                  >
                    <FontAwesomeIcon icon={a.icon} className="text-lg" />
                    <span className="text-xs font-medium leading-tight">
                      {a.label}
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Request tracking */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
              <div className="flex flex-row-reverse items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">
                  متابعة الطلبات
                </p>
                <button
                  type="button"
                  className="text-xs text-green-700 hover:underline flex items-center gap-1 flex-row-reverse cursor-pointer"
                >
                  عرض الكل{" "}
                  <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                </button>
              </div>
              {requests.map((r, i) => (
                <div
                  key={i}
                  className="border border-gray-100 rounded-xl p-3 flex flex-col gap-1.5"
                >
                  <div className="flex flex-row-reverse items-center justify-between">
                    <p className="text-sm font-medium text-gray-800">
                      {r.title}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${r.badgeColor}`}
                    >
                      {r.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{r.sub}</p>
                  <div className="w-full bg-gray-100 rounded-full h-1 mt-1">
                    <div
                      className="bg-green-600 h-1 rounded-full"
                      style={{ width: i === 0 ? "60%" : "20%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Community */}
          <div className="flex flex-col gap-4">
            {/* Community discussions */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-row-reverse items-center gap-2 mb-3">
                <FontAwesomeIcon icon={faUsers} className="text-green-700" />
                <p className="text-sm font-semibold text-gray-800">
                  مناقشات الحي
                </p>
              </div>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                تواصل مع جيرانك في الحي للتحاور حول اقتراحات البلدية
              </p>
              <div className="flex flex-row-reverse items-center justify-between mb-3">
                <div className="flex flex-row-reverse -space-x-2 space-x-reverse">
                  {["#16a34a", "#3b82f6", "#f97316"].map((c, i) => (
                    <div
                      key={i}
                      style={{ background: c }}
                      className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    >
                      {["م", "أ", "ر"][i]}
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="w-full bg-green-700 hover:bg-green-600 text-white text-sm font-medium py-2.5 rounded-xl transition"
              >
                انضم للمناقشة
              </button>
            </div>

            {/* Poll */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-sm font-semibold text-gray-800 mb-2">
                شارك برأيك
              </p>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                ما هو رأيك في خطة توسعة مساحة المشي في منطقة وسط المدينة؟
              </p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="w-full text-sm text-right px-4 py-2.5 rounded-xl border border-green-200 text-green-700 hover:bg-green-50 transition"
                >
                  أوافق بشدة
                </button>
                <button
                  type="button"
                  className="w-full text-sm text-right px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
                >
                  أوافق مع بعض التعديلات
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RemindersModal
        open={remindersOpen}
        onClose={() => setRemindersOpen(false)}
        onDeleted={() => setReminderCount((c) => c - 1)}
      />
      <Footer />
    </>
  );
}

export default DashboardOverview;
