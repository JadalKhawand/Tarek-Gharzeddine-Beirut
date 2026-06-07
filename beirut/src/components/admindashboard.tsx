import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faMoneyBill,
  faClipboardList,
  faBriefcase,
  faLock,
  faPen,
  faArrowTrendUp,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useLocked } from "../hooks/useLocked";

const COLORS = ["#15803d", "#86efac", "#dcfce7", "#166534"];

const statusLabel: Record<string, { label: string; color: string }> = {
  pending: { label: "قيد التنفيذ", color: "bg-blue-50 text-blue-600" },
  in_progress: { label: "قيد التنفيذ", color: "bg-blue-50 text-blue-600" },
  reviewed: { label: "قيد التنفيذ", color: "bg-blue-50 text-blue-600" },
  resolved: { label: "مكتمل", color: "bg-green-50 text-green-700" },
  completed: { label: "مكتمل", color: "bg-green-50 text-green-700" },
  approved: { label: "مكتمل", color: "bg-green-50 text-green-700" },
  failed: { label: "فشل", color: "bg-red-50 text-red-600" },
  locked: { label: "مقفول", color: "bg-gray-100 text-gray-500" },
  rejected: { label: "مرفوض", color: "bg-red-50 text-red-600" },
};

const dayNames = ["أحد", "اثن", "ثلاث", "أربع", "خميس", "جمعة", "سبت"];

