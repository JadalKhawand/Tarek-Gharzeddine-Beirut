import Beirut from "../assets/city/beirut-pic.png";
import Background from "../assets/city/background-2.png";
import Olive from "../assets/city/olivegarden.png";
import Futur from "../assets/city/futur.png";
import CompAct1 from "../assets/city/comp/compact1.png";
import CompAct2 from "../assets/city/comp/compact2.png";
import CompAct3 from "../assets/city/comp/compact3.png";
import CompAct4 from "../assets/city/comp/compact4.png";
import CompAct5 from "../assets/city/comp/compact5.png";
import CompAct6 from "../assets/city/comp/compact6.png";
import FuturAct1 from "../assets/city/future/futuract1.png";
import FuturAct2 from "../assets/city/future/futuract2.png";
import FuturAct3 from "../assets/city/future/futuract3.png";
import FuturAct4 from "../assets/city/future/futuract4.png";
import FuturAct5 from "../assets/city/future/futuract5.png";
import FuturAct6 from "../assets/city/future/futuract6.png";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
  faArrowLeft,
  faBell,
  faLeaf,
  faGaugeSimpleHigh,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

type Tab = "الحالية" | "المكتملة" | "المستقبلية";

// ── الحالية data ──────────────────────────────────────────────────────────────
const currentData = {
  featured: {
    title: "مشروع الحافلات الذكية السريعة",
    desc: "يهدف المشروع إلى توفير شبكة نقل متكاملة تغطي كافة أحياء العاصمة مع محطات ذكية تعمل بالطاقة الشمسية لتقليل الازدحام المروري وتحسين جودة الهواء",
    tag: "تطوير النقل الحضري",
    progress: 75,
    link: "https://www.mtv.com.lb/news/1698449",
    team: ["م", "ع", "+٤"],
    img: Futur,
  },
  small: {
    title: "تأهيل الحدائق العامة",
    desc: "إعادة ترميم ٥ حدائق كبرى في المدينة بمرافق ترفيهية",
    tag: "البيئة والاستدامة",
    progress: 40,
    img: Olive,
    link: "https://www.facebook.com/beirutmunicipality",
  },
  cards: [
    {
      title: "بوابة الخدمات الموحدة",
      desc: "أتمتة كاملة المعاملات البلدية لتصبح إلكترونية بالكامل",
      tag: "التحول الرقمي",
      progress: 15,
    },
    {
      title: "إنارة الشوارع الذكية",
      desc: "تطبيق نظام إنارة LED ذكي يعمل بالحساسات لتقليل استهلاك الطاقة بنسبة ٦٠٪",
      tag: "البنية التحتية",
      date: "ديسمبر ٢٠٢٤",
      location: "كافة أحياء بيروت",
      highlight: "90%",
    },
  ],
};

// ── Grid card type ────────────────────────────────────────────────────────────
interface GridProject {
  title: string;
  desc: string;
  tag: string; // 👈 added
  date: string;
  img: string;
  link: string;
  badge: string;
}

