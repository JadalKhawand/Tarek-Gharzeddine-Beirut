import Background from "../assets/background-1.png";
import Muni from "../assets/muni.png";
import Solar from "../assets/solar.png";
import Garden from "../assets/garden-1.png";
import Bin from "../assets/bins.png";
import Water from "../assets/water.png";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faAngleLeft,
  faMoneyBill,
  faScrewdriverWrench,
  faHelmetSafety,
  faCircleInfo,
  faCalendarCheck,
  faCalendarPlus,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";
function News() {
  return (
    <>
      <div
        className="
    flex
    flex-col
    xl:flex-row-reverse
    gap-10
    xl:gap-16
    px-6
    md:px-12
    lg:px-20
    py-10
  "
      >
        {/* Main Featured News */}
        <div className="relative w-full xl:w-[65%] overflow-hidden rounded-2xl">
          <img
            src={Background}
            alt="Beirut from the position of the sea"
            className="
        w-full
        h-[350]
        md:h-[500]
        xl:h-full
        object-cover
      "
          />

          {/* Overlay */}
          <div
            className="
        absolute
        inset-0
        bg-linear-to-t
        from-green-900/80
        via-green-800/40
        to-transparent

        flex
        flex-col
        justify-end

        p-6
        md:p-10

        text-white
        text-right
        gap-5
      "
          >
            <div
              className="
          text-black
          bg-emerald-300
          w-fit
          px-4
          py-2
          md:text-sm
          text-xs
          font-semibold
          rounded-2xl
          self-end
        "
            >
              خبر عاجل
            </div>

            <p className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              إطلاق مشروع "بيروت الخضراء" لتشجير الساحات العامة
            </p>

            <p className="text-sm md:text-base leading-8 max-w-3xl hidden md:block">
              تعلن بلدية بيروت عن بدء المرحلة الأولى من مشروع التحريج الحضري
              الشامل، بهدف زيادة المساحات الخضراء وتحسين جودة الهواء في مختلف
              أحياء المدينة
            </p>

            <div className="flex flex-row-reverse items-center gap-6 flex-wrap">
              <button
                className="
            text-green-800
            bg-white
            px-6
            py-2
            rounded-2xl
            cursor-pointer
            hover:bg-gray-200
            transition
          "
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                اقرأ المزيد
              </button>

              <p>١٤ مايو ٢٠٢٤</p>
            </div>
          </div>
        </div>

        {/* Side News Cards */}
        <div className="flex xl:flex-col flex-wrap gap-5 w-full xl:w-[35%]">
          {/* Card */}
          <div
            className="
        flex
        flex-row-reverse
        items-center
        p-4
        md:p-5
        border
        border-gray-200
        rounded-2xl
        text-right
        gap-4
        transition
        hover:bg-gray-100
        hover:shadow-xl
        hover:-translate-y-1
        cursor-pointer
        w-full md:w-[48%] xl:w-full
      "
          >
            <img
              src={Muni}
              alt="municipality photo"
              className="w-24 h-24 object-cover rounded-xl"
            />

            <div className="flex flex-col justify-center gap-2">
              <p className="text-green-700 font-semibold">تحديثات إدارية</p>

              <p className="leading-7">%رقمنة المعاملات العقارية بنسبة ٩٠</p>
            </div>
          </div>

          {/* Card */}
          <div
            className="
        flex
        flex-row-reverse
        items-center
        p-4
        md:p-5
        border
        border-gray-200
        rounded-2xl
        text-right
        gap-4
        transition
        hover:bg-gray-100
        hover:shadow-xl
        hover:-translate-y-1
        cursor-pointer
        w-full md:w-[48%] xl:w-full
      "
          >
            <img
              src={Solar}
              alt="solar lights"
              className="w-24 h-24 object-cover rounded-xl"
            />

            <div className="flex flex-col justify-center gap-2">
              <p className="text-green-700 font-semibold">بيئة واستدامة</p>

              <p className="leading-7">
                تركيب أعمدة إنارة ذكية تعمل بالطاقة الشمسية
              </p>
            </div>
          </div>

          {/* Card */}
          <div
            className="
        flex
        flex-row-reverse
        items-center
        p-4
        md:p-5
        border
        border-gray-200
        rounded-2xl
        text-right
        gap-4
        transition
        hover:bg-gray-100
        hover:shadow-xl
        hover:-translate-y-1
        cursor-pointer
        w-full md:w-[48%] xl:w-full
      "
          >
            <img
              src={Garden}
              alt="garden"
              className="w-24 h-24 object-cover rounded-xl"
            />

            <div className="flex flex-col justify-center gap-2">
              <p className="text-green-700 font-semibold">نشاطات مجتمعية</p>

              <p className="leading-7">
                افتتاح حديقة "الصنوبر" بعد إعادة تأهيلها
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:mx-20 m-5">
        <div className="flex flex-row-reverse place-content-between border-r-4 border-r-green-900 px-5 h-10 items-center ">
          <p className="md:text-3xl text-xl font-semibold text-green-900">
            آخر التعاميم والإعلانات
          </p>
          <div className="flex flex-row-reverse text-green-900 items-center">
            <p>عرض الكل</p>
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
        </div>
        <div className="flex flex-row-reverse flex-wrap place-content-center gap-5 my-10">
          <div className="border border-gray-300 flex flex-col text-right w-80 p-5 gap-5 rounded-2xl transition hover:bg-gray-100 hover:shadow-xl delay-100 ease-in-out hover:-translate-y-1 hover:scale-110">
            <div className="flex flex-row-reverse place-content-between">
              <FontAwesomeIcon
                icon={faMoneyBill}
                className="bg-indigo-300/35 px-2 py-1 rounded-md text-green-800"
              />
              <p className="text-gray-400">١٢ مايو ٢٠٢٤</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">
                تمديد مهلة دفع الرسوم البلدية السنوية
              </p>
              <p>
                تعلن البلدية عن تمديد مهلة تسديد الرسوم دون غرامات تأخير حتى
                نهاية الشهر القادم لتسهيل أمور
              </p>
            </div>
            <div className="flex flex-row-reverse items-center text-green-700 justify-end hover:text-green-900 cursor-pointer font-semibold">
              <p>التفاصيل</p>
              <FontAwesomeIcon icon={faAngleLeft} />
            </div>
          </div>
          <div className="border border-gray-300 flex flex-col text-right w-80 p-5 gap-5 rounded-2xl transition hover:bg-gray-100 hover:shadow-xl delay-100 ease-in-out hover:-translate-y-1 hover:scale-110">
            <div className="flex flex-row-reverse place-content-between">
              <FontAwesomeIcon
                icon={faScrewdriverWrench}
                className="bg-indigo-300/35 px-2 py-1 rounded-md text-green-800"
              />
              <p className="text-gray-400">١٠ مايو ٢٠٢٤</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">صيانة الطرق في منطقة الأشرفية</p>
              <p>
                نلفت انتباه المواطنين إلى وجود أعمال صيانة وتعبيد للطرقات
                الرئيسية ابتداءً من ليل الغد
              </p>
            </div>
            <div className="flex flex-row-reverse items-center text-green-700 justify-end hover:text-green-900 cursor-pointer font-semibold">
              <p>التفاصيل</p>
              <FontAwesomeIcon icon={faAngleLeft} />
            </div>
          </div>
          <div className="border border-gray-300 flex flex-col text-right w-80 p-5 gap-5 rounded-2xl transition hover:bg-gray-100 hover:shadow-xl delay-100 ease-in-out hover:-translate-y-1 hover:scale-110">
            <div className="flex flex-row-reverse place-content-between">
              <FontAwesomeIcon
                icon={faHelmetSafety}
                className="bg-indigo-300/35 px-2 py-1 rounded-md text-green-800"
              />
              <p className="text-gray-400">٠٨ مايو ٢٠٢٤</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">مناقصة عامة لتوريد آليات النظافة</p>
              <p>
                تعلن مديرية الهندسة عن طرح مناقصة عامة لتحديث أسطول آليات جمع
                النفايات في بيروت
              </p>
            </div>
            <div className="flex flex-row-reverse items-center text-green-700 justify-end hover:text-green-900 cursor-pointer font-semibold">
              <p>التفاصيل</p>
              <FontAwesomeIcon icon={faAngleLeft} />
            </div>
          </div>
          <div className="border border-gray-300 flex flex-col text-right w-80 p-5 gap-5 rounded-2xl transition hover:bg-gray-100 hover:shadow-xl delay-100 ease-in-out hover:-translate-y-1 hover:scale-110">
            <div className="flex flex-row-reverse place-content-between">
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="bg-indigo-300/35 px-2 py-1 rounded-md text-green-800"
              />
              <p className="text-gray-400">٠٥ مايو ٢٠٢٤</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">
                إطلاق التطبيق الذكي الجديد للبلدية
              </p>
              <p>
                يمكنكم الآن تحميل تطبيق "بيروت الرقمية" لمتابعة معاملاتكم وتقديم
                البلاغات بسهولة
              </p>
            </div>
            <div className="flex flex-row-reverse items-center text-green-700 justify-end hover:text-green-900 cursor-pointer font-semibold">
              <p>التفاصيل</p>
              <FontAwesomeIcon icon={faAngleLeft} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex 2xl:flex-row-reverse flex-col items-center xl:m-20 my-10 gap-10">
        <div className="flex flex-col border border-gray-300 p-5 rounded-2xl flex-1 w-[60%] gap-5">
          <div className="flex flex-row-reverse md:text-3xl text-xl font-semibold gap-4 items-center text-green-900">
            <FontAwesomeIcon
              icon={faCalendarCheck}
              className="text-green-800"
            />
            <p>الفعاليات القادمة</p>
          </div>
          <div className="flex md:flex-row-reverse flex-col p-5 gap-10 flex-1 justify-between items-center rounded-2xl transition hover:bg-gray-100 hover:shadow-xl delay-100 ease-in-out hover:-translate-y-1 hover:scale-100">
            <div className="flex flex-col bg-green-700 text-emerald-300 font-semibold px-6 py-3 text-center rounded-2xl">
              <p>٢٥</p>
              <p>مايو</p>
            </div>
            <div className="flex flex-col text-lg text-right gap-2 ">
              <p className="font-semibold">مهرجان الزهور السنوي في وسط بيروت</p>
              <p>ساحة النجمة - من الساعة ١٠ صباحاً</p>
            </div>
            <div className="place-content-center text-3xl text-green-600 ">
              <FontAwesomeIcon icon={faCalendarPlus} />
            </div>
          </div>
          <hr className="m-5 text-gray-300" />
          <div className="flex md:flex-row-reverse flex-col  p-5 gap-10 flex-1 justify-between items-center rounded-2xl transition hover:bg-gray-100 hover:shadow-xl delay-100 ease-in-out hover:-translate-y-1 hover:scale-100">
            <div className="flex flex-col bg-indigo-200 text-green-800 font-semibold px-6 py-3 text-center rounded-2xl ">
              <p>٠٢</p>
              <p>يونيو</p>
            </div>
            <div className="flex flex-col text-lg text-right gap-2 ">
              <p className="font-semibold">يوم "بلا سيارات" في شوارع الجميزة</p>
              <p>شارع غورو - يوم كامل من النشاطات</p>
            </div>
            <div className="place-content-center text-3xl text-green-600 ">
              <FontAwesomeIcon icon={faCalendarPlus} />
            </div>
          </div>
          <hr className="m-5 text-gray-300" />
          <div className="flex md:flex-row-reverse flex-col p-5 gap-10 flex-1 justify-between items-center rounded-2xl transition hover:bg-gray-100 hover:shadow-xl delay-100 ease-in-out hover:-translate-y-1 hover:scale-100">
            <div className="flex flex-col bg-indigo-200 text-green-800 font-semibold px-6 py-3 text-center rounded-2xl">
              <p>١٥</p>
              <p>يونيو</p>
            </div>
            <div className="flex flex-col text-lg text-right gap-2 ">
              <p className="font-semibold">ورشة عمل: ريادة الأعمال للشباب</p>
              <p>مبنى البلدية المركزي - قاعة المؤتمرات</p>
            </div>
            <div className="place-content-center text-3xl text-green-600 ">
              <FontAwesomeIcon icon={faCalendarPlus} />
            </div>
          </div>
        </div>
        <div className="bg-gray-200 flex flex-col right-0 p-5 rounded-2xl border-2 border-gray-400 flex-1 sm:w-[65%] m-5 gap-10">
          <div className="flex flex-row-reverse items-center gap-3">
            <FontAwesomeIcon
              icon={faBullhorn}
              className="text-xl text-green-700"
            />
            <p className="md:text-3xl text-xl font-semibold">حملات التوعية</p>
          </div>
          <div className="flex md:flex-row-reverse flex-col gap-4 ">
            <div className="flex flex-col flex-1 p-4 bg-white border-2 border-gray-400 rounded-2xl text-right gap-3 transition hover:bg-gray-100 hover:shadow-xl delay-100 ease-in-out hover:-translate-y-1 hover:scale-100">
              <img src={Bin} alt="Recycle bin" />
              <p className="text-xl text-green-700">بيروت تفرز</p>
              <p>حملة شاملة لفرز النفايات من المصدر في كافة الوحدات السكنية</p>
              <div className="text-lg text-green-800 font-semibold flex flex-row-reverse items-center cursor-pointer">
                <p>تعرف على الطريقة</p>
                <p className="font-bold">←</p>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-4 bg-white border-2 border-gray-400 rounded-2xl text-right gap-3 transition hover:bg-gray-100 hover:shadow-xl delay-100 ease-in-out hover:-translate-y-1 hover:scale-100">
              <img src={Water} alt="Recycle bin" />
              <p className="text-xl text-green-700">وفر في المياه</p>
              <p>نصائح عملية لترشيد استهلاك المياه في فصل الصيف الحار</p>
              <div className="text-lg text-green-800 font-semibold flex flex-row-reverse items-center cursor-pointer">
                <p>نصائح التوفير</p>
                <p className="font-bold">←</p>
              </div>
            </div>
          </div>
          <div className="bg-green-900 flex md:flex-row-reverse flex-col text-right p-5 place-content-between items-center rounded-2xl">
            <div className="text-white">
              <p className="text-xl">هل لديك بلاغ؟</p>
              <p>.ساهم في تحسين مدينتنا وابلغ عن أي عطل</p>
            </div>
            <div className="bg-white text-green-800 rounded-lg py-2 px-5 cursor-pointer hover:bg-gray-100">
              <p>ابلغ الآن</p>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default News;
