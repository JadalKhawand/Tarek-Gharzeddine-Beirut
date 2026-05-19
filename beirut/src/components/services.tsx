import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./footer";
import {
  faBuildingColumns,
  faFileLines,
  faHeadset,
  faDownload,
  faFilePdf,
  faBell,
  faArrowLeft,
  faArrowRight,
  faBriefcase,
  faCode,
  faChartBar,
  faMapMarkedAlt,
  faListCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Future from "../assets/futuristic.png";
import { NavLink } from "react-router-dom";

const downloads = [
  { title: "طلب تصريح إشغال رصيف", size: "PDF · ١.٢ MB" },
  { title: "نموذج براءة ذمة بلدية", size: "PDF · ٨٥٢ KB" },
  { title: "طلب الاعتراض على الرسوم", size: "PDF · ١.٥ MB" },
];

const jobs = [
  {
    icon: faCode,
    title: "مهندس مدني - مشاريع البنى التحتية",
    dept: "إدارة الهندسة",
    location: "بيروت، وسط المدينة",
    deadline: "١٥ مايو ٢٠٢٤",
  },
  {
    icon: faMapMarkedAlt,
    title: "محلل نظم معلومات جغرافية (GIS)",
    dept: "قسم تكنولوجيا المعلومات",
    location: "بيروت، المركز الرئيسي",
    deadline: "٢٢ مايو ٢٠٢٤",
  },
  {
    icon: faChartBar,
    title: "مدقق حسابات مالي أول",
    dept: "المديرية المالية",
    location: "بيروت، الطابق",
    deadline: "٠٥ يونيو ٢٠٢٤",
  },
];

const requirements = [
  "السيرة الذاتية المحدثة (PDF)",
  "صورة عن الهوية اللبنانية أو إجراء قيد",
  "نسخ مصدقة عن الشهادات الجامعية",
  "إفادات الخبرة السابقة",
  "سجل عدلي لا يتجاوز ٣ أشهر",
];


export default function DigitalServices() {
  return (
    <>
      <div className="bg-white min-h-screen text-right">
        {/* Header */}
        <div className="text-center py-10 px-6">
          <h1 className="text-4xl font-bold text-green-900 mb-2">
            بوابة الخدمات الرقمية
          </h1>
          <p className="text-gray-500 text-sm">
            نعمل على تسهيل معاملاتك الحكومية من خلال حلول رقمية مبتكرة توفر وقتك
            وجهدك
          </p>
        </div>

        <div className="px-6 max-w-4xl w-full space-y-6 mx-auto">
          {/* Report / Suggestion box */}
          <div className="border border-gray-200 rounded-2xl p-6 text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              تقديم شكوى أو اقتراح
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              نسعى دائماً لتحسين خدماتنا من خلال ملاحظاتكم
            </p>
            <NavLink
              to="/reports"
              className="w-full bg-green-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition cursor-pointer"
            >
              <FontAwesomeIcon icon={faBell} />
              إرسال البلاغ
            </NavLink>
          </div>

          {/* Most used services */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <button className="text-green-700 text-sm flex items-center gap-1 hover:underline">
                <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                عرض الكل
              </button>
              <h2 className="text-lg font-bold text-gray-800">
                الخدمات الأكثر استخداماً
              </h2>
            </div>
            <div className="flex lg:flex-row flex-col gap-5">
              {/* Featured service */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col gap-2 transition hover:bg-gray-100 hover:shadow-xl delay-100 ease-in-out hover:-translate-y-1 hover:scale-100">
                <div className="w-10 h-10 rounded-xl bg-green-700 flex items-center justify-center text-white ">
                  <FontAwesomeIcon icon={faBuildingColumns} />
                </div>
                <p className="font-semibold text-gray-800">رخص البناء</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  تقديم طلبات التشييد الرقمي والإضافات البنية الإلكترونية
                  بالكامل
                </p>
              </div>
              {/* Service 2 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-between flex-1 transition hover:bg-gray-100 hover:shadow-xl delay-100 ease-in-out hover:-translate-y-1 hover:scale-100">
                <div className="flex flex-row-reverse justify-between items-start">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="text-gray-500 text-sm cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faFileLines}
                    className="text-gray-400 text-xl"
                  />
                </div>
                <p className="font-semibold text-gray-700 mt-4">طلب مستندات</p>
              </div>
              {/* Service 3 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-between flex-1 transition hover:bg-gray-100 hover:shadow-xl delay-100 ease-in-out hover:-translate-y-1 hover:scale-100">
                <div className="flex flex-row-reverse justify-between items-start">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="text-gray-500 text-sm cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faHeadset}
                    className="text-gray-400 text-xl"
                  />
                </div>
                <p className="font-semibold text-gray-700 mt-4">
                  الدعم الإلكتروني
                </p>
              </div>
            </div>
          </div>

          {/* Smart Beirut + Downloads row */}
          <div className="flex md:flex-row flex-col gap-4">
            {/* Smart Beirut card */}
            <div className="relative rounded-2xl overflow-hidden flex-1">
              <img
                src={Future}
                alt="بيروت الذكية"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-green-900/80 via-green-900/30 to-transparent" />
              <div className="absolute bottom-4 right-4 text-white text-right">
                <p className="font-bold text-lg">بيروت الذكية</p>
                <p className="text-xs text-green-100 leading-relaxed max-w-[180]">
                  رؤيتنا هي تحويل كافة الخدمات البلدية إلى منصات رقمية تفاعلية
                  تخدم المواطن على مدار الساعة.
                </p>
              </div>
            </div>

            {/* Downloads */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3 my-3 flex-row-reverse">
                <FontAwesomeIcon icon={faDownload} className="text-gray-400" />
                <h3 className="font-bold text-gray-800">نماذج التحميل</h3>
              </div>
              <div className="flex flex-col gap-5">
                {downloads.map((d, i) => (
                  <div
                    key={i}
                    className="flex flex-row-reverse items-center justify-between gap-2 hover:bg-gray-50 p-3 transition cursor-pointer border-b border-gray-200 last:border-0"
                  >
                    <FontAwesomeIcon
                      icon={faDownload}
                      className="text-green-700 text-sm"
                    />
                    <div className="flex-1 text-right">
                      <p className="text-sm font-medium text-gray-700">
                        {d.title}
                      </p>
                      <p className="text-xs text-gray-400">{d.size}</p>
                    </div>
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      className="text-red-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Jobs section */}
          <div>
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-green-900 mb-1">
                فرص العمل والمناقصات
              </h2>
              <p className="text-sm text-gray-500">
                بوابة بلدية بيروت للشفافية والتعاون المؤسساتي. اكتشف الفرص
                الوظيفية وشارك في بناء مستقبل العاصمة
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-row-reverse justify-center gap-2 mb-4">
              <button className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-2 rounded-xl font-medium">
                <FontAwesomeIcon icon={faBriefcase} />
                فرص العمل
              </button>
              <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-xl hover:bg-gray-50 cursor-pointer">
                <FontAwesomeIcon icon={faListCheck} />
                المناقصات العامة
              </button>
            </div>

            <div className="flex lg:flex-row flex-col items-center gap-4">
              {/* Jobs list */}
              <div className="flex-3 space-y-3 p-3 border border-gray-200 rounded-2xl">
                <div className="flex flex-row-reverse items-center justify-between text-xs text-gray-400 px-1 mb-1">
                  <button className="border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 text-xs cursor-pointer hover:bg-gray-50">
                    نوع العقد
                  </button>
                  <button className="border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 text-xs cursor-pointer hover:bg-gray-50">
                    كل الإدارات
                  </button>
                  <span>تم العثور على ١٥ فرصة عاملة</span>
                </div>
                {jobs.map((job, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4"
                  >
                    <button className="bg-green-800 text-white text-xs px-4 py-2 rounded-xl font-medium whitespace-nowrap hover:bg-green-700 transition cursor-pointer">
                      تقديم الآن
                    </button>
                    <div className="flex-1 text-right">
                      <p className="font-semibold text-gray-800 text-sm">
                        {job.title}
                      </p>
                      <div className="flex items-center gap-3 justify-end mt-1 text-xs text-gray-400">
                        <span>{job.location}</span>
                        <span>{job.dept}</span>
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-400 whitespace-nowrap">
                      <p className="text-gray-500 font-medium">
                        التاريخ الأخير
                      </p>
                      <p className="text-red-700 font-semibold">
                        {job.deadline}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-green-700">
                      <FontAwesomeIcon icon={job.icon} />
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 pt-2">
                  <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                    <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                  </button>
                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      className={`w-8 h-8 rounded-lg text-sm font-medium ${n === 1 ? "bg-green-800 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer"}`}
                    >
                      {n}
                    </button>
                  ))}
                  <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </button>
                </div>
              </div>

              {/* Requirements sidebar */}
              <div className="bg-gray-100 border border-gray-200 rounded-2xl p-2 w-1/2 flex-1">
                <div className="flex items-center gap-2 justify-end mb-3">
                  <p className="font-bold text-gray-800 text-sm">
                    متطلبات التقديم العام
                  </p>
                  <FontAwesomeIcon
                    icon={faListCheck}
                    className="text-green-700"
                  />
                </div>
                <ul className="space-y-2">
                  {requirements.map((r, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 justify-end text-right"
                    >
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {r}
                      </p>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 shrink-0" />
                    </li>
                  ))}
                </ul>
                <hr className="text-gray-300 my-5" />
                <div className="text-right flex flex-col items-end">
                  <p className="text-xs text-gray-400 text-right mb-3">
                    هل تحتاج مساعدة في عملية التقديم؟
                  </p>
                  <button className="w-full border border-green-800 rounded-xl py-2 text-sm text-gray-700 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 transition">
                    <FontAwesomeIcon icon={faUser} className="text-green-800" />
                    دليل المستخدم
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex bg-green-900 rounded-2xl w-full py-6 items-center justify-between my-6 mb-8 gap-2 flex-col">
            <div className="text-right">
              <h2 className="text-xl font-bold text-white mb-1">
                اشترك في التنبيهات
              </h2>
              <p className="text-green-200 text-sm">
                احصل على إشعارات فورية عند نشر وظائف أو مناقصات جديدة تناسب
                تخصصك
              </p>
            </div>

            <button className="bg-white text-green-900 font-semibold text-sm px-8 py-2.5 w-1/2 rounded-xl whitespace-nowrap hover:bg-green-50 transition cursor-pointer">
              تفعيل التنبيهات
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
