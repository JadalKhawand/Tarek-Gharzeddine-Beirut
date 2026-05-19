import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faCubes, faRecycle } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <>
      <div className="bg-green-800 h-1"></div>
      <div className="bg-gray-100 p-10 px-15 flex md:flex-row-reverse flex-wrap text-right md:place-content-between border-b place-content-center gap-15 border-gray-300">
        {/* بلدية بيروت */}
        <div className="flex flex-col w-52 gap-3 text-green-900 ">
          <p className="text-base font-semibold">بلدية بيروت</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            نحن في بلدية بيروت ملتزمون بخدمة مواطنينا وبناء مستقبل العاصمة
            اللبنانية بكل نزاهة وابتكار
          </p>
          <div className="flex flex-row-reverse gap-4 text-green-800 text-xl">
            <FontAwesomeIcon icon={faMedal} className="hover:text-green-600 cursor-pointer" />
            <FontAwesomeIcon icon={faCubes} className="hover:text-green-600 cursor-pointer" />
            <FontAwesomeIcon icon={faRecycle} className="hover:text-green-600 cursor-pointer" />
          </div>
        </div>

        {/* روابط سريعة 1 */}
        <div className="flex flex-col w-44 gap-3 text-green-900">
          <p className="text-base font-semibold">روابط سريعة</p>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <p className="hover:text-green-700 cursor-pointer">الخدمات البلدية</p>
            <p className="hover:text-green-700 cursor-pointer">بوابة الشفافية</p>
            <p className="hover:text-green-700 cursor-pointer">إعلانات عامة</p>
            <p className="hover:text-green-700 cursor-pointer">المناقصات والمزايدات</p>
          </div>
        </div>

        {/* روابط سريعة 2 */}
        <div className="flex flex-col w-44 gap-3 text-green-900">
          <p className="text-base font-semibold">روابط سريعة</p>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <p className="hover:text-green-700 cursor-pointer">رئيس البلدية والمجلس البلدي</p>
            <p className="hover:text-green-700 cursor-pointer">الخطة الاستراتيجية 2025</p>
            <p className="hover:text-green-700 cursor-pointer">الوظائف والمهن</p>
            <p className="hover:text-green-700 cursor-pointer">معلومات التواصل</p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col w-52 gap-3 text-green-900">
          <p className="text-base font-semibold">روابط سريعة</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            ابقوا على اطلاع بآخر التحديثات البلدية والمشاريع المجتمعية
          </p>
          <div className="flex flex-row-reverse h-10 items-center">
            <input
              type="text"
              placeholder="البريد الإلكتروني"
              className="flex-1 border border-green-600 text-right text-sm h-full px-2 bg-white rounded-r-md outline-none focus:ring-1 focus:ring-green-500"
            />
            <button className="bg-green-900 h-full px-4 text-white text-sm hover:bg-green-700 transition rounded-l-md cursor-pointer whitespace-nowrap">
              انضمام
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-row-reverse md:place-content-between place-content-center px-20 py-5 bg-gray-100 text-sm text-green-900">
        <div>.2024 بلدية بيروت. جميع الحقوق محفوظة ©</div>
        <div className=" flex-row-reverse gap-6 hidden md:flex">
          <p className="hover:text-green-600 cursor-pointer">سياسة الخصوصية</p>
          <p className="hover:text-green-600 cursor-pointer">شروط الخدمة</p>
          <p className="hover:text-green-600 cursor-pointer">إمكانية الوصول</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
