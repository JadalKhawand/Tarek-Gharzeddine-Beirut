import BeirutMain from "../assets/beirut-main.png";
import Ashrafieh from "../assets/city/ashrafieh.png";
import Hamra from "../assets/city/hamra.png";
import RasBeirut from "../assets/city/ras-beirut.png";
import Footer from "./footer";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faRoad,
  faShieldAlt,
  faParking,
  faPeopleGroup,
  faLocationDot,
  faRecycle,
  faMap,
} from "@fortawesome/free-solid-svg-icons";

function City() {
  return (
    <>
      <div className="bg-gray-50 md:px-25 py-10 text-right">
        {/* Header */}
        <div className=" mb-10">
          <h1 className="xl:text-5xl md:text-3xl text-2xl font-bold text-green-900 mb-3">
            أحياء العاصمة
          </h1>
          <p className="text-gray-500">
            استكشف أحياء مدينة بيروت العريقة، وتعرف على الخدمات البلدية المتوفرة
            والمشاريع القائمة لتعزيز جودة الحياة للمواطنين
          </p>
        </div>

        <div className="gap-4 h-full m-4 flex lg:flex-row flex-col">
          {/* Ashrafieh */}
          <div className="rounded-3xl overflow-hidden shadow-sm flex-1 flex flex-col">
            <div className="relative">
              <img
                src={Ashrafieh}
                alt="الأشرفية"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = BeirutMain;
                }}
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent" />
              <div className="absolute bottom-4 right-4 text-white">
                <p className="text-2xl font-bold">الأشرفية</p>
                <p className="text-sm text-gray-200">تراث وأناقة</p>
              </div>
            </div>
            <div className="bg-white p-4">
              <div className="flex flex-col gap-2 text-sm text-gray-700 mb-4">
                <div className="flex items-center gap-2 justify-end">
                  <span>مواقف ذكية متوفرة</span>
                  <FontAwesomeIcon
                    icon={faParking}
                    className="text-green-700"
                  />
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span>٣ حدائق عامة مطورة</span>
                  <FontAwesomeIcon icon={faLeaf} className="text-green-700" />
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Ashrafieh,Beirut"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-gray-300 rounded-xl py-2 text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer text-center block"
              >
                استكشاف الحي
              </a>
            </div>
          </div>

          {/* Hamra */}
          <div className="rounded-3xl overflow-hidden shadow-sm bg-white flex flex-col flex-3">
            <div className="relative h-64">
              <img
                src={Hamra}
                alt="الحمرا"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = BeirutMain;
                }}
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent" />
              <div className="absolute bottom-4 right-4 text-white">
                <p className="text-2xl font-bold">الحمرا</p>
                <p className="text-sm text-gray-200">القلب النابض لبيروت</p>
              </div>
            </div>
            <div className="flex flex-col gap-5 bg-white p-4">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                تشتهر الحمرا بتنوعها الثقافي ومراكزها التعليمية المرموقة، وتعتبر
                مركزاً تجارياً وثقافياً حيوياً يجمع بين الحداثة والتراث
              </p>
              <div className="flex items-center justify-between">
                <a
                  href="https://maps.google.com/?q=Hamra,Beirut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  استكشاف الحي
                </a>

                <div className="flex gap-2">
                  <span className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-600">
                    <FontAwesomeIcon
                      icon={faRecycle}
                      className="text-green-600"
                    />
                    النظافة: ممتاز
                  </span>
                  <span className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-600">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-green-600"
                    />
                    الإدارة: ٩٥٪
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex xl:flex-row flex-col gap-4 mb-4 px-4">
          {/* Ras Beirut - text left */}
          <div className="flex lg:flex-row flex-col-reverse">
            <div className="bg-white lg:rounded-l-3xl lg:rounded-r-none rounded-b-3xl rounded-t-none p-6 shadow-sm flex flex-col flex-1">
              <h2 className="text-2xl font-bold text-green-900 mb-2">
                رأس بيروت
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                المنطقة الساحلية الأبرز التي تضم الكورنيش البحري والجامعة
                الأمريكية في بيروت
              </p>
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2 justify-end">
                  <span>صيانة الكورنيش: يومي</span>
                  <FontAwesomeIcon icon={faRoad} className="text-green-700" />
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span>المراقبة الذكية: نشط</span>
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-green-700"
                  />
                </div>
                <a
                  href="https://maps.google.com/?q=Ras+Beirut,Beirut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-gray-300 rounded-xl py-2 text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer text-center block mt-4"
                >
                  استكشاف الحي
                </a>
              </div>
            </div>

            {/* Ras Beirut image */}
            <div className="lg:rounded-r-3xl lg:rounded-l-none rounded-t-3xl rounded-b-none overflow-hidden shadow-sm h-full flex-1">
              <img
                src={RasBeirut}
                alt="رأس بيروت"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = BeirutMain;
                }}
              />
            </div>
          </div>

          {/* Bidaro stats */}
          <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between flex-1">
            <div>
              <div className="flex flex-row place-content-between items-center gap-2 mb-2">
                <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">
                  منطقة نموذجية
                </span>
                <h2 className="text-2xl font-bold text-green-900 mb-1">
                  بدارو
                </h2>
              </div>
              <p className="text-sm text-gray-500 mb-3">الواحة الهادئة</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                حي يجمع بين السكن الراقي والحياة الاجتماعية المريحة بالقرب من
                حرج بيروت
              </p>
            </div>
            <div>
              <a
                href="https://maps.google.com/?q=Bidaro,Beirut"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-gray-300 rounded-xl py-2 text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer text-center block mt-6"
              >
                استكشاف الحي
              </a>
              <div className="flex gap-4 mt-4 justify-end">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-900">12</p>
                  <p className="text-xs text-gray-500">مشروع قائم</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-900">88%</p>
                  <p className="text-xs text-gray-500">رضا السكان</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Two progress cards */}
        <div className="flex md:flex-row flex-col gap-4">
          {/* Tariq Jdide */}
          <div className="bg-white rounded-3xl p-6 shadow-sm flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="bg-green-50 rounded-2xl p-3">
                <FontAwesomeIcon
                  icon={faPeopleGroup}
                  className="text-green-700 text-2xl"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-900">
                  الطريق الجديدة
                </h2>
                <p className="text-sm text-gray-500">
                  تجمع سكني وتجاري حيوي يمتاز بروح الجماعة والأسواق الشعبية
                  النشطة
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>٤٥٪</span>
                <span>تطوير الساحات العامة</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: "45%" }}
                />
              </div>
            </div>
          </div>

          {/* Mazraa */}
          <div className="bg-white rounded-3xl p-6 shadow-sm flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="bg-green-50 rounded-2xl p-3">
                <FontAwesomeIcon
                  icon={faRoad}
                  className="text-green-700 text-2xl"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-900">المزرعة</h2>
                <p className="text-sm text-gray-500">
                  المركز الإداري والسكني العريق الذي يربط مختلف أحياء العاصمة
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>٧٠٪</span>
                <span>إعادة تأهيل البنى التحتية</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: "70%" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green-900 rounded-2xl px-10 py-8 flex md:flex-row-reverse flex-col items-center justify-between gap-7 mx-6 my-8">
          <div className="text-right">
            <h2 className="text-3xl font-bold text-white mb-2">
              خريطة الخدمات التفاعلية
            </h2>
            <p className="text-green-200 text-sm">
              يمكنكم الآن تتبع أعمال الصيانة، وتقديم البلاغات، ومعرفة حالة الطرق
              في جميع أحياء بيروت لحظة بلحظة
            </p>
          </div>
          
          <NavLink
            to="/dashboard/complaints"
            className="flex items-center gap-2 bg-white text-green-900 font-semibold text-sm px-5 py-3 rounded-xl whitespace-nowrap cursor-pointer hover:bg-green-50 transition"
          >
            <FontAwesomeIcon icon={faMap} />
            فتح بوابة الخدمات الرقمية
          </NavLink>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default City;
