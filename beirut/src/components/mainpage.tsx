import BeirutMain from "../assets/beirut-main.png";
import Card1 from "../assets/card1.png";
import Card2 from "../assets/card2.png";
import Card3 from "../assets/card3.png";
import { NavLink } from "react-router-dom";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faCompassDrafting,
  faNewspaper,
  faTriangleExclamation,
  faMoneyBill,
  faClock,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
const news = [
  {
    category: "المجتمع",
    categoryColor: "text-green-700",
    title: "افتتاح الحديقة العامة الجديدة في منطقة الحمرا",
    desc: 'ضمن مبادرة "بيروت الخضراء"، تم اليوم افتتاح مساحة ترفيهية متكاملة لخدمة أهالي المنطقة..',
    date: "٠٨ مايو ٢٠٢٤",
    readTime: "٤ دقائق قراءة",
    src: Card1,
  },
  {
    category: "تحول رقمي",
    categoryColor: "text-blue-600",
    title: "توسيع نطاق الخدمات الإلكترونية لتشمل رخص البناء",
    desc: "بإمكان المواطنين الآن تقديم ومتابعة طلبات رخص البناء والترميم إلكترونياً بالكامل..",
    date: "١٠ مايو ٢٠٢٤",
    readTime: "٣ دقائق قراءة",
    src: Card2,
  },
  {
    category: "تطوير حضري",
    categoryColor: "text-orange-500",
    title: "إطلاق خطة تأهيل الأحياء التراثية في وسط بيروت",
    desc: "تبدأ البلدية المرحلة الأولى من مشروع ترميم الواجهات التاريخية بالتعاون مع خبراء دوليين..",
    date: "١٢ مايو ٢٠٢٤",
    readTime: "٥ دقائق قراءة",
    src: Card3,
  },
];
function Mainpage() {
  return (
    <>
      <div className="align-center m-auto text-center mt-10 flex flex-col bg-linear-to-t from-blue-600 to-white">
        <h1 className="lg:text-6xl md:text-5xl text-2xl font-bold text-green-800 mb-10">
          بلدية بيروت
        </h1>
        <h3 className="md:text-xl text-green-700 text-lg">
          .نحو مدينة ذكية ومستدامة توفر أرقى الخدمات الرقمية لمواطنيها، بكل
          شفافية وسهولة في الوصول
        </h3>
        <img src={BeirutMain} alt="Beirut Main" className="w-ful " />
      </div>
      <div dir="rtl">
        {/* Top green bar */}
        <div className="h-1.5 bg-green-800" />

        {/* Vision section - dashed border box */}
        <div className="md:mx-16 mx-5 my-8 border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center flex flex-col gap-3">
          <p className="text-green-800 font-semibold text-sm">التحول الرقمي</p>
          <p className="text-3xl font-bold">رؤية بيروت للمستقبل</p>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
            نحن في بلدية بيروت نؤمن بأن التكنولوجيا هي المفتاح لتحسين جودة
            الحياة. تهدف منصتنا الرقمية الجديدة إلى تبسيط الإجراءات الإدارية،
            وتعزيز التواصل المباشر بين المواطن والإدارة، وضمان الشفافية الكاملة
            في جميع المعاملات والمشاريع البلدية.
          </p>
        </div>

        {/* Service icons */}
        <div className="flex md:flex-row-reverse flex-wrap items-center gap-5 place-content-center mb-10 px-10">
          {[
            { icon: faMoneyBill, label: "الدفع الإلكتروني", path: "/payments" },
            { icon: faTriangleExclamation, label: "الشكاوى", path: "/reports" },
            { icon: faNewspaper, label: "الأخبار", path: "/news" },
            { icon: faCompassDrafting, label: "المشاريع", path: "/projects" },
            { icon: faFileLines, label: "المعاملات", path: "/municipality" },
          ].map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className="border border-gray-200 w-44 h-36 place-content-center flex flex-col items-center rounded-2xl hover:shadow-md transition"
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="bg-gray-100 px-4 py-4 rounded-xl mb-3 text-green-600 text-xl"
              />
              <p className="font-semibold text-sm">{item.label}</p>
            </NavLink>
          ))}
        </div>
        {/* Stats bar */}
        <div className="flex md:flex-row-reverse flex-col gap-3 items-center bg-green-900 text-white place-content-center py-8 mb-10">
          {[
            { value: "92%", label: "رضا المواطنين" },
            { value: "24/7", label: "خدمات إلكترونية" },
            { value: "45k", label: "معاملة منجزة" },
            { value: "120+", label: "مشروع نشط" },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-2 px-16 py-2 text-right ${i < arr.length - 1 ? "md:border-r md:border-green-700" : ""}`}
            >
              <p className="text-4xl font-bold">{stat.value}</p>
              <p className="text-green-200 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* News section */}
        <div className="md:mx-40 mx-10 mb-16">
          {/* News header */}
          <div className="flex flex-row-reverse items-center justify-between mb-6">
            <a
              href="https://www.lebanonfiles.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row-reverse items-center gap-1 text-green-700 text-sm font-medium hover:underline cursor-pointer"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
              مشاهدة الكل
            </a>
            <div className="text-right flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-gray-900">آخر الأخبار</h2>
              <p className="text-sm text-gray-500">
                ابق على اطلاع بأحدث التطورات في المدينة
              </p>
            </div>
          </div>

          {/* News cards */}
          <div className="flex lg:flex-row flex-col gap-5 place-content-center">
            {news.map((article, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={article.src}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-4 text-right">
                  <p
                    className={`text-xs font-semibold mb-2 ${article.categoryColor}`}
                  >
                    {article.category}
                  </p>
                  <h3 className="font-bold text-gray-900 text-base leading-snug mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">
                    {article.desc}
                  </p>
                  <div className="flex items-center justify-end gap-3 text-xs text-gray-400">
                    <span>{article.date}</span>
                    <FontAwesomeIcon icon={faClock} />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Mainpage;
