import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCreditCard,
  faUniversity,
  faLock,
  faQuestionCircle,
  faShieldHalved,
  faCircleInfo,
  faPhone,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function Fpayments() {
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [cardName, setCardName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");

  const formatCardNumber = (val: string): string => {
    return val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (val: string): string => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Stepper */}
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="max-w-4xl mx-auto flex flex-row-reverse items-center justify-center gap-0">

          {/* Step 1 - اختيار الخدمة */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center">
              <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
            </div>
            <span className="text-xs text-green-700 font-medium">اختيار الخدمة</span>
          </div>

          <div className="h-0.5 w-24 bg-green-700 mb-4" />

          {/* Step 2 - تفاصيل الدفع */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">2</span>
            </div>
            <span className="text-xs text-green-700 font-medium">تفاصيل الدفع</span>
          </div>

          <div className="h-0.5 w-24 bg-gray-200 mb-4" />

          {/* Step 3 - تأكيد العملية */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm font-semibold">3</span>
            </div>
            <span className="text-xs text-gray-400 font-medium">تأكيد العملية</span>
          </div>

        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-row-reverse gap-6 items-start">

        {/* Left: Summary */}
        <div className="w-72 shrink-0 flex flex-col gap-4">
          <div className="bg-green-800 rounded-2xl p-5 text-white">
            <p className="text-lg font-semibold mb-4">ملخص المعاملة</p>

            <div className="flex flex-row-reverse items-center gap-3 bg-green-700 rounded-xl p-3 mb-5">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={faTrashCan} className="text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">رسوم جمع النفايات المنزلية</p>
                <p className="text-xs text-green-300 mt-0.5">رقم المعاملة: BRT-2024-8832</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm border-b border-green-700 pb-4 mb-4">
              <div className="flex flex-row-reverse justify-between">
                <span className="text-green-300">المبلغ الأساسي</span>
                <span>250,000 ل.ل</span>
              </div>
              <div className="flex flex-row-reverse justify-between">
                <span className="text-green-300">رسوم إدارية</span>
                <span>15,000 ل.ل</span>
              </div>
              <div className="flex flex-row-reverse justify-between">
                <span className="text-green-300">الضريبة (11%)</span>
                <span>29,150 ل.ل</span>
              </div>
            </div>

            <div className="flex flex-row-reverse justify-between items-center">
              <span className="text-green-300 text-sm">المجموع الكلي</span>
              <span className="text-xl font-bold">294,150 ل.ل</span>
            </div>
          </div>

          {/* Info note */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex flex-row-reverse gap-3 items-start">
            <FontAwesomeIcon icon={faCircleInfo} className="text-blue-500 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-700 leading-relaxed text-right">
              سيتم إصدار إيصال الكتروني فور نجاح العملية. يمكنك تحميل الإيصال أو إرساله إلى بريدك الإلكتروني المسجل.
            </p>
          </div>

          {/* Support */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-row-reverse gap-3 items-center">
            <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faPhone} className="text-green-700 text-sm" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">هل تواجه مشكلة؟</p>
              <p className="text-xs text-gray-500 mt-0.5">اتصل بمركز الدعم الفني</p>
            </div>
          </div>
        </div>

        {/* Right: Payment form */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Payment method */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex flex-row-reverse items-center gap-2 mb-4">
              <FontAwesomeIcon icon={faCreditCard} className="text-green-700" />
              <p className="text-base font-semibold text-gray-800">طريقة الدفع</p>
            </div>

            <div className="flex flex-row-reverse gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex-1 flex flex-row-reverse items-center gap-3 border rounded-xl px-4 py-3 transition
                  ${paymentMethod === "card"
                    ? "border-2 border-green-700 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0
                  ${paymentMethod === "card" ? "bg-green-700" : "border border-gray-300"}`}>
                  {paymentMethod === "card" && (
                    <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                  )}
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${paymentMethod === "card" ? "text-green-800" : "text-gray-700"}`}>
                    بطاقة ائتمان / سحب
                  </p>
                  <p className="text-xs text-gray-400">Visa, Mastercard, Maestro</p>
                </div>
                <FontAwesomeIcon icon={faCreditCard} className={`mr-auto text-lg ${paymentMethod === "card" ? "text-green-700" : "text-gray-300"}`} />
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("bank")}
                className={`flex-1 flex flex-row-reverse items-center gap-3 border rounded-xl px-4 py-3 transition
                  ${paymentMethod === "bank"
                    ? "border-2 border-green-700 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0
                  ${paymentMethod === "bank" ? "bg-green-700" : "border border-gray-300"}`}>
                  {paymentMethod === "bank" && (
                    <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                  )}
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${paymentMethod === "bank" ? "text-green-800" : "text-gray-700"}`}>
                    تحويل مصرفي
                  </p>
                  <p className="text-xs text-gray-400">عبر تطبيق المصرف الخاص بك</p>
                </div>
                <FontAwesomeIcon icon={faUniversity} className={`mr-auto text-lg ${paymentMethod === "bank" ? "text-green-700" : "text-gray-300"}`} />
              </button>
            </div>
          </div>

          {/* Card details */}
          {paymentMethod === "card" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <p className="text-base font-semibold text-gray-800 mb-4">معلومات البطاقة</p>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm text-gray-500 block mb-1.5 text-right">اسم حامل البطاقة</label>
                  <input
                    type="text"
                    placeholder="الاسم كما يظهر على البطاقة"
                    value={cardName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardName(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500 block mb-1.5 text-right">رقم البطاقة</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardNumber(formatCardNumber(e.target.value))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition pr-10"
                    />
                    <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                  </div>
                </div>

                <div className="flex flex-row-reverse gap-4">
                  <div className="flex-1">
                    <label className="text-sm text-gray-500 block mb-1.5 text-right">تاريخ الانتهاء</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExpiry(formatExpiry(e.target.value))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-500 block mb-1.5 text-right">رمز التحقق (CVV)</label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="***"
                        value={cvv}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition pr-10"
                      />
                      <FontAwesomeIcon icon={faQuestionCircle} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security + Actions */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex flex-row-reverse justify-between items-center mb-5">
              <div className="flex flex-row-reverse items-center gap-2">
                <FontAwesomeIcon icon={faShieldHalved} className="text-green-700" />
                <span className="text-xs text-green-700 font-medium">دفع آمن ومشفر بمعيار SSL-256 bit</span>
              </div>
              <span className="text-xs text-gray-400 border border-gray-200 rounded-lg px-3 py-1">
                🔒 بوابة دفع محمية
              </span>
            </div>

            <div className="flex flex-row-reverse gap-3">
              <button
                type="button"
                className="flex-1 bg-green-700 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition text-sm"
              >
                تأكيد ودفع الرسوم
              </button>
              <NavLink
                to="/payments"
                className="px-5 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition text-center"
              >
                إلغاء المعاملة
              </NavLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Fpayments;