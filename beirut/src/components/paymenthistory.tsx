import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faDownload, faFilter, faEye } from "@fortawesome/free-solid-svg-icons";

const payments = [
  { id: "#TRX-88270", type: "رسوم النظافة السنوية", date: "12/05/2024", amount: "450,000 ل.ل", status: "مدفوعة", statusColor: "text-green-700 bg-green-50" },
  { id: "#TRX-88209", type: "رسوم مواقف عامة",      date: "06/12/2023", amount: "80,000 ل.ل",  status: "مدفوعة", statusColor: "text-green-700 bg-green-50" },
  { id: "#TRX-66155", type: "خدمة بناء وترميم",     date: "05/11/2023", amount: "450,000 ل.ل", status: "متأخرة", statusColor: "text-orange-700 bg-orange-50" },
  { id: "#TRX-55340", type: "رسوم المسقفات",        date: "18/08/2023", amount: "1,200,000 ل.ل", status: "مدفوعة", statusColor: "text-green-700 bg-green-50" },
  { id: "#TRX-44210", type: "رسوم إدارية",          date: "03/04/2023", amount: "25,000 ل.ل",  status: "مدفوعة", statusColor: "text-green-700 bg-green-50" },
  { id: "#TRX-33190", type: "رسوم النظافة السنوية", date: "10/01/2023", amount: "380,000 ل.ل", status: "ملغاة",  statusColor: "text-gray-600 bg-gray-100" },
];

function PaymentHistoryModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full text-center text-sm hover:text-gray-600 transition mt-4 cursor-pointer"
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

            {/* Table */}
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
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-5 py-3 text-xs text-gray-400 whitespace-nowrap">{p.id}</td>
                      <td className="px-3 py-3 text-gray-800">{p.type}</td>
                      <td className="px-3 py-3 text-gray-400 whitespace-nowrap">{p.date}</td>
                      <td className="px-3 py-3 font-medium text-gray-800 whitespace-nowrap">{p.amount}</td>
                      <td className="px-3 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full ${p.statusColor}`}>{p.status}</span>
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