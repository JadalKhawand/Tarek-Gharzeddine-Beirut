import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faDownload, faFilter, faEye, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

interface Payment {
  _id: string;
  transactionId: string;
  feeType: string;
  amount: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

function PaymentHistoryModal() {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !token) return;
    setLoading(true);
    setError("");
    fetch("http://localhost:3000/payments/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPayments(data);
        else setError("فشل تحميل البيانات");
      })
      .catch(() => setError("فشل الاتصال بالخادم"))
      .finally(() => setLoading(false));
  }, [open, token]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full text-center text-sm transition mt-4 cursor-pointer font-medium text-white bg-green-700 hover:bg-green-600 px-4 py-2 rounded-xl"
      >
        عرض كل السجل
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div dir="rtl" className="bg-white rounded-2xl border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex flex-row-reverse items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <p className="text-base font-medium text-gray-800">سجل المدفوعات التفصيلي</p>
              <div className="flex items-center gap-2">
                <button type="button" className="flex items-center gap-1.5 text-sm px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition">
                  <FontAwesomeIcon icon={faDownload} className="text-xs" />
                  تصدير
                </button>
                <button type="button" className="flex items-center gap-1.5 text-sm px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition">
                  <FontAwesomeIcon icon={faFilter} className="text-xs" />
                  تصفية
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition"
                >
                  <FontAwesomeIcon icon={faX} className="text-xs" />
                </button>
              </div>
            </div>

            {/* Body */}
            {loading ? (
              <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                <span className="text-sm">جاري التحميل...</span>
              </div>
            ) : error ? (
              <p className="text-center text-sm text-red-500 py-12">{error}</p>
            ) : payments.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-12">لا توجد مدفوعات بعد</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-right px-5 py-3 text-xs font-normal text-gray-400">رقم المعاملة</th>
                      <th className="text-right px-3 py-3 text-xs font-normal text-gray-400">نوع الرسم</th>
                      <th className="text-right px-3 py-3 text-xs font-normal text-gray-400">التاريخ</th>
                      <th className="text-right px-3 py-3 text-xs font-normal text-gray-400">المبلغ</th>
                      <th className="text-right px-3 py-3 text-xs font-normal text-gray-400">الحالة</th>
                      <th className="text-center px-5 py-3 text-xs font-normal text-gray-400">الإيصال</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                        <td className="px-5 py-3 text-xs text-gray-400 whitespace-nowrap">
                          #{p.transactionId}
                        </td>
                        <td className="px-3 py-3 text-gray-800">{p.feeType}</td>
                        <td className="px-3 py-3 text-gray-400 whitespace-nowrap">
                          {new Date(p.createdAt).toLocaleDateString("ar-LB")}
                        </td>
                        <td className="px-3 py-3 font-medium text-gray-800 whitespace-nowrap">
                          {p.amount}
                        </td>
                        <td className="px-3 py-3">
                          <span className={`text-xs px-2.5 py-1 rounded-full
                            ${p.status === "completed" ? "text-green-700 bg-green-50"
                            : p.status === "failed"    ? "text-red-600 bg-red-50"
                            : "text-gray-600 bg-gray-100"}`}>
                            {p.status === "completed" ? "مدفوعة"
                             : p.status === "failed"   ? "فشلت"
                             : "معلقة"}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-center">
                          <button type="button" className="text-gray-400 hover:text-gray-600 transition">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Footer */}
            <div className="flex flex-row-reverse items-center justify-between px-5 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">إجمالي {payments.length} معاملات</p>
              <div className="flex gap-2">
                <button type="button" className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition">السابق</button>
                <button type="button" className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition">التالي</button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default PaymentHistoryModal;