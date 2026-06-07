import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRoadCircleExclamation, faTrashCan, faLightbulb, faTree,
  faSpinner, faLocationDot, faUser, faXmark, faChevronDown, faLock,
} from "@fortawesome/free-solid-svg-icons";
import { useLocked } from "../hooks/useLocked";

interface Complaint {
  _id: string;
  category: string;
  description: string;
  neighborhood: string;
  street?: string;
  status: string;
  createdAt: string;
  user: { name: string; email: string };
}

const statusOptions = [
  { value: "active",    label: "قيد التنفيذ", color: "bg-blue-50 text-blue-600 border-blue-200" },
  { value: "completed", label: "مكتمل",       color: "bg-green-50 text-green-700 border-green-200" },
];

const statusBadgeOptions = [
  ...statusOptions,
  { value: "locked", label: "مقفول", color: "bg-gray-100 text-gray-500 border-gray-200" },
];

const normalizeStatus = (s: string) => {
  if (s === "pending" || s === "in_progress") return "active";
  if (s === "resolved") return "completed";
  return s;
};

const toBackendStatus = (s: string) => {
  if (s === "active")    return "in_progress";
  if (s === "completed") return "resolved";
  return s;
};

const getBadge = (s: string) =>
  statusBadgeOptions.find(o => o.value === normalizeStatus(s)) ||
  { label: s, color: "bg-gray-100 text-gray-500 border-gray-200" };

const categoryConfig: Record<string, { icon: any; color: string; bg: string }> = {
  "الطرق والأرصفة": { icon: faRoadCircleExclamation, color: "text-orange-600", bg: "bg-orange-50" },
  "النفايات":        { icon: faTrashCan,               color: "text-gray-600",   bg: "bg-gray-100" },
  "الإنارة العامة":  { icon: faLightbulb,              color: "text-yellow-600", bg: "bg-yellow-50" },
  "الحدائق والبيئة": { icon: faTree,                   color: "text-green-600",  bg: "bg-green-50" },
};

