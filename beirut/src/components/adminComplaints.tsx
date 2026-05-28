import { useEffect, useState } from "react";

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

const statusColors: Record<string, string> = {
  pending:     "text-orange-700 bg-orange-50",
  in_progress: "text-blue-700 bg-blue-50",
  resolved:    "text-green-700 bg-green-50",
};

const statusLabels: Record<string, string> = {
  pending:     "قيد الانتظار",
  in_progress: "جارٍ المعالجة",
  resolved:    "تم الحل",
};

function AdminComplaints({ token }: { token: string | null }) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/complaints", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => { setComplaints(data); setLoading(false); })
      .catch(() => { setError("فشل تحميل البلاغات"); setLoading(false); });
  }, [token]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`http://localhost:3000/complaints/${id}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setComplaints((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status } : c))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400">جارٍ التحميل...</div>;
  if (error)   return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div dir="rtl" className="mx-5 my-10">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-green-800">لوحة إدارة البلاغات</h1>
        <p className="text-gray-500 mt-1">إجمالي {complaints.length} بلاغ</p>
      </div>

      <div className="flex flex-col gap-4">
        {complaints.length === 0 && (
          <p className="text-center text-gray-400 py-20">لا توجد بلاغات بعد</p>
        )}
        {complaints.map((c) => (
          <div key={c._id} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex flex-row-reverse items-start justify-between">
              <div className="flex flex-row-reverse items-center gap-3">
                <span className="text-lg font-semibold text-gray-800">{c.category}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[c.status] ?? "text-gray-600 bg-gray-100"}`}>
                  {statusLabels[c.status] ?? c.status}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(c.createdAt).toLocaleDateString("ar-LB")}
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{c.description}</p>

            <div className="flex flex-row-reverse gap-4 text-xs text-gray-400">
              <span>📍 {c.neighborhood}{c.street ? ` - ${c.street}` : ""}</span>
              <span>👤 {c.user?.name} — {c.user?.email}</span>
            </div>

            <div className="flex flex-row-reverse gap-2 mt-1">
              {["pending", "in_progress", "resolved"].map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={c.status === s || updatingId === c._id}
                  onClick={() => updateStatus(c._id, s)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition
                    ${c.status === s
                      ? `${statusColors[s]} border-transparent font-medium`
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                >
                  {statusLabels[s]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminComplaints;