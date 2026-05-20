import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Payments() {
  const [selectedFee, setSelectedFee] = useState("cleaning");

  const fees = [
    { id: "cleaning", title: "رسوم النظافة السنوية", amount: "450,000 ل.ل.", ref: "1245/ب" },
    { id: "roof",     title: "رسوم المسقفات",        amount: "1,200,000 ل.ل.", ref: "1245/ب" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Stepper */}
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="max-w-4xl mx-auto flex flex-row-reverse items-center justify-center gap-0">

          <div className="flex flex-col items-center gap-1">
            <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">1</span>
            </div>
            <span className="text-xs text-green-700 font-medium">اختيار الخدمة</span>
          </div>

          <div className="h-0.5 w-24 bg-gray-200 mb-4" />

          <div className="flex flex-col items-center gap-1">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm font-semibold">2</span>
            </div>
            <span className="text-xs text-gray-400 font-medium">بيانات الدفع</span>
          </div>

          <div className="h-0.5 w-24 bg-gray-200 mb-4" />

          <div className="flex flex-col items-center gap-1">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm font-semibold">3</span>
            </div>
            <span className="text-xs text-gray-400 font-medium">تأكيد العملية</span>
          </div>

        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-4">

        {/* Fee selection */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <p className="text-base font-semibold text-gray-800 mb-4">اختيار الرسوم المستحقة</p>
          <div className="flex flex-row-reverse gap-3">
            {fees.map((fee) => {
              const isSelected = selectedFee === fee.id;
              return (
                <button
                  type="button"
                  key={fee.id}
                  onClick={() => setSelectedFee(fee.id)}
                  className={`flex-1 rounded-xl p-4 text-right transition cursor-pointer
                    ${isSelected
                      ? "border-2 border-green-700 bg-green-50"
                      : "border border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-gray-500">رقم العقار: {fee.ref}</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center
                      ${isSelected ? "bg-green-700" : "border border-gray-300"}`}>
                      {isSelected && (
                        <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                      )}
                    </div>
                  </div>
                  <p className="font-medium text-sm">{fee.title}</p>
                  <p className={`font-medium text-sm mt-1 ${isSelected ? "text-green-800" : ""}`}>
                    {fee.amount}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Billing info */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <p className="text-base font-semibold text-gray-800 mb-4">معلومات الفوترة</p>

          <div className="flex flex-row-reverse gap-4 mb-4">
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-sm text-gray-500 text-right">الاسم الكامل</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-sm text-gray-500 text-right">البريد الإلكتروني</label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition"
              />
            </div>
          </div>

          <div className="flex flex-row-reverse gap-4 mb-4">
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-sm text-gray-500 text-right">رقم الهاتف</label>
              <input
                type="tel"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-sm text-gray-500 text-right">العنوان</label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-6">
            <label className="text-sm text-gray-500 text-right">عنوان السكن</label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition"
            />
          </div>

          <div className="flex flex-row-reverse gap-3">
            <NavLink
              to="/fpayments"
              className="flex-1 bg-green-700 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition text-sm text-center"
            >
              متابعة الدفع
            </NavLink>
            <NavLink
              to="/"
              className="px-5 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition text-center"
            >
              إلغاء
            </NavLink>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Payments;