import Rawshe from "../assets/Rawshe.png";
import President from "../assets/munic-president.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faBullseye,
  faQuoteRight,
  faHelmetSafety,
  faCircleCheck,
  faMoneyBill,
  faPeopleGroup,
  faLocationDot,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
function Municipality() {
  return (
    <>
      <div className="relative w-full">
        <img src={Rawshe} alt="Rawshe Rock" className="w-full" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white ">
          <p className="text-7xl font-semibold mb-4">عن بلدية بيروت</p>
          <p className="text-xl">
            .تلتزم بلدية بيروت بتقديم أفضل الخدمات لتعزيز جودة الحياة في
            العاصمة، مع الحفاظ على إرثها التاريخي ودفعها نحو مستقبل رقمي مستدام
          </p>
        </div>
      </div>
      <div className="relative">
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-16 z-10 
                  flex flex-col md:flex-row-reverse gap-6 w-full px-4 justify-center"
        >
          <div className="border border-gray-200 text-right rounded-2xl p-6 bg-white shadow-lg w-full">
            <FontAwesomeIcon
              icon={faEye}
              className="mb-3 text-green-600 text-xl bg-indigo-100 pt-4 pb-4 pr-3 pl-3 rounded-lg"
            />
            <p className="text-2xl text-green-800">رؤيتنا</p>
            <p>
              أن تكون بيروت مدينة ذكية، مستدامة، ومركزاً عالمياً للثقافة
              والابتكار، حيث تتوفر للمواطنين بيئة حضرية متطورة تلبي تطلعاتهم
              وتفخر بجذورها التاريخية العريقة
            </p>
          </div>

          <div className="border border-gray-200 text-right rounded-2xl p-6 bg-white shadow-lg w-full gap-2">
            <FontAwesomeIcon
              icon={faBullseye}
              className="mb-3 text-green-600 text-xl bg-indigo-100 pt-4 pb-4 pr-3 pl-3 rounded-lg"
            />
            <p className="text-2xl text-green-800">رسالتنا</p>
            <p>
              "إن عملنا في بلدية بيروت لا يقتصر على الصيانة والخدمات، بل هو
              ميثاق بيننا وبين المواطنين لبناء عاصمة تليق بتاريخها وتفخر
              بمستقبلها. نحن نعمل يداً بيد مع كل حي، ومع كل مواطن، لضمان أن تظل
              بيروت منارة للشرق."
            </p>
          </div>
        </div>
      </div>
      <div className="mt-50 flex flex-row text-right bg-gray-100 p-20 gap-10 pl-200">
        <div className="flex flex-col gap-5">
          <p className="text-green-800 font-semibold">القيادة البلدية</p>
          <p className="text-4xl font-semibold">كلمة رئيس المجلس البلدي</p>
          <div className="w-150 ">
            <FontAwesomeIcon icon={faQuoteRight} className="text-2xl" />
          </div>
          <div>
            <p className="text-green-800 text-2xl font-semibold">
              المهندس إبراهيم حبيب زيدانر
            </p>
            <p>رئيس بلدية بيروت</p>
            <hr className="mt-5 mb-5" />
            <button className="w-50 h-12 bg-gray-100 mr-2 border border-green-800 text-green-800 hover:bg-gray-200 cursor-pointer rounded-lg">
              تواصل مع الرئيس
            </button>
            <button className="w-50 h-12 bg-green-900 ml-2 text-white hover:bg-green-800 cursor-pointer rounded-lg">
              تشكيل المجلس البلدي
            </button>
          </div>
        </div>
        <div>
          <img
            src={President}
            alt="Ibrahim Zaidan, Mayor Beirut"
            className="rounded-2xl"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center gap-5 m-20">
        <p className="text-4xl text-green-800 font-semibold">
          الهيكل الإداري والدوائر
        </p>
        <p>
          تعمل البلدية من خلال دوائر متخصصة تضمن الكفاءة في التنفيذ والمتابعة
          لجميع المهام البلدية والخدمية.
        </p>
      </div>
      <div className="flex flex-row-reverse text-right justify-center gap-6 mb-10">
        <div className="bg-gray-200 p-10 h-170 flex flex-col place-content-between w-150 rounded-xl">
          <div className="text-right">
            <FontAwesomeIcon icon={faHelmetSafety} className="text-green-800" />
            <p className="text-3xl font-semibold">الدائرة الهندسية</p>
            <p>
              مسؤولة عن التخطيط المدني، التراخيص، ومشاريع البنية التحتية وصيانة
              الطرق في العاصمة
            </p>
          </div>
          <div className="flex flex-col text-right ml-100 gap-2">
            <div className="flex flex-row justify-end">
              <p>رخص البناء</p>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-green-800 mt-1"
              />
            </div>
            <div className="flex flex-row justify-end">
              <p>تخطيط المدن</p>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-green-800 mt-1"
              />
            </div>
            <div className="flex flex-row justify-end">
              <p>صيانة الجسور</p>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-green-800 mt-1"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-220 gap-4">
          <div className=" bg-green-900 flex-1 flex flex-col justify-center p-10 rounded-xl gap-5 text-white">
            <p className=" text-3xl">دائرة الصحة والبيئة</p>
            <p>
              تعمل على ضمان سلامة الغذاء، نظافة المدينة، وزيادة المساحات الخضراء
              <br />
              في بيروت لبيئة صحية مستدامة
            </p>
          </div>
          <div className="flex flex-row-reverse flex-1 gap-4">
            <div className="flex-1 border border-gray-300 flex flex-col justify-center items-center text-center rounded-xl">
              <FontAwesomeIcon
                icon={faMoneyBill}
                className="text-2xl text-green-800"
              />
              <p className="font-semibold text-xl">الدائرة المالية</p>
              <p>.إدارة الرسوم والضرائب البلدية والموازنة السنوية</p>
            </div>
            <div className="flex-1 border border-gray-300 flex flex-col justify-center items-center text-center rounded-xl">
              <FontAwesomeIcon
                icon={faPeopleGroup}
                className="text-2xl text-green-800"
              />
              <p className="font-semibold text-xl">دائرة العلاقات العامة</p>
              <p>.جسر التواصل بين البلدية والمواطنين والجهات الخارجية</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 flex flex-row-reverse pr-20 pl-20 pt-10 pb-10">
        <div className="text-right">
          <p className="text-3xl text-green-800 pb-5 font-semibold">
            المقر الرئيسي
          </p>
          <p className="pb-5">
            . تفضلوا بزيارتنا في مقر بلدية بيروت التاريخي وسط المدينة، حيث نسعد
            باستقبال مراجعاتكم خلال ساعات العمل الرسمية
          </p>
          <div className="pb-5">
            وسط مدينة بيروت، منطقة الصنائع، لبنان
            <FontAwesomeIcon
              icon={faLocationDot}
              className="text-green-800 pl-1"
            />
          </div>
          <div>
            من الإثنين إلى الجمعة: 8:00 صباحاً - 2:00 ظهراً
            <FontAwesomeIcon icon={faClock} className="text-green-800 pl-1" />
          </div>
        </div>
        <div className="w-[70%] h-[300px] rounded-2xl overflow-hidden mx-auto">
          <iframe
            title="Beirut Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.6733763352954!2d35.5056869!3d33.8980649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f16e5d8201d59%3A0x7efe609f4a486c21!2sBeirut%20Municipality!5e0!3m2!1sen!2slb!4v1778751315680!5m2!1sen!2slb"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default Municipality;
