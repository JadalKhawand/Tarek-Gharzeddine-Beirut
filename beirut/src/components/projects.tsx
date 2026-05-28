import Beirut from "../assets/city/beirut-pic.png";
import Background from "../assets/city/background-2.png";
import Olive from "../assets/city/olivegarden.png";
import Futur from "../assets/city/futur.png";
import Secure from "../assets/city/secure.jpg";
import Metro from "../assets/city/metrobeirut.jpg";
import Port from "../assets/city/portbeirut.jpg";
import Comefrom from "../assets/city/watercomefrom.jpeg";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot, faCalendarDays, faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type Tab = "الحالية" | "المكتملة" | "المستقبلية";

const projectData: Record<Tab, {
  featured: { title: string; desc: string; tag: string; progress: number; link: string; team: string[]; img: string };
  small: { title: string; desc: string; tag: string; progress: number; img: string; link: string }[];
  cards: { title: string; desc: string; tag: string; progress?: number; date?: string; location?: string; highlight?: string }[];
}> = {
  "الحالية": {
    featured: {
      title: "مشروع الحافلات الذكية السريعة",
      desc: "يهدف المشروع إلى توفير شبكة نقل متكاملة تغطي كافة أحياء العاصمة مع محطات ذكية تعمل بالطاقة الشمسية لتقليل الازدحام المروري وتحسين جودة الهواء",
      tag: "تطوير النقل الحضري",
      progress: 75,
      link: "https://www.mtv.com.lb/news/1698449",
      team: ["م", "ع", "+٤"],
      img: Futur,
    },
    small: [
      { title: "تأهيل الحدائق العامة", desc: "إعادة ترميم ٥ حدائق كبرى في المدينة بمرافق ترفيهية", tag: "البيئة والاستدامة", progress: 40, img: Olive, link: "https://www.facebook.com/beirutmunicipality/posts/بعد-أن-أعطى-محافظ-مدينة-بيروت-القاضي-زياد-شبيب-أمر-المباشرة-بالعمل-بدأت-دائرة-ال/1059862714161029/" },
    ],
    cards: [
      { title: "بوابة الخدمات الموحدة", desc: "أتمتة كاملة المعاملات البلدية لتصبح إلكترونية بالكامل", tag: "التحول الرقمي", progress: 15 },
      { title: "إنارة الشوارع الذكية", desc: "تطبيق نظام إنارة LED ذكي يعمل بالحساسات لتقليل استهلاك الطاقة بنسبة ٦٠٪", tag: "البنية التحتية", date: "ديسمبر ٢٠٢٤", location: "كافة أحياء بيروت", highlight: "90%" },
    ],
  },
  "المكتملة": {
    featured: {
      title: "مشروع ترميم الواجهة البحرية",
      desc: "تم ترميم وتطوير الكورنيش البحري بالكامل بطول ٤ كيلومترات، شمل تجديد الأرصفة وإضاءة الطريق وزراعة الأشجار وإنشاء مناطق جلوس",
      tag: "التطوير الحضري",
      progress: 100,
      link: "https://www.annahar.com/lebanon/312163/رئاسة-الوزرا-تعلن-إزالة-المنشت-عن-واجهة-بيروت-البحرية",
      team: ["م", "س", "+٦"],
      img: Port,
    },
    small: [
      { title: "مشروع معالجة مياه الأمطار", desc: "إنشاء شبكة متكاملة لتصريف مياه الأمطار في أحياء الأشرفية والرمل", tag: "البنية التحتية", progress: 100, img: Comefrom, link: "https://thebadil.com/ar/investigations/here-we-flow-again-beirut-water-project-set-to-keep-taps-dry-and-debts-high/" },
    ],
    cards: [
      { title: "توسعة شبكة الصرف الصحي", desc: "تجديد وتوسعة شبكة الصرف الصحي في ١٢ حياً من أحياء بيروت", tag: "البنية التحتية", progress: 100 },
      { title: "مشروع حرش بيروت", desc: "إعادة تأهيل حرش بيروت وافتتاحه للعامة بعد عقود من الإغلاق", tag: "البيئة", date: "يونيو ٢٠٢٣", location: "منطقة الحرش", highlight: "100%" },
    ],
  },
  "المستقبلية": {
    featured: {
      title: "مشروع مترو بيروت",
      desc: "خط مترو حضري يربط المناطق الرئيسية في بيروت من الكولا حتى الجميزة، مع ١٢ محطة وطاقة استيعابية تفوق ٥٠٠ ألف راكب يومياً",
      tag: "النقل الاستراتيجي",
      progress: 8,
      link: "https://www.almodon.com/society/2016/01/30/منذ-48-سنة-مهندسون-سوفيات-فكّروا-بـمترو-بيروت",
      team: ["ب", "م", "+٨"],
      img: Metro,
    },
    small: [
      { title: "مدينة بيروت الذكية", desc: "تحويل بيروت إلى مدينة ذكية متكاملة بأنظمة مراقبة وإدارة مركزية", tag: "التحول الرقمي", progress: 5, img: Secure, link: "https://www.grandlb.com/politics/121394/" },
    ],
    cards: [
      { title: "مشروع الطاقة الشمسية البلدية", desc: "تزويد جميع المباني البلدية والإنارة العامة بالطاقة الشمسية بالكامل", tag: "الطاقة المستدامة", progress: 3 },
      { title: "متنزه بيروت المركزي", desc: "إنشاء أكبر متنزه حضري في بيروت بمساحة ١٢٠ ألف متر مربع وسط العاصمة", tag: "البيئة والترفيه", date: "٢٠٢٧", location: "وسط بيروت", highlight: "قريباً" },
    ],
  },
};

