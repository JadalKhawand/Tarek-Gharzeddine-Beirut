import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faShield,
  faLocationDot,
  faCalendarDays,
  faArrowLeft,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";

interface SuggestionSuccessProps {
  suggestion: {
    _id: string;
    title: string;
    neighborhood: string;
    category: string;
    createdAt: string;
  };
}

const nextSteps = [
  {
    num: 1,
    title: "مراجعة أولية",
    desc: "يتم التحقق من مطابقة الاقتراح للمعايير الحضرية لمدينة بيروت",
  },
  {
    num: 2,
    title: "دراسة الجدوى",
    desc: "يقوم الخبراء بتقدير الموارد المطلوبة والأثر البيئي والاجتماعي",
  },
  {
    num: 3,
    title: "التصويت والقرار",
    desc: "يُطرح المشروع لتصويت سكان الحي في حال قبوله فنياً",
  },
];

function SuggestionSuccess({ suggestion }: SuggestionSuccessProps) {
  // generate a short readable reference number from the mongo id
  const refNumber = suggestion._id.slice(-4).toUpperCase();

  const submittedDate = new Date(suggestion.createdAt).toLocaleDateString(
    "ar-LB",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="text-right flex flex-col items-center gap-8 py-8 max-w-2xl mx-auto">
      {/* Icon */}
      <div className="w-20 h-20 bg-green-700 rounded-2xl flex items-center justify-center shadow-lg">
        <FontAwesomeIcon icon={faCheck} className="text-white text-3xl" />
      </div>

      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          تم استلام اقتراحك بنجاح
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
          شكراً لمساهمتك في تطوير بيروت. سيقوم فريق التخطيط الحضري بمراجعة طلبك
          وإعلامك بالنتيجة قريباً عبر البريد الإلكتروني ولوحة التحكم الخاصة بك.
        </p>
      </div>

      {/* Cards */}
      <div className="flex md:flex-row-reverse flex-col gap-4 w-full">
        {/* Reference number */}
        <div className="bg-green-800 rounded-2xl p-6 text-white text-center flex flex-col items-center gap-3 flex-1">
          <FontAwesomeIcon
            icon={faShield}
            className="text-green-300 text-2xl"
          />
          <p className="text-sm text-green-200">رقم المراجعة</p>
          <p className="text-4xl font-bold tracking-widest">#{refNumber}</p>
          <p className="text-xs text-green-300 leading-relaxed">
            استخدم هذا الرقم لمتابعة حالة الطلب لاحقاً
          </p>
        </div>

        {/* Submission details */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 flex-2 shadow-sm">
          <p className="text-xs text-gray-400">تفاصيل الطلب</p>
          <h3 className="text-lg font-bold text-gray-900 leading-snug">
            {suggestion.title}
          </h3>
          <div className="flex flex-row-reverse gap-6 flex-wrap">
            <div>
              <p className="text-xs text-gray-400 mb-1">الحي المستهدف</p>
              <div className="flex flex-row-reverse items-center gap-1.5 text-sm text-gray-700">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-green-700 text-xs"
                />
                <span>{suggestion.neighborhood} - بيروت</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">تاريخ التقديم</p>
              <div className="flex flex-row-reverse items-center gap-1.5 text-sm text-gray-700">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-green-700 text-xs"
                />
                <span>{submittedDate}</span>
              </div>
            </div>
          </div>
          <span className="self-end inline-block bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full border border-green-100">
            {suggestion.category}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-row-reverse gap-3 w-full">
        <NavLink
          to="/dashboard"
          className="flex-1 bg-green-700 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faTableColumns} />
          <span>لوحة التحكم الشخصية</span>
        </NavLink>
        <NavLink
          to="/projects"
          className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition text-sm flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          <span>العودة إلى المشاريع</span>
        </NavLink>
      </div>

      {/* What happens next */}
      <div className="w-full">
        <p className="text-base font-semibold text-gray-800 mb-8 text-right">
          ماذا سيحدث الآن؟
        </p>

        {/* Circles + connecting line */}
        <div className="relative flex flex-row-reverse items-center justify-between mb-6 mx-20">
          {/* Background line behind all circles */}
          <div className="absolute top-1/2 right-0 left-0 h-0.5 bg-gray-200 -translate-y-1/2" />

          {nextSteps.map((step, i) => (
            <div key={step.num} className="relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition
          ${
            i === 0
              ? "bg-green-700 text-white border-green-700"
              : "bg-white text-gray-400 border-gray-200"
          }`}
              >
                {step.num}
              </div>
            </div>
          ))}
        </div>

        {/* Text below each circle */}
        <div className="flex flex-row-reverse gap-10">
          {nextSteps.map((step) => (
            <div key={step.num} className="flex-1 text-center px-2">
              <p className="text-sm font-semibold text-gray-800 mb-1">
                {step.title}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuggestionSuccess;
