import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faLeaf,
  faRoad,
  faMicrochip,
  faHandshake,
  faChevronDown,
  faSpinner,
  faXmark,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import { useLocked } from "../hooks/useLocked";

interface Suggestion {
  _id: string;
  title: string;
  neighborhood: string;
  category: string;
  description: string;
  impact: string;
  status: string;
  createdAt: string;
  user: { name: string; email: string };
}

const statusOptions = [
  {
    value: "pending",
    label: "قيد المراجعة",
    color: "bg-orange-50 text-orange-600 border-orange-200",
  },
  {
    value: "reviewed",
    label: "تمت المراجعة",
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    value: "approved",
    label: "مقبول",
    color: "bg-green-50 text-green-700 border-green-200",
  },
  {
    value: "rejected",
    label: "مرفوض",
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

const categoryIcons: Record<string, any> = {
  "مساحات خضراء": faLeaf,
  "بنية تحتية": faRoad,
  تكنولوجيا: faMicrochip,
  "خدمات اجتماعية": faHandshake,
};

function AdminRequests() {
  const { token } = useAuth();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const { locked, isLocked, lock } = useLocked("lockedSuggestions");

  useEffect(() => {
    localStorage.setItem("lockedSuggestions", JSON.stringify(locked));
  }, [locked]);

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:3000/suggestions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setSuggestions(data);
        else setError("فشل تحميل البيانات");
      })
      .catch(() => setError("فشل الاتصال بالخادم"))
      .finally(() => setLoading(false));
  }, [token]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(
        `http://localhost:3000/suggestions/${id}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        },
      );
      if (res.ok) {
        setSuggestions((prev) =>
          prev.map((s) => (s._id === id ? { ...s, status } : s)),
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
      ? suggestions
      : suggestions.filter(
          (s) => (isLocked(s._id) ? "locked" : s.status) === selectedFilter,
        );

  const sorted = [...filtered].sort((a, b) => {
    const aLocked = isLocked(a._id) ? 1 : 0;
    const bLocked = isLocked(b._id) ? 1 : 0;
    return aLocked - bLocked;
  });
  const counts = {
    all: suggestions.length,
    pending: suggestions.filter(
      (s) => s.status === "pending" && !isLocked(s._id),
    ).length,
    reviewed: suggestions.filter(
      (s) => s.status === "reviewed" && !isLocked(s._id),
    ).length,
    approved: suggestions.filter(
      (s) => s.status === "approved" && !isLocked(s._id),
    ).length,
    rejected: suggestions.filter(
      (s) => s.status === "rejected" && !isLocked(s._id),
    ).length,
    locked: suggestions.filter((s) => isLocked(s._id)).length,
  };

  const getStatusStyle = (status: string) =>
    statusBadgeOptions.find((s) => s.value === status)?.color ||
    "bg-gray-100 text-gray-500 border-gray-200";
  const getStatusLabel = (status: string) =>
    statusBadgeOptions.find((s) => s.value === status)?.label || status;
  return (
    <div className="text-right flex flex-col gap-6 p-5">
      {/* Header */}
      <div className="flex flex-row-reverse items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة المقترحات</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            مراجعة مقترحات المواطنين واتخاذ القرار
          </p>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 flex flex-col items-center shadow-sm min-w-16">
            <span className="text-2xl font-bold text-gray-900">
              {counts.pending}
            </span>
            <span className="text-xs text-orange-500">قيد المراجعة</span>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 flex flex-col items-center shadow-sm min-w-16">
            <span className="text-2xl font-bold text-gray-900">
              {counts.approved}
            </span>
            <span className="text-xs text-green-600">مقبول</span>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 flex flex-col items-center shadow-sm min-w-16">
            <span className="text-2xl font-bold text-gray-900">
              {counts.all}
            </span>
            <span className="text-xs text-gray-400">الإجمالي</span>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-row-reverse gap-2 flex-wrap">
        {[
          { value: "all", label: "الكل", count: counts.all },
          { value: "pending", label: "قيد المراجعة", count: counts.pending },
          { value: "reviewed", label: "تمت المراجعة", count: counts.reviewed },
          { value: "approved", label: "مقبول", count: counts.approved },
          { value: "rejected", label: "مرفوض", count: counts.rejected },
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

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          <span className="text-sm">جاري التحميل...</span>
        </div>
      ) : error ? (
        <p className="text-center text-sm text-red-500 py-12">{error}</p>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <FontAwesomeIcon
            icon={faClipboardList}
            className="text-4xl text-gray-200"
          />
          <p className="text-sm text-gray-400">لا توجد مقترحات في هذه الفئة</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sorted.map((s) => (
            <div
              key={s._id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3"
            >
              {/* Top row */}
              <div className="flex flex-row-reverse items-start justify-between gap-3">
                <div className="flex flex-row-reverse items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                    <FontAwesomeIcon
                      icon={categoryIcons[s.category] || faClipboardList}
                      className="text-green-700 text-sm"
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">
                      {s.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {s.user?.name} — {s.neighborhood} —{" "}
                      {new Date(s.createdAt).toLocaleDateString("ar-LB")}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full border shrink-0 ${getStatusStyle(isLocked(s._id) ? "locked" : s.status)}`}
                >
                  {getStatusLabel(isLocked(s._id) ? "locked" : s.status)}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {s.description}
              </p>

              {/* Bottom row */}
              <div className="flex flex-row-reverse items-center justify-between gap-3">
                <div className="flex flex-row-reverse gap-2">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      disabled={
                        s.status === opt.value ||
                        updatingId === s._id ||
                        isLocked(s._id)
                      }
                      onClick={() => updateStatus(s._id, opt.value)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition
                        ${
                          s.status === opt.value
                            ? `${opt.color} font-medium cursor-default`
                            : "border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer"
                        }`}
                    >
                      {updatingId === s._id && s.status !== opt.value ? (
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
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => lock(s._id)}
                    disabled={isLocked(s._id)}
                    title={isLocked(s._id) ? "مقفول" : "قفل هذا العنصر"}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center border transition
    ${
      isLocked(s._id)
        ? "bg-gray-200 border-gray-300 cursor-not-allowed"
        : "bg-gray-50 border-gray-200 hover:bg-red-50 hover:border-red-200 cursor-pointer"
    }`}
                  >
                    <FontAwesomeIcon
                      icon={faLock}
                      className={`text-xs transition ${isLocked(s._id) ? "text-gray-500" : "text-gray-400 hover:text-red-500"}`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelected(s)}
                    className="flex items-center gap-1.5 text-xs text-green-700 hover:underline"
                  >
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex flex-row-reverse items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white">
              <p className="text-base font-semibold text-gray-800">
                {selected.title}
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
                  <p className="text-xs text-gray-400 mb-1">مقدم الطلب</p>
                  <p className="text-sm font-medium text-gray-800">
                    {selected.user?.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {selected.user?.email}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">الموقع</p>
                  <p className="text-sm font-medium text-gray-800">
                    {selected.neighborhood}
                  </p>
                  <p className="text-xs text-gray-400">{selected.category}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">وصف المقترح</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selected.description}
                </p>
              </div>
              {selected.impact && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">الأثر المتوقع</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selected.impact}
                  </p>
                </div>
              )}
              <div className="flex flex-row-reverse gap-2 pt-2">
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
                    className={`flex-1 text-xs py-2 rounded-xl border transition
                      ${
                        selected.status === opt.value
                          ? `${opt.color} font-medium`
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRequests;