// ── المكتملة data ─────────────────────────────────────────────────────────────
const completedProjects: GridProject[] = [
  {
    title: "تحديث المكتبة الوطنية الرقمية",
    desc: "تحويل المكتبة الوطنية إلى مركز ثقافي رقمي متكامل بالحواسيب واللوحات التفاعلية",
    tag: "التحول الرقمي",
    date: "يناير ٢٠٢٤",
    img: CompAct3,
    link: "https://www.annahar.com",
    badge: "مكتمل",
  },
  {
    title: "مشروع الإنارة الشمسية الذكية",
    desc: "تركيب ٦٠٠ وحدة إنارة ذكية تعمل بالطاقة الشمسية في الشوارع الرئيسية وتقليل التلوث",
    tag: "الطاقة",
    date: "فبراير ٢٠٢٣",
    img: CompAct2,
    link: "https://www.annahar.com",
    badge: "مكتمل",
  },
  {
    title: "تأهيل حديقة الصنائع العامة",
    desc: "تحديث المرافق الترفيهية والإنارة وإعادة تصميم المسارات الداخلية وتطوير نظام الإنارة",
    tag: "البيئة",
    date: "يونيو ٢٠٢٣",
    img: CompAct1,
    link: "https://www.annahar.com",
    badge: "مكتمل",
  },
  {
    title: "تطوير شبكة الصرف الصحي",
    desc: "توسعة وتحديث شبكة تصريف مياه الأمطار لتغطية المناطق المقصرة في معالجة فيضانات الشتاء",
    tag: "البنية التحتية",
    date: "ديسمبر ٢٠٢٣",
    img: CompAct6,
    link: "https://thebadil.com",
    badge: "مكتمل",
  },
  {
    title: "مركز الفرز الذكي للنفايات",
    desc: "إنشاء منشأة متطورة لفرز النفايات لتحسين معدلات إعادة التدوير في أحياء بيروت",
    tag: "الاستدامة",
    date: "فبراير ٢٠٢٣",
    img: CompAct5,
    link: "https://www.annahar.com",
    badge: "مكتمل",
  },
  {
    title: "ترميم الأبنية التراثية - المرحلة أ",
    desc: "مشروع الحفاظ على الهوية المعمارية لبيروت من خلال ترميم ١٢ مبنى تراثياً في أحياء مختلفة",
    tag: "التراث",
    date: "أكتوبر ٢٠٢٢",
    img: CompAct4,
    link: "https://www.annahar.com",
    badge: "مكتمل",
  },
];

// ── المستقبلية data ───────────────────────────────────────────────────────────
const futureProjects: GridProject[] = [
  {
    title: "شبكة الحافلات الكهربائية",
    desc: "إطلاق أول أسطول من الحافلات الكهربائية على مستوى المدينة لدعم التنقل المستدام",
    tag: "النقل",
    date: "تاريخ البدء المتوقع: خريف ٢٠٢٥",
    img: FuturAct3,
    link: "",
    badge: "قريباً",
  },
  {
    title: "تطوير الواجهة البحرية",
    desc: "مشروع تطوير الكورنيش يتضمن مسارات للدراجات، أرصفة مرممة ومناطق خضراء متكاملة",
    tag: "التطوير الحضري",
    date: "تاريخ البدء المتوقع: يناير ٢٠٢٥",
    img: FuturAct2,
    link: "",
    badge: "قريباً",
  },
  {
    title: "نظام التحكم الذكي بالمرور",
    desc: "دمج تقنيات الذكاء الاصطناعي لتحليل حركة المرور وتقليل الازدحام في المقاطعات الكبرى بنسبة 30%",
    tag: "البنية التحتية",
    date: "تاريخ البدء المتوقع: الربع الثاني ٢٠٢٥",
    img: FuturAct1,
    link: "",
    badge: "قريباً",
  },
  {
    title: "إدارة النفايات الذكية",
    desc: "نظام ذكي لحاويات مزودة بحساسات لمراقبة مستوى الامتلاء وتحسين مسارات الجمع",
    tag: "الاستدامة",
    date: "تاريخ البدء المتوقع: منتصف ٢٠٢٥",
    img: FuturAct6,
    link: "",
    badge: "قريباً",
  },
  {
    title: "حي الطاقة المتجددة",
    desc: "مشروع لتحويل الإنارة العامة والمباني الحكومية للعمل بالطاقة الشمسية والطاقة المتجددة بالكامل",
    tag: "الطاقة",
    date: "تاريخ البدء المتوقع: ديسمبر ٢٠٢٤",
    img: FuturAct5,
    link: "",
    badge: "قريباً",
  },
  {
    title: "مركز بيروت الرقمي للمواطن",
    desc: "إنشاء مركز انتاج لتقديم جميع الخدمات البلدية الرقمية وتعزيز المشاركة المجتمعية الفعالة",
    tag: "التحول الرقمي",
    date: "تاريخ البدء المتوقع: مايو ٢٠٢٦",
    img: FuturAct4,
    link: "",
    badge: "قريباً",
  },
];

