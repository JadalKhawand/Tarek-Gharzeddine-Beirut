import BeirutMain from "../assets/beirut-main.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faCompassDrafting,
  faNewspaper,
  faTriangleExclamation,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
function Mainpage() {
  return (
    <>
      <div className="align-center m-auto text-center mt-10 flex flex-col bg-linear-to-t from-blue-600 to-white">
        <h1 className="text-6xl font-bold text-green-800 mb-10">بلدية بيروت</h1>
        <h3 className="text-xl text-green-700">
          .نحو مدينة ذكية ومستدامة توفر أرقى الخدمات الرقمية لمواطنيها، بكل
          شفافية وسهولة في الوصول
        </h3>
        <img src={BeirutMain} alt="Beirut Main" className="w-ful " />
      </div>
      <div className="flex flex-col h-30 bg-green-700"></div>
      <div className="m-10 text-center flex flex-col gap-3">
        <p className="text-green-700 font-semibold">التحول الرقمي</p>
        <p className="text-3xl font-semibold">رؤية بيروت للمستقبل</p>
        <p>
          نحن في بلدية بيروت نؤمن بأن التكنولوجيا هي المفتاح لتحسين جودة الحياة
          تهدف منصتنا الرقمية الجديدة إلى تبسيط
          <br /> الإجراءات الإدارية، وتعزيز التواصل المباشر بين المواطن
          والإدارة، وضمان الشفافية الكاملة في جميع المعاملات
          <br />. والمشاريع البلدية
        </p>
      </div>
      <div className="flex flex-row-reverse gap-15 place-content-center mb-10">
        <div className="border-2 w-50 h-40 place-content-center flex flex-col items-center rounded-2xl border-gray-200">
          <FontAwesomeIcon
            icon={faFileLines}
            className="bg-gray-200 pl-4 pr-4 pt-5 pb-5 rounded-xl mb-3 text-green-600 text-xl"
          />
          <p className="font-semibold">المعاملات</p>
        </div>
        <div className="border-2 w-50 h-40 place-content-center flex flex-col items-center rounded-2xl border-gray-200">
          <FontAwesomeIcon
            icon={faCompassDrafting}
            className="bg-gray-200 pl-4 pr-4 pt-5 pb-5 rounded-xl mb-3 text-green-600 text-xl"
          />
          <p className="font-semibold">المشاريع</p>
        </div>
        <div className="border-2 w-50 h-40 place-content-center flex flex-col items-center rounded-2xl border-gray-200">
          <FontAwesomeIcon
            icon={faNewspaper}
            className="bg-gray-200 pl-4 pr-4 pt-5 pb-5 rounded-xl mb-3 text-green-600 text-xl"
          />
          <p className="font-semibold">الأخبار</p>
        </div>
        <div className="border-2 w-50 h-40 place-content-center flex flex-col items-center rounded-2xl border-gray-200">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="bg-gray-200 pl-4 pr-4 pt-5 pb-5 rounded-xl mb-3 text-green-600 text-xl"
          />
          <p className="font-semibold">الشكاوى</p>
        </div>
        <div className="border-2 w-50 h-40 place-content-center flex flex-col items-center rounded-2xl border-gray-200">
          <FontAwesomeIcon
            icon={faMoneyBill}
            className="bg-gray-200 pl-4 pr-4 pt-5 pb-5 rounded-xl mb-3 text-green-600 text-xl"
          />
          <p className="font-semibold">الدفع الإلكتروني</p>
        </div>
      </div>
      
    </>
  );
}

export default Mainpage;