function AdminComplaints({ token }: { token: string | null }) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter]         = useState("all");
  const [selected, setSelected]     = useState<Complaint | null>(null);

  // ✅ useLocked handles localStorage automatically — no extra useEffects needed
  const { isLocked, lock } = useLocked("lockedComplaints");

  useEffect(() => {
    fetch("http://localhost:3000/complaints", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setComplaints(data); setLoading(false); })
      .catch(() => { setError("فشل تحميل البلاغات"); setLoading(false); });
  }, [token]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`http://localhost:3000/complaints/${id}/status`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ status: toBackendStatus(status) }),
      });
      if (res.ok) {
        setComplaints(prev => prev.map(c => c._id === id ? { ...c, status: toBackendStatus(status) } : c));
        if (selected?._id === id) setSelected(prev => prev ? { ...prev, status: toBackendStatus(status) } : null);
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = filter === "all"
    ? complaints
    : complaints.filter(c => {
        const displayStatus = isLocked(c._id) ? "locked" : normalizeStatus(c.status);
        return displayStatus === filter;
      });

  // ✅ locked items go to the end
  const sorted = [...filtered].sort((a, b) => {
    const aL = isLocked(a._id) ? 1 : 0;
    const bL = isLocked(b._id) ? 1 : 0;
    return aL - bL;
  });

  const counts = {
    all:       complaints.length,
    active:    complaints.filter(c => ["pending","in_progress"].includes(c.status) && !isLocked(c._id)).length,
    completed: complaints.filter(c => c.status === "resolved" && !isLocked(c._id)).length,
    locked:    complaints.filter(c => isLocked(c._id)).length,
  };

  const getCat = (cat: string) =>
    categoryConfig[cat] || { icon: faRoadCircleExclamation, color: "text-gray-500", bg: "bg-gray-100" };

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-400 gap-2">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl" />
      <span className="text-sm">جاري التحميل...</span>
    </div>
  );
  if (error) return <p className="text-center py-20 text-red-500 text-sm">{error}</p>;

  return (
    <div className="text-right flex flex-col gap-6 p-5">

      {/* Header */}
      <div className="flex flex-row-reverse items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة البلاغات</h1>
          <p className="text-sm text-gray-400 mt-0.5">متابعة ومعالجة بلاغات المواطنين</p>
        </div>
        <div className="flex flex-row-reverse gap-3 flex-wrap">
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 flex flex-col items-center shadow-sm min-w-16">
            <span className="text-2xl font-bold text-gray-900">{counts.active}</span>
            <span className="text-xs text-blue-500">قيد التنفيذ</span>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 flex flex-col items-center shadow-sm min-w-16">
            <span className="text-2xl font-bold text-gray-900">{counts.completed}</span>
            <span className="text-xs text-green-600">مكتمل</span>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 flex flex-col items-center shadow-sm min-w-16">
            <span className="text-2xl font-bold text-gray-900">{counts.locked}</span>
            <span className="text-xs text-gray-500">مقفول</span>
          </div>
          <div className="bg-green-800 rounded-2xl px-4 py-3 flex flex-col items-center shadow-sm min-w-16">
            <span className="text-2xl font-bold text-white">{counts.all}</span>
            <span className="text-xs text-green-300">الكل</span>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-row-reverse gap-2 flex-wrap">
        {[
          { value: "all",       label: "جميع البلاغات", count: counts.all },
          { value: "active",    label: "قيد التنفيذ",   count: counts.active },
          { value: "completed", label: "مكتمل",          count: counts.completed },
          { value: "locked",    label: "مقفول",          count: counts.locked },
        ].map(f => (
          <button key={f.value} type="button" onClick={() => setFilter(f.value)}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-xl border transition
              ${filter === f.value ? "bg-green-700 text-white border-green-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            <span>{f.label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === f.value ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Cards */}
      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-300">
          <FontAwesomeIcon icon={faRoadCircleExclamation} className="text-5xl" />
          <p className="text-sm text-gray-400">لا توجد بلاغات في هذه الفئة</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {sorted.map(c => {
            const locked        = isLocked(c._id); // ✅ no naming conflict
            const displayStatus = locked ? "locked" : c.status;
            const badge         = getBadge(displayStatus);
            const cat           = getCat(c.category);
            return (
              // ✅ opacity applied directly here
              <div key={c._id}
                className={`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3 hover:shadow-md transition-all duration-300
                  ${locked ? "opacity-50 grayscale" : ""}`}>

                {/* Top */}
                <div className="flex flex-row-reverse items-start justify-between">
                  <div className="flex flex-row-reverse items-center gap-3">
                    <div className={`w-10 h-10 ${cat.bg} rounded-xl flex items-center justify-center shrink-0`}>
                      <FontAwesomeIcon icon={cat.icon} className={`${cat.color} text-sm`} />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-800">{c.category}</p>
                      <p className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString("ar-LB")}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full border shrink-0 ${badge.color}`}>
                    {badge.label}
                  </span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{c.description}</p>

                <div className="flex flex-row-reverse gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1 flex-row-reverse">
                    <FontAwesomeIcon icon={faLocationDot} className="text-green-600" />
                    {c.neighborhood}{c.street ? ` - ${c.street}` : ""}
                  </span>
                  <span className="flex items-center gap-1 flex-row-reverse">
                    <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                    {c.user?.name}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-row-reverse items-center justify-between pt-1 border-t border-gray-50">
                  <div className="flex flex-row-reverse gap-2">
                    {statusOptions.map(opt => (
                      <button key={opt.value} type="button"
                        disabled={normalizeStatus(c.status) === opt.value || updatingId === c._id || locked}
                        onClick={() => updateStatus(c._id, opt.value)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition
                          ${normalizeStatus(c.status) === opt.value
                            ? `${opt.color} font-medium cursor-default`
                            : "border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer"}`}>
                        {updatingId === c._id && normalizeStatus(c.status) !== opt.value
                          ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                          : opt.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {/* ✅ lock button uses c._id, not item._id */}
                    <button type="button" onClick={() => lock(c._id)} disabled={locked}
                      title={locked ? "مقفول" : "قفل هذا العنصر"}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center border transition
                        ${locked ? "bg-gray-200 border-gray-300 cursor-not-allowed" : "bg-gray-50 border-gray-200 hover:bg-red-50 hover:border-red-200 cursor-pointer"}`}>
                      <FontAwesomeIcon icon={faLock} className={`text-xs ${locked ? "text-gray-500" : "text-gray-400"}`} />
                    </button>
                    <button type="button" onClick={() => setSelected(c)}
                      className="flex items-center gap-1 text-xs text-green-700 hover:underline">
                      <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                      التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4"
          onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}>
          <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex flex-row-reverse items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white">
              <div className="flex flex-row-reverse items-center gap-3">
                <div className={`w-9 h-9 ${getCat(selected.category).bg} rounded-xl flex items-center justify-center`}>
                  <FontAwesomeIcon icon={getCat(selected.category).icon} className={`${getCat(selected.category).color} text-sm`} />
                </div>
                <p className="text-base font-semibold text-gray-800">{selected.category}</p>
              </div>
              <button type="button" onClick={() => setSelected(null)}
                className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition">
                <FontAwesomeIcon icon={faXmark} className="text-sm" />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">المواطن</p>
                  <p className="text-sm font-medium text-gray-800">{selected.user?.name}</p>
                  <p className="text-xs text-gray-400">{selected.user?.email}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">الموقع</p>
                  <p className="text-sm font-medium text-gray-800">{selected.neighborhood}</p>
                  {selected.street && <p className="text-xs text-gray-400">{selected.street}</p>}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">وصف البلاغ</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selected.description}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">تاريخ التقديم</p>
                <p className="text-sm text-gray-700">
                  {new Date(selected.createdAt).toLocaleDateString("ar-LB", { year:"numeric", month:"long", day:"numeric" })}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">تغيير الحالة</p>
                <div className="flex flex-row-reverse gap-2">
                  {statusOptions.map(opt => (
                    <button key={opt.value} type="button"
                      disabled={normalizeStatus(selected.status) === opt.value || updatingId === selected._id || isLocked(selected._id)}
                      onClick={() => updateStatus(selected._id, opt.value)}
                      className={`flex-1 text-xs py-2.5 rounded-xl border transition
                        ${normalizeStatus(selected.status) === opt.value ? `${opt.color} font-medium` : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                      {opt.label}
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

export default AdminComplaints;