function StatCard({
  icon,
  iconBg,
  iconColor,
  value,
  label,
  sub,
  trend,
}: {
  icon: any;
  iconBg: string;
  iconColor: string;
  value: string | number;
  label: string;
  sub: string;
  trend?: number;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
      <div className="flex flex-row-reverse items-start justify-between">
        <div
          className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}
        >
          <FontAwesomeIcon icon={icon} className={`${iconColor} text-sm`} />
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          {trend !== undefined && (
            <span
              className={`text-xs font-medium mr-2 ${trend >= 0 ? "text-green-600" : "text-red-500"}`}
            >
              <FontAwesomeIcon
                icon={trend >= 0 ? faArrowTrendUp : faArrowTrendDown}
                className="text-xs ml-1"
              />
              {Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>
      <p className="text-sm font-medium text-gray-800">{label}</p>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
  );
}

function AdminDashboard() {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [editStatus, setEditStatus] = useState("");
  const [lockedTransactions, setLockedTransactions] = useState<
    Record<string, boolean>
  >({});
  const { isLocked: isLockedComplaint, lock: lockComplaint } =
    useLocked("lockedComplaints");
  const { isLocked: isLockedSuggestion, lock: lockSuggestion } =
    useLocked("lockedSuggestions");
  const { isLocked: isLockedPayment, lock: lockPayment } =
    useLocked("lockedPayments");

  useEffect(() => {
    const raw = localStorage.getItem("lockedTransactions");
    if (raw) {
      try {
        setLockedTransactions(JSON.parse(raw));
      } catch {
        setLockedTransactions({});
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "lockedTransactions",
      JSON.stringify(lockedTransactions),
    );
  }, [lockedTransactions]);

  useEffect(() => {
    if (!token) return;
    Promise.all([
      fetch("http://localhost:3000/complaints", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .catch((err) => {
          console.error("Failed to fetch complaints:", err);
          return [];
        }),
      fetch("http://localhost:3000/payments/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .catch((err) => {
          console.error("Failed to fetch payments:", err);
          return [];
        }),
      fetch("http://localhost:3000/suggestions", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .catch((err) => {
          console.error("Failed to fetch suggestions:", err);
          return [];
        }),
    ])
      .then(([c, p, s]) => {
        if (Array.isArray(c)) setComplaints(c);
        if (Array.isArray(p)) setPayments(p);
        if (Array.isArray(s)) setSuggestions(s);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard data:", err);
      })
      .finally(() => setLoading(false));
  }, [token]);

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalPayments = payments.reduce((sum, p) => {
    const amount =
      typeof p.amount === "number"
        ? p.amount
        : parseInt(p.amount?.replace(/[^0-9]/g, "") || "0");
    return sum + amount;
  }, 0);
  const activeComplaints = complaints.filter((c) =>
    ["pending", "in_progress"].includes(c.status),
  ).length;
  const activeRequests = complaints.length + suggestions.length;

  // ── Pie chart: payment distribution by fee type ────────────────────────────
  const feeGroups: Record<string, number> = {};
  payments.forEach((p) => {
    feeGroups[p.feeType] = (feeGroups[p.feeType] || 0) + 1;
  });
  const pieData = Object.entries(feeGroups).map(([name, value]) => ({
    name,
    value,
  }));

  // ── Bar chart: activity per day of week ────────────────────────────────────
  const dayCount: Record<number, number> = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };
  [...complaints, ...payments, ...suggestions].forEach((item) => {
    const day = new Date(item.createdAt).getDay();
    dayCount[day]++;
  });
  const barData = Object.entries(dayCount).map(([day, count]) => ({
    name: dayNames[parseInt(day)],
    count,
  }));

  // ── Transactions table: merge all ─────────────────────────────────────────
  const allTransactions = [
    ...complaints.map((c) => ({
      id: c._id.slice(-5).toUpperCase(),
      rawId: c._id,
      type: "complaint",
      fullId: `#BR-${c._id.slice(-5).toUpperCase()}`,
      citizen: c.user?.name || "—",
      service: `بلاغ: ${c.category}`,
      date: new Date(c.createdAt).toLocaleDateString("ar-LB"),
      status: isLockedComplaint(c._id) ? "locked" : c.status,
      createdAt: c.createdAt,
    })),
    ...payments.map((p) => ({
      id: p._id || p._id.slice(-5).toUpperCase(),
      rawId: p._id || p._id,
      type: "payment",
      fullId: `#${p._id || p._id.slice(-5)}`,
      citizen: p.user?.name || p.billingName || "—",
      service: p.feeType,
      date: new Date(p.createdAt).toLocaleDateString("ar-LB"),
      status: isLockedPayment(p._id) ? "locked" : p.status,
      createdAt: p.createdAt,
    })),
    ...suggestions.map((s) => ({
      id: s._id.slice(-5).toUpperCase(),
      rawId: s._id,
      type: "suggestion",
      fullId: `#BR-${s._id.slice(-5).toUpperCase()}`,
      citizen: s.user?.name || "—",
      service: `مقترح: ${s.title}`,
      date: new Date(s.createdAt).toLocaleDateString("ar-LB"),
      status: isLockedSuggestion(s._id) ? "locked" : s.status,
      createdAt: s.createdAt,
    })),
  ]
    .sort((a, b) => {
      const aLocked = a.status === "failed" || a.status === "locked";
      const bLocked = b.status === "failed" || b.status === "locked";
      if (aLocked !== bLocked) return aLocked ? 1 : -1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 8);

  const lockTransaction = (rawId: string, type: string) => {
    if (type === "complaint") lockComplaint(rawId);
    if (type === "suggestion") lockSuggestion(rawId);
    if (type === "payment") lockPayment(rawId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-green-700 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  const handleEditTransaction = (transaction: any) => {
    setEditingTransaction(transaction);
    setEditStatus(transaction.status);
  };

  const handleSaveEdit = async () => {
    if (!editingTransaction || !token) return;

    try {
      const id =
        editingTransaction.rawId ||
        editingTransaction.id ||
        editingTransaction.fullId;
      let endpoint = "";
      let body: any = {};

      if (editingTransaction.type === "complaint") {
        endpoint = `http://localhost:3000/complaints/${id}/status`;
        body = { status: editStatus };
      } else if (editingTransaction.type === "suggestion") {
        endpoint = `http://localhost:3000/suggestions/${id}/status`;
        body = { status: editStatus };
      } else if (editingTransaction.type === "payment") {
        // If backend supports updating payment status, adjust endpoint accordingly.
        endpoint = `http://localhost:3000/payments/${id}/status`;
        body = { status: editStatus };
      }

      if (!endpoint) {
        console.warn(
          "No endpoint for transaction type:",
          editingTransaction.type,
        );
        return;
      }

      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setEditingTransaction(null);
        window.location.reload();
      } else {
        const txt = await response.text();
        console.error("Failed to update transaction", response.status, txt);
      }
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };

  return (
    <div dir="rtl" className="text-right flex flex-col gap-6 p-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          نظرة عامة على الإحصائيات
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          متابعة الأداء اليومي لخدمات بلدية بيروت
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={faClipboardList}
          iconBg="bg-blue-50"
          iconColor="text-blue-500"
          value={activeRequests.toLocaleString("ar-LB")}
          label="الطلبات النشطة"
          sub="بلاغات ومقترحات"
          trend={40}
        />
        <StatCard
          icon={faBriefcase}
          iconBg="bg-purple-50"
          iconColor="text-purple-500"
          value={suggestions.filter((s) => s.status === "pending").length}
          label="المشاريع الإدارية"
          sub="مقترحات قيد المراجعة"
          trend={3}
        />
        <StatCard
          icon={faMoneyBill}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          value={
            totalPayments >= 1000
              ? Math.round(totalPayments / 1000) + "K ل.ل"
              : totalPayments + " ل.ل"
          }
          label="إجمالي المدفوعات"
          sub="مجموع جميع المدفوعات"
          trend={24}
        />
        <StatCard
          icon={faTriangleExclamation}
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
          value={activeComplaints}
          label="البلاغات النشطة"
          sub="قيد التنفيذ أو المعالجة"
          trend={2}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie chart */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-800 mb-4">
            توزيع المدفوعات
          </p>
          {pieData.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-10">
              لا توجد بيانات بعد
            </p>
          ) : (
            <div className="flex flex-row-reverse items-center gap-4">
              <PieChart width={160} height={160}>
                <Pie
                  data={pieData}
                  cx={75}
                  cy={75}
                  innerRadius={50}
                  outerRadius={75}
                  dataKey="value"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any, n: any) => [v, n]} />
              </PieChart>
              <div className="flex flex-col gap-2 flex-1">
                {pieData.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-row-reverse items-center gap-2 text-xs"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: COLORS[i % COLORS.length] }}
                    />
                    <span className="text-gray-600 truncate">{item.name}</span>
                    <span className="text-gray-400 mr-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bar chart */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-row-reverse items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-800">
              اتجاهات استخدام الخدمات
            </p>
            <span className="text-xs text-gray-400 border border-gray-200 rounded-lg px-2 py-1">
              آخر 7 أيام
            </span>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={barData} barSize={24}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip cursor={{ fill: "#f0fdf4" }} />
              <Bar
                dataKey="count"
                fill="#15803d"
                radius={[4, 4, 0, 0]}
                name="النشاط"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-row-reverse items-center justify-between px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-800">أحدث المعاملات</p>
          <button
            type="button"
            className="text-xs text-green-700 hover:underline"
          >
            عرض الكل
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50">
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-400">
                  رقم المعاملة
                </th>
                <th className="text-right px-3 py-3 text-xs font-medium text-gray-400">
                  اسم المواطن
                </th>
                <th className="text-right px-3 py-3 text-xs font-medium text-gray-400">
                  نوع الخدمة
                </th>
                <th className="text-right px-3 py-3 text-xs font-medium text-gray-400">
                  التاريخ
                </th>
                <th className="text-right px-3 py-3 text-xs font-medium text-gray-400">
                  الحالة
                </th>
                <th className="text-center px-5 py-3 text-xs font-medium text-gray-400">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {allTransactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-sm text-gray-400"
                  >
                    لا توجد معاملات بعد
                  </td>
                </tr>
              ) : (
                allTransactions.map((t) => {
                  const s = statusLabel[t.status] || {
                    label: t.status,
                    color: "bg-gray-100 text-gray-500",
                  };
                  const isLocked =
                    t.status === "failed" || t.status === "locked";
                  return (
                    <tr
                      key={t.rawId}
                      className={`border-b border-gray-50 ${isLocked ? "opacity-60 grayscale" : "hover:bg-gray-50/50"} transition`}
                    >
                      <td className="px-5 py-3 text-xs text-gray-400 whitespace-nowrap font-mono">
                        {t.fullId}
                      </td>
                      <td className="px-3 py-3 text-gray-800 font-medium whitespace-nowrap">
                        {t.citizen}
                      </td>
                      <td className="px-3 py-3 text-gray-600 max-w-40 truncate">
                        {t.service}
                      </td>
                      <td className="px-3 py-3 text-gray-400 whitespace-nowrap text-xs">
                        {t.date}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${s.color}`}
                        >
                          {s.label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              !isLocked && handleEditTransaction(t)
                            }
                            disabled={isLocked}
                            className={`w-7 h-7 rounded-lg ${isLocked ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50 hover:bg-gray-100"} flex items-center justify-center transition`}
                          >
                            <FontAwesomeIcon
                              icon={faPen}
                              className="text-gray-400 text-xs"
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => lockTransaction(t.rawId, t.type)}
                            disabled={isLocked}
                            title={isLocked ? "مقفول" : "قفل هذا العنصر"}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center border transition
    ${
      isLocked
        ? "bg-gray-200 border-gray-300 cursor-not-allowed"
        : "bg-gray-50 border-gray-200 hover:bg-red-50 hover:border-red-200 cursor-pointer"
    }`}
                          >
                            <FontAwesomeIcon
                              icon={faLock}
                              className={`text-xs transition ${isLocked ? "text-gray-500" : "text-gray-400 hover:text-red-500"}`}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingTransaction && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
            {(() => {
              const editingRawId =
                editingTransaction?.rawId ||
                editingTransaction?.id ||
                editingTransaction?.fullId;
              const modalIsLocked = !!(
                editingRawId && lockedTransactions[editingRawId]
              );
              return modalIsLocked ? (
                <p className="text-sm text-red-600 mb-3 text-right">
                  هذه المعاملة مقفولة ولا يمكن تعديلها.
                </p>
              ) : null;
            })()}
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-right">
              تعديل الحالة
            </h2>

            <div className="space-y-4 mb-6">
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-2">رقم المعاملة</p>
                <p className="font-mono text-gray-800">
                  {editingTransaction.fullId}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600 mb-2">نوع الخدمة</p>
                <p className="text-gray-800">{editingTransaction.service}</p>
              </div>

              <div className="text-right">
                <label className="text-sm text-gray-600 block mb-2">
                  تغيير الحالة
                </label>
                {editingTransaction?.type === "payment" ? (
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    disabled={(() => {
                      const editingRawId =
                        editingTransaction?.rawId ||
                        editingTransaction?.id ||
                        editingTransaction?.fullId;
                      return !!(
                        editingRawId && lockedTransactions[editingRawId]
                      );
                    })()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-green-600 disabled:cursor-not-allowed disabled:bg-gray-100"
                  >
                    <option value="pending">قيد المراجعة</option>
                    <option value="completed">مكتمل</option>
                    <option value="failed">فشل</option>
                  </select>
                ) : editingTransaction?.type === "complaint" ? (
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    disabled={(() => {
                      const editingRawId =
                        editingTransaction?.rawId ||
                        editingTransaction?.id ||
                        editingTransaction?.fullId;
                      return !!(
                        editingRawId && lockedTransactions[editingRawId]
                      );
                    })()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-green-600 disabled:cursor-not-allowed disabled:bg-gray-100"
                  >
                    <option value="pending">قيد المراجعة</option>
                    <option value="in_progress">قيد التنفيذ</option>
                    <option value="resolved">تم الحل</option>
                  </select>
                ) : (
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    disabled={(() => {
                      const editingRawId =
                        editingTransaction?.rawId ||
                        editingTransaction?.id ||
                        editingTransaction?.fullId;
                      return !!(
                        editingRawId && lockedTransactions[editingRawId]
                      );
                    })()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-green-600 disabled:cursor-not-allowed disabled:bg-gray-100"
                  >
                    <option value="pending">قيد المراجعة</option>
                    <option value="reviewed">قيد التنفيذ</option>
                    <option value="approved">مكتمل</option>
                    <option value="rejected">مرفوض</option>
                  </select>
                )}
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setEditingTransaction(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={(() => {
                  const editingRawId =
                    editingTransaction?.rawId ||
                    editingTransaction?.id ||
                    editingTransaction?.fullId;
                  return !!(editingRawId && lockedTransactions[editingRawId]);
                })()}
                className={`px-4 py-2 rounded-lg text-white transition ${(() => {
                  const editingRawId =
                    editingTransaction?.rawId ||
                    editingTransaction?.id ||
                    editingTransaction?.fullId;
                  return !!(editingRawId && lockedTransactions[editingRawId])
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700";
                })()}`}
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
