import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck, faDownload, faTableColumns, faFileLines, faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import PaymentHistoryModal from "./paymenthistory";

interface Payment {
  _id: string;
  feeType: string;
  amount: string;
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
  status: string;
}

function Spayment() {
  const { token } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // get the just-completed payment from sessionStorage
  const completed: Payment | null = JSON.parse(
    sessionStorage.getItem("completedPayment") || "null"
  );

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:3000/payments/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setPayments(data); })
      .catch(() => {})
      .finally(() => setLoadingHistory(false));
  }, [token]);

  const formattedDate = completed
    ? new Date(completed.createdAt).toLocaleDateString("ar-LB", {
        year: "numeric", month: "long", day: "numeric",
      })
    : new Date().toLocaleDateString("ar-LB", {
        year: "numeric", month: "long", day: "numeric",
      });

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans">

      {/* Stepper */}
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="max-w-3xl mx-auto flex flex-row-reverse items-center justify-center gap-0">
          <div className="flex flex-col items-center gap-1">
            <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center">
              <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
            </div>
            <span className="text-xs text-green-700 font-medium">اختيار الخدمة</span>
          </div>
          <div className="h-0.5 w-24 bg-green-700 mb-4" />
          <div className="flex flex-col items-center gap-1">
            <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center">
              <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
            </div>
            <span className="text-xs text-green-700 font-medium">تفاصيل الدفع</span>
          </div>
          <div className="h-0.5 w-24 bg-green-700 mb-4" />
          <div className="flex flex-col items-center gap-1">
            <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center">
              <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
            </div>
            <span className="text-xs text-green-700 font-medium">تأكيد العملية</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-xl mx-auto px-4 py-10 flex flex-col items-center gap-6">

        {/* Success icon */}
        <div className="w-16 h-16 rounded-2xl bg-green-700 flex items-center justify-center shadow-md">
          <FontAwesomeIcon icon={faCheck} className="text-white text-2xl" />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">تمت عملية الدفع بنجاح</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            تم استلام الدفعة بنجاح وتوثيقها في سجلاتنا الرسمية. تم إرسال نسخة من الإيصال إلى بريدك الإلكتروني.
          </p>
        </div>

        {/* Receipt card */}
        <div className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="flex flex-row-reverse items-center gap-3 p-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faFileLines} className="text-gray-400" />
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">ملخص الفاتورة الرقمية</p>
              <p className="text-base font-semibold text-gray-800">إيصال دفع رقمي</p>
            </div>
          </div>

          <div className="p-5 flex flex-col gap-4">
            <div className="flex flex-row-reverse justify-between text-sm">
              <span className="text-gray-400">رقم العملية</span>
              <span className="font-medium text-gray-700">
                #{completed?.transactionId || "—"}
              </span>
            </div>
            <div className="flex flex-row-reverse justify-between text-sm">
              <span className="text-gray-400">التاريخ والوقت</span>
              <span className="font-medium text-gray-700">{formattedDate}</span>
            </div>
            <div className="flex flex-row-reverse justify-between text-sm">
              <span className="text-gray-400">طريقة الدفع</span>
              <span className="font-medium text-gray-700">
                {completed?.paymentMethod || "—"}
              </span>
            </div>
            <div className="flex flex-row-reverse justify-between text-sm">
              <span className="text-gray-400">نوع الخدمة</span>
              <span className="font-medium text-gray-700">
                {completed?.feeType || "—"}
              </span>
            </div>
            <div className="border-t border-dashed border-gray-200 pt-4 flex flex-row-reverse justify-between">
              <span className="text-gray-500 font-medium">المبلغ الإجمالي المدفوع</span>
              <span className="text-lg font-bold text-gray-800">
                {completed?.amount || "—"}
              </span>
            </div>
            <p className="text-center text-xs text-gray-400">
              شكراً لمساهمتكم في تطوير خدمات مدينة بيروت
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full flex flex-row-reverse gap-3">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition text-sm"
          >
            <FontAwesomeIcon icon={faDownload} />
            <span>تحميل الإيصال (PDF)</span>
          </button>
          <NavLink
            to="/dashboard"
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition text-sm"
          >
            <FontAwesomeIcon icon={faTableColumns} />
            <span>العودة إلى لوحة التحكم</span>
          </NavLink>
        </div>

        {/* Real payment history */}
        <div className="w-full bg-white border border-gray-200 rounded-2xl p-5">
          <p className="text-sm font-semibold text-gray-700 mb-4 text-right">
            سجل المدفوعات السابقة
          </p>

          {loadingHistory ? (
            <div className="flex items-center justify-center py-6 text-gray-400 gap-2">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              <span className="text-xs">جاري التحميل...</span>
            </div>
          ) : payments.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">لا توجد مدفوعات سابقة</p>
          ) : (
            <div className="flex flex-col gap-3">
              {payments.slice(0, 4).map((p) => (
                <div key={p._id} className="flex flex-row-reverse items-center justify-between">
                  <div className="flex flex-row-reverse items-center gap-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faFileLines} className="text-gray-400 text-sm" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700">{p.feeType}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(p.createdAt).toLocaleDateString("ar-LB")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-sm font-semibold text-gray-700">{p.amount}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                      مدفوعة
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <PaymentHistoryModal />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Spayment;