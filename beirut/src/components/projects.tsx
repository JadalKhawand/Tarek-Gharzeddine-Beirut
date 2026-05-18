import Beirut from "../assets/city/beirut-pic.png";
import Background from "../assets/city/background-2.png";
import Olive from "../assets/city/olivegarden.png";
import Futur from "../assets/city/futur.png";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

function Projects() {
  return (
    <div className="min-h-screen text-right">
      <section className="relative overflow-hidden rounded-2xl mx-4 md:mx-6 mt-6">
        {/* Background */}
        <img
          src={Background}
          alt="بيروت"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-green-800/50" />

        {/* Content */}
        <div
          className="
      relative
      z-10
      flex
      flex-col
      lg:flex-row-reverse
      items-center
      gap-8
      lg:gap-10
    "
        >
          {/* Text */}
          <div
            className="
        text-right
        text-white
        w-full
        lg:w-1/2
        px-6
        py-10
        md:px-10
        lg:px-0
        lg:pr-10
      "
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              مشاريع النهضة العمرانية
            </h1>

            <p className="text-green-100 text-sm md:text-base leading-8 max-w-xl">
              نعمل يداً بيد لبناء مدينة مستدامة، حديثة، وتنبض بالحياة من خلال
              سلسلة من المشاريع الإستراتيجية التي تستهدف تحسين جودة العيش في
              كافة أحياء العاصمة
            </p>
          </div>

          {/* Image */}
          <div
            className="
        w-full
        lg:w-1/2
        h-[250]
        md:h-[400]
        lg:h-[500]
        overflow-hidden
      "
          >
            <img
              src={Beirut}
              alt="مبنى بيروت"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex md:flex-row flex-col-reverse items-center justify-between mb-6 mx-10 border border-gray-300 p-4 rounded-2xl bg-white ">
          {/* Stats */}
          <div className="flex items-center flex-row gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1 font-semibold">
              <span className="text-gray-800 font-bold text-base">24</span>
              <span>مشروع نشط</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-800 font-bold text-base">158</span>
              <span>مشروع منجز</span>
            </div>
          </div>
          <div className="flex flex-row-reverse gap-2 bg-gray-200 p-1 rounded-lg">
            <button className="bg-green-800 text-white text-sm px-4 py-1.5 rounded-lg font-medium cursor-pointer hover:bg-green-900">
              الحالية
            </button>
            <button className="bg-white border border-gray-200 text-gray-600 text-sm px-4 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
              المكتملة
            </button>
            <button className="bg-white border border-gray-200 text-gray-600 text-sm px-4 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
              المستقبلية
            </button>
          </div>
        </div>

        <div className="flex xl:flex-row flex-col mx-20 gap-4 mb-4">
          {/* Card 1: تأهيل الحدائق العامة */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col flex-1">
            <div className="relative h-full overflow-hidden">
              <img
                src={Olive}
                alt="الحدائق"
                className="w-full h-full rounded-t-2xl"
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <span className="self-end inline-block bg-green-50 text-green-800 text-xs px-3 py-1 rounded-full mb-2 border border-green-100">
                البيئة والاستدامة
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                تأهيل الحدائق العامة
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                إعادة ترميم ٥ حدائق كبرى في المدينة بمرافق ترفيهية
              </p>
              <div className="mt-auto">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>40%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                  <div
                    className="bg-green-600 h-1.5 rounded-full"
                    style={{ width: "40%" }}
                  />
                </div>
                <button className="w-full border border-gray-200 rounded-xl py-2 text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer">
                  عرض التحديثات
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: مشروع الحافلات الذكية - large featured */}
          <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col flex-3">
            <div className="relative h-full overflow-hidden">
              <img
                src={Futur}
                alt="الحافلات الذكية"
                className="w-full h-full rounded-t-2xl"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-2">
                <span className="inline-block bg-green-50 text-green-800 text-xs px-3 py-1 rounded-full border border-green-100">
                  تطوير النقل الحضري
                </span>
                <div>
                  <span className="text-green-700 font-bold text-sm">75%</span>
                  <span className="text-gray-400 text-xs mr-1">
                    نسبة الإنجاز
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                مشروع الحافلات الذكية السريعة
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                يهدف المشروع إلى توفير شبكة نقل متكاملة تغطي كافة أحياء العاصمة
                مع محطات ذكية تعمل بالطاقة الشمسية لتقليل الازدحام المروري
                وتحسين جودة الهواء
              </p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                <div
                  className="bg-green-600 h-1.5 rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
              <div className="flex flex-row-reverse items-center justify-between mt-auto">
                <div className="flex -space-x-2 space-x-reverse">
                  <div className="w-8 h-8 rounded-full bg-green-700 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    م
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    ع
                  </div>
                  <div className="w-8 h-8 rounded-full bg-orange-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    +٤
                  </div>
                </div>
                <button className="flex flex-row cursor-pointer items-center gap-1 text-green-700 text-sm font-medium hover:underline">
                  <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                  تفاصيل المشروع
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: 3 smaller cards */}
        <div className="flex xl:flex-row flex-col-reverse px-10 m-10 gap-4">
          {/* Card: اقترح مشروعاً */}
          <div className="bg-green-900 rounded-2xl p-5 flex flex-col justify-between text-white items-center text-center">
            <div>
              <h3 className="text-lg font-bold mb-2">اقترح مشروعاً لحيّك</h3>
              <p className="text-green-200 text-sm leading-relaxed">
                نحن نؤمن بأن المواطن هو الشريك الأول في التنمية. شاركنا أفكارك
                لتحسين منطقتك
              </p>
            </div>
            <button className="mt-4 bg-white text-green-900 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-green-50 transition w-fit cursor-pointer">
              تقديم اقتراح
            </button>
          </div>

          {/* Card: بوابة الخدمات الموحدة */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <span className="inline-block bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full border border-green-100 mb-3">
                التحول الرقمي
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                بوابة الخدمات الموحدة
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                أتمتة كاملة المعاملات البلدية لتصبح إلكترونية بالكامل
              </p>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>15%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-green-600 h-1.5 rounded-full"
                  style={{ width: "15%" }}
                />
              </div>
            </div>
          </div>

          {/* Card: إنارة الشوارع الذكية */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-end gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  إنارة الشوارع الذكية
                </span>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-green-700"
                />
              </div>
              <p className="text-xs text-gray-400 text-right mb-3">
                كافة أحياء بيروت
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                تطبيق نظام إنارة LED ذكي يعمل بالحساسات لتقليل استهلاك الطاقة
                بنسبة ٦٠٪
              </p>
            </div>
            <hr className="text-gray-300" />
            <div className="flex flex-row-reverse items-center justify-between">
              <span className="text-green-700 font-bold text-lg">90%</span>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-gray-400"
                />
                <span>ديسمبر ٢٠٢٤</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Projects;
