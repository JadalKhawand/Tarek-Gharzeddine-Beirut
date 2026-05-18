import Rawshe from "../assets/Rawshe.png";
import President from "../assets/munic-president.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEye,
  faBullseye,
  faQuoteRight,
  faQuoteLeft,
  faHelmetSafety,
  faCircleCheck,
  faMoneyBill,
  faPeopleGroup,
  faLocationDot,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

function Municipality() {
  const cardClass =
    "border border-gray-200 rounded-2xl p-6 bg-white shadow-lg transition duration-300 hover:-translate-y-1";

  const sectionPadding = "px-6 md:px-12 lg:px-20";

  const engineeringServices = ["رخص البناء", "تخطيط المدن", "صيانة الجسور"];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full">
        <img
          src={Rawshe}
          alt="Rawshe Rock"
          className="w-full h-[350] md:h-[500] object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <p className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-4">
            عن بلدية بيروت
          </p>

          <p className="text-sm md:text-lg lg:text-xl max-w-4xl leading-8">
            .تلتزم بلدية بيروت بتقديم أفضل الخدمات لتعزيز جودة الحياة في
            العاصمة، مع الحفاظ على إرثها التاريخي ودفعها نحو مستقبل رقمي مستدام
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      {/* Vision & Mission */}
      <section className="relative">
        <div
          className="
      relative
      lg:absolute
      lg:left-1/2
      lg:-translate-x-1/2
      lg:-top-16
      z-10

      flex
      flex-col
      lg:flex-row-reverse

      items-center
      justify-center

      gap-6

      w-full
      max-w-7xl

      mx-auto
      px-6
      mt-10
      lg:mt-0
    "
        >
          <div className={`${cardClass} w-full max-w-2xl text-right`}>
            <FontAwesomeIcon
              icon={faEye}
              className="mb-3 text-green-600 text-xl bg-indigo-100 p-4 rounded-lg"
            />

            <p className="text-2xl text-green-800 font-semibold mb-3">رؤيتنا</p>

            <p className="leading-8 text-gray-700">
              أن تكون بيروت مدينة ذكية، مستدامة، ومركزاً عالمياً للثقافة
              والابتكار، حيث تتوفر للمواطنين بيئة حضرية متطورة تلبي تطلعاتهم
              وتفخر بجذورها التاريخية العريقة
            </p>
          </div>

          <div className={`${cardClass} w-full max-w-2xl text-right`}>
            <FontAwesomeIcon
              icon={faBullseye}
              className="mb-3 text-green-600 text-xl bg-indigo-100 p-4 rounded-lg"
            />

            <p className="text-2xl text-green-800 font-semibold mb-3">
              رسالتنا
            </p>

            <p className="leading-8 text-gray-700">
              توفير خدمات بلدية متميزة من خلال الشفافية والمساءلة، وتطوير البنى
              التحتية، وتعزيز الشراكة المجتمعية لضمان نمو متوازن وبيئة آمنة لكل
              القاطنين والزوار
            </p>
          </div>
        </div>
      </section>

      {/* President Section */}
      <section
        className={`
          mt-10 lg:mt-52
          bg-gray-100
          py-16
          ${sectionPadding}
        `}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-10">
          <div className="w-full lg:w-[40%]">
            <img
              src={President}
              alt="Ibrahim Zaidan, Mayor Beirut"
              className="rounded-2xl w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-5 text-right w-full lg:w-[60%]">
            <p className="text-green-800 font-semibold">القيادة البلدية</p>

            <p className="text-3xl md:text-4xl font-semibold">
              كلمة رئيس المجلس البلدي
            </p>

            <div className="flex flex-col">
              <FontAwesomeIcon
                icon={faQuoteRight}
                className="text-2xl self-end mb-3"
              />

              <p className="leading-8 text-gray-700 px-2">
                إن عملنا في بلدية بيروت لا يقتصر على الصيانة والخدمات، بل هو
                ميثاق بيننا وبين المواطنين لبناء عاصمة تليق بتاريخها وتفخر
                بمستقبلها. نحن نعمل يداً بيد مع كل حي، ومع كل مواطن، لضمان أن
                تظل بيروت منارة للشرق
              </p>

              <FontAwesomeIcon icon={faQuoteLeft} className="text-2xl mt-3" />
            </div>

            <div>
              <p className="text-green-800 text-2xl font-semibold">
                المهندس إبراهيم حبيب زيدان
              </p>

              <p className="text-gray-600">رئيس بلدية بيروت</p>
            </div>
          </div>
        </div>
      </section>

      {/* Administrative Structure */}
      <section className={`py-16 ${sectionPadding}`}>
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-5 mb-14">
          <p className="text-3xl md:text-4xl text-green-800 font-semibold">
            الهيكل الإداري والدوائر
          </p>

          <p className="text-gray-700 leading-8">
            تعمل البلدية من خلال دوائر متخصصة تضمن الكفاءة في التنفيذ والمتابعة
            لجميع المهام البلدية والخدمية.
          </p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-6">
          {/* Engineering */}
          <div
            className="
              bg-gray-200
              rounded-2xl
              p-8
              flex
              flex-col
              justify-between
              text-right
              w-full
              lg:w-[40%]
              min-h-[500]
            "
          >
            <div>
              <FontAwesomeIcon
                icon={faHelmetSafety}
                className="text-green-800 text-2xl mb-4"
              />

              <p className="text-2xl md:text-3xl font-semibold mb-4">
                الدائرة الهندسية
              </p>

              <p className="leading-8 text-gray-700">
                مسؤولة عن التخطيط المدني، التراخيص، ومشاريع البنية التحتية
                وصيانة الطرق في العاصمة
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              {engineeringServices.map((item) => (
                <div
                  key={item}
                  className="flex flex-row-reverse items-center gap-3"
                >
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-green-800"
                  />

                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Other Departments */}
          <div className="flex flex-col w-full lg:w-[60%] gap-4">
            <div
              className="
                bg-green-900
                text-white
                rounded-2xl
                p-10
                flex-1
                flex
                flex-col
                justify-center
                text-right
                gap-5
              "
            >
              <p className="text-2xl md:text-3xl font-semibold">
                دائرة الصحة والبيئة
              </p>

              <p className="leading-8 text-gray-200">
                تعمل على ضمان سلامة الغذاء، نظافة المدينة، وزيادة المساحات
                الخضراء في بيروت لبيئة صحية مستدامة
              </p>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-4 flex-1">
              <div
                className="
                  flex-1
                  border
                  border-gray-300
                  rounded-2xl
                  p-8
                  flex
                  flex-col
                  justify-center
                  items-center
                  text-center
                  gap-4
                "
              >
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  className="text-3xl text-green-800"
                />

                <p className="font-semibold text-xl">الدائرة المالية</p>

                <p className="text-gray-700 leading-7">
                  .إدارة الرسوم والضرائب البلدية والموازنة السنوية
                </p>
              </div>

              <div
                className="
                  flex-1
                  border
                  border-gray-300
                  rounded-2xl
                  p-8
                  flex
                  flex-col
                  justify-center
                  items-center
                  text-center
                  gap-4
                "
              >
                <FontAwesomeIcon
                  icon={faPeopleGroup}
                  className="text-3xl text-green-800"
                />

                <p className="font-semibold text-xl">دائرة العلاقات العامة</p>

                <p className="text-gray-700 leading-7">
                  .جسر التواصل بين البلدية والمواطنين والجهات الخارجية
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Headquarters */}
      <section className={`bg-gray-200 py-16 ${sectionPadding}`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-10 items-center">
          <div className="text-right w-full lg:w-[40%]">
            <p className="text-3xl text-green-800 pb-5 font-semibold">
              المقر الرئيسي
            </p>

            <p className="pb-5 leading-8 text-gray-700">
              .تفضلوا بزيارتنا في مقر بلدية بيروت التاريخي وسط المدينة، حيث نسعد
              باستقبال مراجعاتكم خلال ساعات العمل الرسمية
            </p>

            <div className="pb-5 flex flex-row-reverse items-center gap-2">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-green-800"
              />

              <p>وسط مدينة بيروت، منطقة الصنائع، لبنان</p>
            </div>

            <div className="flex flex-row-reverse items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="text-green-800" />

              <p>من الإثنين إلى الجمعة: 8:00 صباحاً - 2:00 ظهراً</p>
            </div>
          </div>

          <div className="w-full lg:w-[60%] h-[300] rounded-2xl overflow-hidden">
            <iframe
              title="Beirut Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.6733763352954!2d35.5056869!3d33.8980649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f16e5d8201d59%3A0x7efe609f4a486c21!2sBeirut%20Municipality!5e0!3m2!1sen!2slb!4v1778751315680!5m2!1sen!2slb"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Municipality;
