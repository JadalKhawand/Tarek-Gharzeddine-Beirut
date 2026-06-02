import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark, faBell, faTrash, faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

interface Reminder {
  _id: string;
  projectTitle: string;
  projectTag: string;
  createdAt: string;
}

interface RemindersModalProps {
  open: boolean;
  onClose: () => void;
  onDeleted?: () => void; // callback to refresh parent count
}

function RemindersModal({ open, onClose, onDeleted }: RemindersModalProps) {
  const { token } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !token) return;
    setLoading(true);
    fetch("http://localhost:3000/reminders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => { setReminders(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setError("فشل تحميل التذكيرات"); setLoading(false); });
  }, [open, token]);

  const handleDelete = async (reminder: Reminder) => {
    setDeletingId(reminder._id);
    try {
      const res = await fetch(
        `http://localhost:3000/reminders/${encodeURIComponent(reminder.projectTitle)}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        setReminders((prev) => prev.filter((r) => r._id !== reminder._id));
        onDeleted?.();
      }
    } finally {
      setDeletingId(null);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div dir="rtl" className="bg-white rounded-2xl border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex flex-row-reverse items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex flex-row-reverse items-center gap-2">
            <FontAwesomeIcon icon={faBell} className="text-green-700" />
            <p className="text-base font-medium text-gray-800">تذكيراتي</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition"
          >
            <FontAwesomeIcon icon={faXmark} className="text-sm" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {loading && (
            <div className="flex items-center justify-center py-12 text-gray-400 gap-2">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              <span className="text-sm">جاري التحميل...</span>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-500 text-center py-8">{error}</p>
          )}

          {!loading && !error && reminders.length === 0 && (
            <div className="text-center py-12">
              <FontAwesomeIcon icon={faBell} className="text-4xl text-gray-200 mb-3" />
              <p className="text-sm text-gray-400">لا توجد تذكيرات بعد</p>
              <p className="text-xs text-gray-300 mt-1">
                اشترك في المشاريع المستقبلية لتظهر هنا
              </p>
            </div>
          )}

          {!loading && reminders.length > 0 && (
            <div className="flex flex-col gap-3">
              {reminders.map((r) => (
                <div
                  key={r._id}
                  className="flex flex-row-reverse items-start justify-between border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex flex-row-reverse items-start gap-3 flex-1">
                    <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                      <FontAwesomeIcon icon={faBell} className="text-orange-500 text-sm" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">{r.projectTitle}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{r.projectTag}</p>
                      <p className="text-xs text-gray-300 mt-1">
                        {new Date(r.createdAt).toLocaleDateString("ar-LB", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(r)}
                    disabled={deletingId === r._id}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition shrink-0 mr-2 disabled:cursor-not-allowed disabled:text-gray-200 disabled:hover:bg-transparent cursor-pointer"
                  >
                    {deletingId === r._id
                      ? <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xs" />
                      : <FontAwesomeIcon icon={faTrash} className="text-xs" />
                    }
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!loading && reminders.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-right">
              إجمالي {reminders.length} تذكير
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default RemindersModal;