const tabColors: Record<Tab, string> = {
  "الحالية": "bg-green-800 text-white",
  "المكتملة": "bg-blue-700 text-white",
  "المستقبلية": "bg-orange-500 text-white",
};

const tagColors: Record<Tab, string> = {
  "الحالية": "bg-green-50 text-green-800 border-green-100",
  "المكتملة": "bg-blue-50 text-blue-800 border-blue-100",
  "المستقبلية": "bg-orange-50 text-orange-700 border-orange-100",
};

const progressColors: Record<Tab, string> = {
  "الحالية": "bg-green-600",
  "المكتملة": "bg-blue-600",
  "المستقبلية": "bg-orange-500",
};

const teamColors = ["bg-green-700", "bg-blue-500", "bg-orange-400", "bg-purple-500"];

function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>("الحالية");
  const data = projectData[activeTab];

  return (
    <div className="min-h-screen text-right">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl mx-4 md:mx-6 mt-6">
        <img src={Background} alt="بيروت" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-green-800/50" />
        <div className="relative z-10 flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-10">
          <div className="text-right text-white w-full lg:w-1/2 px-6 py-10 md:px-10 lg:px-0 lg:pr-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">مشاريع النهضة العمرانية</h1>
            <p className="text-green-100 text-sm md:text-base leading-8 max-w-xl">
              نعمل يداً بيد لبناء مدينة مستدامة، حديثة، وتنبض بالحياة من خلال سلسلة من المشاريع الإستراتيجية التي تستهدف تحسين جودة العيش في كافة أحياء العاصمة
            </p>
          </div>
          <div className="w-full lg:w-1/2 h-[250] md:h-[400] lg:h-[500] overflow-hidden">
            <img src={Beirut} alt="مبنى بيروت" className="h-full w-full object-cover object-top" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto my-10">
        {/* Tabs + stats bar */}
        <div className="flex md:flex-row flex-col-reverse items-center justify-between mb-6 mx-10 border border-gray-300 p-4 rounded-2xl bg-white gap-4">
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
            {(["الحالية", "المكتملة", "المستقبلية"] as Tab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-sm px-4 py-1.5 rounded-lg font-medium cursor-pointer transition
                  ${activeTab === tab
                    ? tabColors[tab]
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Top two cards */}
        <div className="flex xl:flex-row flex-col mx-10 gap-4 mb-4">
          {/* Small card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col flex-1">
            <div className="relative overflow-hidden">
              <img src={data.small[0].img} alt={data.small[0].title} className="w-full object-cover rounded-t-2xl" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <span className={`self-end inline-block text-xs px-3 py-1 rounded-full mb-2 border ${tagColors[activeTab]}`}>
                {data.small[0].tag}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{data.small[0].title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{data.small[0].desc}</p>
              <div className="mt-auto">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{data.small[0].progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                  <div className={`${progressColors[activeTab]} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${data.small[0].progress}%` }} />
                </div>
                <a href={data.small[0].link} target="_blank" rel="noopener noreferrer"
                  className="w-full border border-gray-200 rounded-xl py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 transition block text-center">
                  عرض التحديثات
                </a>
              </div>
            </div>
          </div>

          {/* Featured card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col flex-2">
            <div className="relative overflow-hidden">
              <img src={data.featured.img} alt={data.featured.title} className="w-full object-cover rounded-t-2xl" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-2">
                <span className={`inline-block text-xs px-3 py-1 rounded-full border ${tagColors[activeTab]}`}>
                  {data.featured.tag}
                </span>
                <div>
                  <span className={`font-bold text-sm ${activeTab === "الحالية" ? "text-green-700" : activeTab === "المكتملة" ? "text-blue-700" : "text-orange-500"}`}>
                    {data.featured.progress}%
                  </span>
                  <span className="text-gray-400 text-xs mr-1">نسبة الإنجاز</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{data.featured.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">{data.featured.desc}</p>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                <div className={`${progressColors[activeTab]} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${data.featured.progress}%` }} />
              </div>
              <div className="flex flex-row-reverse items-center justify-between mt-auto">
                <div className="flex -space-x-2 space-x-reverse">
                  {data.featured.team.map((t, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${teamColors[i % teamColors.length]} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                      {t}
                    </div>
                  ))}
                </div>
                <a href={data.featured.link} target="_blank" rel="noopener noreferrer"
                  className="flex flex-row cursor-pointer items-center gap-1 text-sm font-medium hover:underline"
                  style={{ color: activeTab === "الحالية" ? "#15803d" : activeTab === "المكتملة" ? "#1d4ed8" : "#ea580c" }}>
                  <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                  تفاصيل المشروع
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex xl:flex-row flex-col-reverse px-10 m-10 gap-4">
          {/* Suggest card */}
          <div className="bg-green-900 rounded-2xl p-5 flex flex-col justify-between text-white items-center text-center">
            <div>
              <h3 className="text-lg font-bold mb-2">اقترح مشروعاً لحيّك</h3>
              <p className="text-green-200 text-sm leading-relaxed">
                نحن نؤمن بأن المواطن هو الشريك الأول في التنمية. شاركنا أفكارك لتحسين منطقتك
              </p>
            </div>
            <button className="mt-4 bg-white text-green-900 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-green-50 transition w-fit cursor-pointer">
              تقديم اقتراح
            </button>
          </div>

          {/* Progress card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <span className={`inline-block text-xs px-3 py-1 rounded-full border mb-3 ${tagColors[activeTab]}`}>
                {data.cards[0].tag}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{data.cards[0].title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{data.cards[0].desc}</p>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{data.cards[0].progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className={`${progressColors[activeTab]} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${data.cards[0].progress}%` }} />
              </div>
            </div>
          </div>

          {/* Date/location card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-end gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-700">{data.cards[1].title}</span>
                <FontAwesomeIcon icon={faLocationDot} className={activeTab === "الحالية" ? "text-green-700" : activeTab === "المكتملة" ? "text-blue-700" : "text-orange-500"} />
              </div>
              <p className="text-xs text-gray-400 text-right mb-3">{data.cards[1].location}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{data.cards[1].desc}</p>
            </div>
            <hr className="text-gray-300" />
            <div className="flex flex-row-reverse items-center justify-between">
              <span className={`font-bold text-lg ${activeTab === "الحالية" ? "text-green-700" : activeTab === "المكتملة" ? "text-blue-700" : "text-orange-500"}`}>
                {data.cards[1].highlight}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <FontAwesomeIcon icon={faCalendarDays} className="text-gray-400" />
                <span>{data.cards[1].date}</span>
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