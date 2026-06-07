import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faSpinner,
  faXmark,
  faLock,
  faChevronDown,
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

interface Payment {
  _id: string;
  transactionId: string;
  feeType: string;
  amount: string;
  billingName: string;
  billingEmail: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  user: { name: string; email: string };
}

const statusOptions = [
  {
    value: "pending",
    label: "قيد الانتظار",
    color: "bg-orange-50 text-orange-600 border-orange-200",
  },
  {
    value: "completed",
    label: "مكتمل",
    color: "bg-green-50 text-green-700 border-green-200",
  },
  {
    value: "failed",
    label: "فشل",
    color: "bg-red-50 text-red-600 border-red-200",
  },
];

const statusBadgeOptions = [
  ...statusOptions,
  {
    value: "locked",
    label: "مقفول",
    color: "bg-gray-100 text-gray-500 border-gray-200",
  },
];

const COLORS = ["#15803d", "#f97316", "#dc2626"];

function AdminPayments() {
  const { token } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selected, setSelected] = useState<Payment | null>(null);
  const { locked, isLocked, lock } = useLocked("lockedPayments");

  useEffect(() => {
    localStorage.setItem("lockedPayments", JSON.stringify(locked));
  }, [locked]);

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:3000/payments/all", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPayments(data);
        else setError("فشل تحميل البيانات");
      })
      .catch(() => setError("فشل الاتصال بالخادم"))
      .finally(() => setLoading(false));
  }, [token]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`http://localhost:3000/payments/${id}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setPayments((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status } : p)),
        );
        if (selected?._id === id)
          setSelected((prev) => (prev ? { ...prev, status } : null));
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered =
    selectedFilter === "all"
      ? payments
      : payments.filter(
          (p) => (isLocked(p._id) ? "locked" : p.status) === selectedFilter,
        );

  const sorted = [...filtered].sort((a, b) => {
    const aLocked = isLocked(a._id) ? 1 : 0;
    const bLocked = isLocked(b._id) ? 1 : 0;
    return aLocked - bLocked;
  });

  const counts = {
    all: payments.length,
    pending: payments.filter((p) => p.status === "pending" && !isLocked(p._id))
      .length,
    completed: payments.filter(
      (p) => p.status === "completed" && !isLocked(p._id),
    ).length,
    failed: payments.filter((p) => p.status === "failed" && !isLocked(p._id))
      .length,
    locked: payments.filter((p) => isLocked(p._id)).length,
  };

  const totalCompleted = payments
    .filter((p) => p.status === "completed" && !isLocked(p._id))
    .reduce((sum, p) => {
      const amount =
        typeof p.amount === "number"
          ? p.amount
          : parseInt(p.amount?.replace(/[^0-9]/g, "") || "0");
      return sum + amount;
    }, 0);

  const getStatusStyle = (status: string) =>
    statusBadgeOptions.find((s) => s.value === status)?.color ||
    "bg-gray-100 text-gray-500 border-gray-200";
  const getStatusLabel = (status: string) =>
    statusBadgeOptions.find((s) => s.value === status)?.label || status;

  // Pie chart: status distribution
  const statusPieData = [
    { name: "مكتمل", value: counts.completed },
    { name: "قيد الانتظار", value: counts.pending },
    { name: "فشل", value: counts.failed },
  ].filter((d) => d.value > 0);

  // Bar chart: distribution by fee type
  const feeTypeGroups: Record<string, number> = {};
  payments.forEach((p) => {
    feeTypeGroups[p.feeType] = (feeTypeGroups[p.feeType] || 0) + 1;
  });
  const feeTypeData = Object.entries(feeTypeGroups)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 gap-2">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl" />
        <span className="text-sm">جاري التحميل...</span>
      </div>
    );
  }
  if (error)
    return <p className="text-center py-20 text-red-500 text-sm">{error}</p>;

  return (
    <div className="text-right flex flex-col gap-6 p-5">
      {/* Header */}
      <div className="flex flex-row-reverse items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة المدفوعات</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            متابعة جميع المدفوعات والفواتير
          </p>
        </div>

        {/* Stats pills */}
        <div className="flex flex-row-reverse gap-3 flex-wrap">
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 flex flex-col items-center shadow-sm min-w-20">
            <span className="text-2xl font-bold text-gray-900">
              {counts.completed}
            </span>
            <span className="text-xs text-green-600">مكتمل</span>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 flex flex-col items-center shadow-sm min-w-20">
            <span className="text-2xl font-bold text-gray-900">
              {counts.pending}
            </span>
            <span className="text-xs text-orange-500">قيد الانتظار</span>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 flex flex-col items-center shadow-sm min-w-20">
            <span className="text-2xl font-bold text-gray-900">
              {counts.failed}
            </span>
            <span className="text-xs text-red-600">فشل</span>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 flex flex-col items-center shadow-sm min-w-20">
            <span className="text-2xl font-bold text-gray-900">
              {counts.locked}
            </span>
            <span className="text-xs text-gray-500">مقفول</span>
          </div>
          <div className="bg-green-800 rounded-2xl px-4 py-3 flex flex-col items-center shadow-sm min-w-20">
            <span className="text-2xl font-bold text-white">
              {totalCompleted.toLocaleString("ar-LB")} ل.ل
            </span>
            <span className="text-xs text-green-300">إجمالي المكتمل</span>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-row-reverse gap-2 flex-wrap">
        {[
          { value: "all", label: "الكل", count: counts.all },
          { value: "completed", label: "مكتمل", count: counts.completed },
          { value: "pending", label: "قيد الانتظار", count: counts.pending },
          { value: "failed", label: "فشل", count: counts.failed },
          { value: "locked", label: "مقفول", count: counts.locked },
        ].map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setSelectedFilter(f.value)}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-xl border transition
              ${
                selectedFilter === f.value
                  ? "bg-green-700 text-white border-green-700"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
          >
            <span>{f.label}</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${selectedFilter === f.value ? "bg-green-600" : "bg-gray-100 text-gray-500"}`}
            >
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie chart: status distribution */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-800 mb-4">
            توزيع حالات الدفع
          </p>
          {statusPieData.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-10">
              لا توجد بيانات بعد
            </p>
          ) : (
            <div className="flex flex-row-reverse items-center gap-4">
              <PieChart width={160} height={160}>
                <Pie
                  data={statusPieData}
                  cx={75}
                  cy={75}
                  innerRadius={50}
                  outerRadius={75}
                  dataKey="value"
                >
                  {statusPieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any) => v} />
              </PieChart>
              <div className="flex flex-col gap-2 flex-1">
                {statusPieData.map((item, i) => (
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

        {/* Bar chart: distribution by fee type */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-row-reverse items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-800">
              توزيع أنواع الرسوم
            </p>
            <span className="text-xs text-gray-400 border border-gray-200 rounded-lg px-2 py-1">
              أعلى 8 أنواع
            </span>
          </div>
          {feeTypeData.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-10">
              لا توجد بيانات بعد
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={feeTypeData} barSize={24}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip cursor={{ fill: "#f0fdf4" }} />
                <Bar
                  dataKey="value"
                  fill="#15803d"
                  radius={[4, 4, 0, 0]}
                  name="العدد"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Payments table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-row-reverse items-center justify-between px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-800">قائمة المدفوعات</p>
          <span className="text-xs text-gray-400">{filtered.length} دفعة</span>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-300">
            <FontAwesomeIcon icon={faMoneyBill} className="text-5xl" />
            <p className="text-sm text-gray-400">
              لا توجد مدفوعات في هذه الفئة
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table dir="rtl" className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  <th className="text-right px-5 py-3 text-xs font-medium text-gray-400">
                    معرّف المعاملة
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-medium text-gray-400">
                    اسم الدافع
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-medium text-gray-400">
                    نوع الرسم
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-medium text-gray-400">
                    المبلغ
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
                {sorted.map((p) => {
                  const locked = isLocked(p._id);
                  const displayStatus = locked ? "locked" : p.status;
                  return (
                    <tr
                      key={p._id}
                      className={`border-b border-gray-50 ${locked ? "opacity-60 grayscale" : "hover:bg-gray-50/50"} transition`}
                    >
                      <td className="px-5 py-3 text-xs text-gray-400 whitespace-nowrap font-mono">
                        {p.transactionId}
                      </td>
                      <td className="px-3 py-3 text-gray-800 font-medium whitespace-nowrap">
                        {p.billingName || p.user?.name || "—"}
                      </td>
                      <td className="px-3 py-3 text-gray-600 max-w-40 truncate">
                        {p.feeType}
                      </td>
                      <td className="px-3 py-3 text-gray-800 font-medium">
                        {p.amount} ل.ل
                      </td>
                      <td className="px-3 py-3 text-gray-400 whitespace-nowrap text-xs">
                        {new Date(p.createdAt).toLocaleDateString("ar-LB")}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${getStatusStyle(displayStatus)}`}
                        >
                          {getStatusLabel(displayStatus)}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                                      <button
                            type="button"
                            onClick={() => lock(p._id)}
                            disabled={locked}
                            title={locked ? "مقفول" : "قفل هذا العنصر"}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center border transition
    ${
      locked
        ? "bg-gray-200 border-gray-300 cursor-not-allowed"
        : "bg-gray-50 border-gray-200 hover:bg-red-50 hover:border-red-200 cursor-pointer"
    }`}
                          >
                            <FontAwesomeIcon
                              icon={faLock}
                              className={`text-xs transition ${locked ? "text-gray-500" : "text-gray-400 hover:text-red-500"}`}
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelected(p)}
                            className="flex items-center gap-1 text-xs text-green-700 hover:underline"
                          >
                            <FontAwesomeIcon
                              icon={faChevronDown}
                              className="text-xs"
                            />
                            التفاصيل
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div
            dir="rtl"
            className="bg-white rounded-2xl border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex flex-row-reverse items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white">
              <p className="text-base font-semibold text-gray-800">
                {selected.transactionId}
              </p>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition"
              >
                <FontAwesomeIcon icon={faXmark} className="text-sm" />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">معرّف المعاملة</p>
                  <p className="text-sm font-mono text-gray-800">
                    {selected.transactionId}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">الحالة</p>
                  <p className="text-sm font-medium">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(isLocked(selected._id) ? "locked" : selected.status)}`}
                    >
                      {getStatusLabel(
                        isLocked(selected._id) ? "locked" : selected.status,
                      )}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">الدافع</p>
                  <p className="text-sm font-medium text-gray-800">
                    {selected.billingName || selected.user?.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {selected.billingEmail || selected.user?.email}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">نوع الرسم</p>
                  <p className="text-sm font-medium text-gray-800">
                    {selected.feeType}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">المبلغ</p>
                  <p className="text-lg font-bold text-green-600">
                    {selected.amount} ل.ل
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">طريقة الدفع</p>
                  <p className="text-sm font-medium text-gray-800">
                    {selected.paymentMethod}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">تاريخ المعاملة</p>
                <p className="text-sm text-gray-700">
                  {new Date(selected.createdAt).toLocaleDateString("ar-LB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-2">تغيير الحالة</p>
                <div className="flex flex-row-reverse gap-2">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      disabled={
                        selected.status === opt.value ||
                        updatingId === selected._id ||
                        isLocked(selected._id)
                      }
                      onClick={() => updateStatus(selected._id, opt.value)}
                      className={`flex-1 text-xs py-2.5 rounded-xl border transition
                        ${
                          selected.status === opt.value
                            ? `${opt.color} font-medium`
                            : "border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                    >
                      {updatingId === selected._id &&
                      selected.status !== opt.value ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="animate-spin text-xs"
                        />
                      ) : (
                        opt.label
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPayments;