// ── Shared styles ─────────────────────────────────────────────────────────────
const tabColors: Record<Tab, string> = {
  الحالية: "bg-green-800 text-white",
  المكتملة: "bg-green-800 text-white",
  المستقبلية: "bg-green-800 text-white",
};
const teamColors = [
  "bg-green-700",
  "bg-blue-500",
  "bg-orange-400",
  "bg-purple-500",
];
const badgeColors: Record<string, string> = {
  مكتمل: "bg-green-50 text-green-800",
  قريباً: "bg-green-50 text-green-700",
};

// ── Subscribe button (future projects only) ───────────────────────────────────
function SubscribeButton({
  project,
  initialSubscribed,
}: {
  project: GridProject;
  initialSubscribed: boolean;
}) {
  const { token } = useAuth();
  const [subscribed, setSubscribed] = useState(initialSubscribed); // 👈 starts as true if already subscribed
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/reminders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectTitle: project.title,
          projectTag: project.tag,
        }),
      });
      if (res.ok) setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSubscribe}
      disabled={subscribed || loading}
      className={`w-full text-center text-sm py-2 rounded-xl border transition flex items-center justify-center gap-2
        ${
          subscribed
            ? "border-green-300 bg-green-50 text-green-700 cursor-default"
            : "border-green-200 text-green-600 hover:bg-green-50 cursor-pointer"
        }`}
    >
      <FontAwesomeIcon icon={faBell} className="text-xs" />
      {loading ? "جاري..." : subscribed ? "✓ تم الاشتراك" : "اشترك للتحديثات"}
    </button>
  );
}

