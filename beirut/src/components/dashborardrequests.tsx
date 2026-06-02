import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Colab from "../assets/Citizen Collaboration.png";
import {
  faClipboardList,
  faLeaf,
  faMicrochip,
  faRoad,
  faHandshake,
  faCloudArrowUp,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import Footer from "./footer";
import SuggestionSuccess from "./requestsuccess";
const neighborhoods = [
  "الحمرا",
  "الروشة",
  "رأس بيروت",
  "الأشرفية",
  "الجميزة",
  "المزرعة",
  "البسطة",
  "الطريق الجديدة",
  "برج أبي حيدر",
  "المصيطبة",
  "الصيفي",
  "رمل الظريف",
  "وسط بيروت",
  "الكولا",
  "الدكوانة",
];

const categories = [
  { label: "مساحات خضراء", icon: faLeaf },
  { label: "بنية تحتية", icon: faRoad },
  { label: "تكنولوجيا", icon: faMicrochip },
  { label: "خدمات اجتماعية", icon: faHandshake },
];

const reviewSteps = [
  {
    num: 1,
    title: "مراجعة أولية",
    desc: "دراسة الطلب من قبل فريق التخطيط الحضري للتأكد من اكتمال البيانات",
  },
  {
    num: 2,
    title: "دراسة الجدوى",
    desc: "تقييم الجدوى المالية والأثر الفني والاجتماعي على المنطقة",
  },
  {
    num: 3,
    title: "تصويت المجتمع",
    desc: "إطلاق المقترح للتصويت لسكان الحي عبر المنصة الرقمية",
  },
  {
    num: 4,
    title: "التنفيذ",
    desc: "البدء في إجراءات التراتيب والتنفيذ الفعلي للمشروع",
  },
];

const pastSuccesses = [
  {
    title: "إنارة شارع بليس الذكية",
    desc: "مقترح من المواطن م. راجي، ساهم في خفض استهلاك الطاقة بنسبة 40%",
    badge: "تم التنفيذ",
    badgeColor: "bg-green-50 text-green-700",
  },
  {
    title: "محطات تدوير الأشرفية",
    desc: "مبادرة شبابية تهدف لتعزيز ثقافة الفرز المصدر في شوارع الأشرفية",
    badge: "قيد الدراسة",
    badgeColor: "bg-orange-50 text-orange-600",
  },
];

function DashboardRequests() {
  const { token } = useAuth();
  const [submittedSuggestion, setSubmittedSuggestion] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [impact, setImpact] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length + files.length > 3) {
      setError("الحد الأقصى 3 ملفات فقط");
      return;
    }
    setFiles((prev) => [...prev, ...selected]);
  };

  const handleSubmit = async () => {
    setError("");
    if (!title) return setError("يرجى كتابة عنوان المشروع");
    if (!neighborhood) return setError("يرجى اختيار الحي السكني");
    if (!category) return setError("يرجى اختيار فئة المشروع");
    if (!description) return setError("يرجى كتابة وصف المشروع");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("neighborhood", neighborhood);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("impact", impact);
      files.forEach((f) => formData.append("files", f));

      // 1. fetch first
      const res = await fetch("http://localhost:3000/suggestions", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      // 2. then parse
      const data = await res.json();
      if (!res.ok) return setError(data.error || "حدث خطأ ما");

      // 3. then set success
      setSubmittedSuggestion(data.suggestion);
    } catch {
      setError("فشل الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };
  if (submittedSuggestion) {
    return <SuggestionSuccess suggestion={submittedSuggestion} />;
  }
  return (
    <>
      <div className="text-right p-6">
        {/* Hero */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-6 flex md:flex-row-reverse flex-col-reverse shadow-sm text-right">
          <div
            dir="rtl"
            className="p-8 flex flex-col justify-center flex-1 gap-4"
          >
            <span className="inline-block bg-green-700 text-white text-xs px-3 py-1 rounded-full mb-4 w-fit">
              صوتك بنى مدينتنا
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              اقترح مشروعاً لحيّك
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md">
              نؤمن في بلدية بيروت أن أفضل الأفكار تأتي من الذين يعيشون في قلب
              أحيائنا. شاركنا رؤيتك لتطوير شوارعنا، حدائقنا، وخدماتنا الرقمية
              لنعمل معاً على بناء بيروت المستقبل.
            </p>
          </div>
          <div className="md:w-72 h-48 md:h-auto overflow-hidden shrink-0">
            <img
              src={Colab}
              alt="اقتراح مشروع"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Two columns */}
        <div className="flex xl:flex-row-reverse flex-col gap-6">
          {/* ── Right: Form ── */}
          <div className="flex-2 flex flex-col gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-row-reverse items-center gap-2 mb-5">
                <FontAwesomeIcon
                  icon={faClipboardList}
                  className="text-green-700"
                />
                <p className="text-base font-semibold text-gray-800">
                  تفاصيل المقترح
                </p>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-sm text-gray-500">عنوان المشروع</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: تطوير حديقة الصنائع"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition"
                />
              </div>

              {/* Neighborhood + Category */}
              <div className="flex flex-row-reverse gap-4 mb-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-sm text-gray-500">الحي السكني</label>
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition bg-white"
                  >
                    <option value="">اختر الحي...</option>
                    {neighborhoods.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-sm text-gray-500">فئة المشروع</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition bg-white"
                  >
                    <option value="">اختر الفئة...</option>
                    {categories.map((c) => (
                      <option key={c.label} value={c.label}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category tags */}
              <div className="flex flex-row-reverse flex-wrap gap-2 mb-4">
                {categories.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => setCategory(c.label)}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition
                    ${
                      category === c.label
                        ? "bg-green-700 text-white border-green-700"
                        : "border-gray-200 text-gray-600 hover:border-green-400 hover:bg-green-50"
                    }`}
                  >
                    <FontAwesomeIcon icon={c.icon} className="text-xs" />
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-sm text-gray-500">
                  وصف المشروع بالتفصيل
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="أشرح لنا فكرتك بوضوح..."
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition resize-none"
                />
              </div>

              {/* Impact */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-sm text-gray-500">
                  الأثر المتوقع والفوائد
                </label>
                <textarea
                  value={impact}
                  onChange={(e) => setImpact(e.target.value)}
                  placeholder="كيف سيستفيد جيرانك وأهالي المنطقة من هذا المشروع؟"
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-right text-sm focus:outline-none focus:border-green-500 transition resize-none"
                />
              </div>

              {/* File upload */}
              <div className="mb-5">
                <label className="border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 h-28 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-green-400 hover:bg-green-50 transition">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <FontAwesomeIcon
                    icon={faCloudArrowUp}
                    className="text-2xl text-gray-400"
                  />
                  <p className="text-sm text-gray-600">
                    اسحب وأفلت الملفات هنا
                  </p>
                  <p className="text-xs text-gray-400">
                    أو اضغط لاختيار ملفات (PDF, PNG, JPG)
                  </p>
                </label>
                {files.length > 0 && (
                  <div className="flex flex-row-reverse flex-wrap gap-2 mt-2">
                    {files.length > 0 && (
                      <div className="flex flex-row-reverse flex-wrap gap-2 mt-2">
                        {files.map((f, i) => (
                          <div key={i} className="relative w-20 h-20">
                            <img
                              src={URL.createObjectURL(f)}
                              alt={f.name}
                              className="w-full h-full object-cover rounded-xl border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setFiles((prev) =>
                                  prev.filter((_, j) => j !== i),
                                )
                              }
                              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition cursor-pointer pb-1"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Error / Success */}
              {error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2 mb-4">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="cursor-pointer w-full bg-green-700 hover:bg-green-600 disabled:bg-green-400 text-white font-semibold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2"
              >
                {loading && (
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                )}
                {loading ? "جاري التقديم..." : "تقديم المقترح"}
              </button>
            </div>
          </div>

          {/* ── Left: Sidebar ── */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Review steps */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-row-reverse items-center gap-2 mb-4">
                <p className="text-sm font-semibold text-gray-800">
                  مسار مراجعة المقترح
                </p>
                <span className="text-gray-400 text-xs">ⓘ</span>
              </div>
              <div className="flex flex-col gap-4">
                {reviewSteps.map((step) => (
                  <div key={step.num} className="flex flex-row-reverse gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-700 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                      {step.num}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-800">
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past successes */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-sm font-semibold text-gray-800 mb-4">
                نجاحات سابقة
              </p>
              <div className="flex flex-col gap-3">
                {pastSuccesses.map((s, i) => (
                  <div
                    key={i}
                    className="border border-gray-100 rounded-xl p-3 flex flex-col gap-1.5"
                  >
                    <div className="flex flex-row-reverse items-start justify-between">
                      <p className="text-sm font-medium text-gray-800">
                        {s.title}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full shrink-0 mr-2 ${s.badgeColor}`}
                      >
                        {s.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default DashboardRequests;