// ── Grid card ─────────────────────────────────────────────────────────────────
function GridCard({
  p,
  tab,
  isSubscribed,
}: {
  p: GridProject;
  tab: Tab;
  isSubscribed?: boolean;
}) {
  const isCompleted = tab === "المكتملة";
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col">
      <div className="relative">
        <img src={p.img} alt={p.title} className="w-full h-44 object-cover" />
        <span
          className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium ${badgeColors[p.badge]}`}
        >
          {p.badge}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
          <FontAwesomeIcon icon={faCalendarDays} />
          <span>{p.date}</span>
        </div>
        <h3 className="text-base font-bold text-gray-900 mb-1">{p.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
          {p.desc}
        </p>

        {isCompleted ? (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center text-sm py-2 rounded-xl border border-green-200 text-green-700 hover:bg-green-50 transition flex items-center justify-center gap-2 flex-row-reverse"
          >
            عرض التفاصيل
            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          </a>
        ) : (
          <SubscribeButton
            project={p}
            initialSubscribed={isSubscribed ?? false}
          />
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>("الحالية");
  const [email, setEmail] = useState("");
  const { token } = useAuth();
  const [subscribedTitles, setSubscribedTitles] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    if (activeTab === "المستقبلية" && token) {
      fetch("http://localhost:3000/reminders", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setSubscribedTitles(
            new Set(data.map((r: { projectTitle: string }) => r.projectTitle)),
          );
        })
        .catch(() => {});
    }
  }, [activeTab, token]);

  return (
    <div className="min-h-screen text-right">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl mx-4 md:mx-6 mt-6">
        <img
          src={Background}
          alt="بيروت"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-800/50" />
        <div className="relative z-10 flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-10">
          <div className="text-right text-white w-full lg:w-1/2 px-6 py-10 md:px-10 lg:px-0 lg:pr-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              مشاريع النهضة العمرانية
            </h1>
            <p className="text-green-100 text-sm md:text-base leading-8 max-w-xl">
              نعمل يداً بيد لبناء مدينة مستدامة، حديثة، وتنبض بالحياة من خلال
              سلسلة من المشاريع الإستراتيجية التي تستهدف تحسين جودة العيش في
              كافة أحياء العاصمة
            </p>
          </div>
          <div className="w-full lg:w-1/2 h-[250] md:h-[400] lg:h-[500] overflow-hidden">
            <img
              src={Beirut}
              alt="مبنى بيروت"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto my-10">
        {/* Tabs + stats bar */}
        <div className="flex md:flex-row flex-col-reverse items-center justify-between mb-6 mx-10 border border-gray-300 p-4 rounded-2xl bg-white gap-4">
          <div className="flex items-center flex-row-reverse gap-6 text-sm text-gray-600">
            <div className="flex flex-row-reverse items-center gap-1 font-semibold">
              <span className="text-gray-800 font-bold text-base">24</span>
              <span>مشروع نشط</span>
            </div>
            <div className="flex flex-row-reverse items-center gap-1 font-semibold">
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
                  ${activeTab === tab ? tabColors[tab] : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── الحالية ── */}
        {activeTab === "الحالية" && (
          <>
            <div className="flex xl:flex-row flex-col mx-10 gap-4 mb-4">
              {/* Small card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col flex-1">
                <div className="relative overflow-hidden">
                  <img
                    src={currentData.small.img}
                    alt={currentData.small.title}
                    className="w-full object-cover rounded-t-2xl"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className="self-end inline-block bg-green-50 text-green-800 text-xs px-3 py-1 rounded-full mb-2 border border-green-100">
                    {currentData.small.tag}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {currentData.small.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {currentData.small.desc}
                  </p>
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{currentData.small.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                      <div
                        className="bg-green-600 h-1.5 rounded-full"
                        style={{ width: `${currentData.small.progress}%` }}
                      />
                    </div>
                    <a
                      href={currentData.small.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full border border-gray-200 rounded-xl py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 transition block text-center"
                    >
                      عرض التحديثات
                    </a>
                  </div>
                </div>
              </div>

              {/* Featured card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col flex-2">
                <div className="relative overflow-hidden">
                  <img
                    src={currentData.featured.img}
                    alt={currentData.featured.title}
                    className="w-full object-cover rounded-t-2xl"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <span className="inline-block bg-green-50 text-green-800 text-xs px-3 py-1 rounded-full border border-green-100">
                      {currentData.featured.tag}
                    </span>
                    <div>
                      <span className="font-bold text-sm text-green-700">
                        {currentData.featured.progress}%
                      </span>
                      <span className="text-gray-400 text-xs mr-1">
                        نسبة الإنجاز
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {currentData.featured.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {currentData.featured.desc}
                  </p>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                    <div
                      className="bg-green-600 h-1.5 rounded-full"
                      style={{ width: `${currentData.featured.progress}%` }}
                    />
                  </div>
                  <div className="flex flex-row-reverse items-center justify-between mt-auto">
                    <div className="flex -space-x-2 space-x-reverse">
                      {currentData.featured.team.map((t, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 rounded-full ${teamColors[i % teamColors.length]} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                    <a
                      href={currentData.featured.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row cursor-pointer items-center gap-1 text-green-700 text-sm font-medium hover:underline"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                      تفاصيل المشروع
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex xl:flex-row flex-col-reverse px-10 m-10 gap-4">
              <div className="bg-green-900 rounded-2xl p-5 flex flex-col justify-between text-white items-center text-center">
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    اقترح مشروعاً لحيّك
                  </h3>
                  <p className="text-green-200 text-sm leading-relaxed">
                    نحن نؤمن بأن المواطن هو الشريك الأول في التنمية. شاركنا
                    أفكارك لتحسين منطقتك
                  </p>
                </div>
                <button
                  type="button"
                  className="mt-4 bg-white text-green-900 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-green-50 transition w-fit cursor-pointer"
                >
                  تقديم اقتراح
                </button>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full border border-green-100 mb-3">
                    {currentData.cards[0].tag}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {currentData.cards[0].title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {currentData.cards[0].desc}
                  </p>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{currentData.cards[0].progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-green-600 h-1.5 rounded-full"
                      style={{ width: `${currentData.cards[0].progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-end gap-2 mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      {currentData.cards[1].title}
                    </span>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-green-700"
                    />
                  </div>
                  <p className="text-xs text-gray-400 text-right mb-3">
                    {currentData.cards[1].location}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {currentData.cards[1].desc}
                  </p>
                </div>
                <hr className="text-gray-300" />
                <div className="flex flex-row-reverse items-center justify-between">
                  <span className="font-bold text-lg text-green-700">
                    {currentData.cards[1].highlight}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="text-gray-400"
                    />
                    <span>{currentData.cards[1].date}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── المكتملة ── */}
        {activeTab === "المكتملة" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mx-10 mb-8">
              {completedProjects.map((p, i) => (
                <GridCard key={i} p={p} tab="المكتملة" />
              ))}
            </div>
            <div className="flex md:flex-row-reverse flex-col gap-4 mx-10 mb-10">
              <div className="bg-green-800 rounded-2xl p-6 text-white text-right flex-2">
                <h3 className="text-lg font-bold mb-1">بيروت في أرقام</h3>
                <p className="text-green-200 text-sm mb-4">
                  نظرة عامة على حجم الإنجازات خلال العام الحالي ٢٠٢٤
                </p>
                <div className="flex flex-row-reverse gap-8">
                  <div>
                    <p className="text-3xl font-bold">24</p>
                    <p className="text-green-300 text-sm">مشروع جاري</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">1800</p>
                    <p className="text-green-300 text-sm">فرصة عمل</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-200 rounded-2xl p-6 py-10 border border-gray-100 flex flex-col items-center justify-center flex-1 gap-2">
                <FontAwesomeIcon
                  className="text-4xl text-green-800"
                  icon={faLeaf}
                />
                <p className="text-4xl font-bold text-green-800">65%</p>
                <p className="text-gray-700 font-semibold text-sm mt-1">
                  مشاريع خضراء
                </p>
              </div>
              <div className="bg-blue-200 rounded-2xl p-6 py-10 border border-gray-100 flex flex-col items-center justify-center flex-1 gap-2">
                <FontAwesomeIcon
                  className="text-4xl text-green-800"
                  icon={faGaugeSimpleHigh}
                />
                <p className="text-4xl font-bold text-green-800">92%</p>
                <p className="text-gray-700 font-semibold text-sm mt-1">
                  نسبة الرضا
                </p>
              </div>
            </div>
          </>
        )}

        {/* ── المستقبلية ── */}
        {activeTab === "المستقبلية" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mx-10 mb-8">
              {futureProjects.map((p, i) => (
                <GridCard
                  key={i}
                  p={p}
                  tab="المستقبلية"
                  isSubscribed={subscribedTitles.has(p.title)} // 👈 add this
                />
              ))}
            </div>
            <div className="bg-green-900 rounded-2xl p-8 mx-10 mb-10 flex md:flex-row flex-col items-center justify-between gap-6">
              <div className="text-right text-white">
                <h3 className="text-xl font-bold mb-2">
                  كن جزءاً من مستقبل بيروت
                </h3>
                <p className="text-green-200 text-sm leading-relaxed max-w-md">
                  سجّل اهتمامك لتلقي دعوات للمشاركة في ورش العمل المجتمعية
                  والتحديثات حول المشاريع الكبرى
                </p>
              </div>
              <div className="flex sm:flex-row-reverse flex-col gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 md:w-64 px-4 py-2.5 rounded-xl text-right text-sm focus:outline-none bg-green-800 text-white placeholder-green-400 border border-green-700"
                />
                <button
                  type="button"
                  className="bg-white text-green-900 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-green-50 transition whitespace-nowrap cursor-pointer"
                >
                  انضم الآن
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Projects;
