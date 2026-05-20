import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Map from "../assets/Beirut-map.png";
import {
  faRoadCircleExclamation,
  faTrashCan,
  faLightbulb,
  faTree,
  faCamera,
  faGlobe,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Footer from "./footer";
function Reports() {
  const [selectedCategory, setSelectedCategory] = useState("الطرق والأرصفة");

  const categories = [
    { title: "الطرق والأرصفة", icon: faRoadCircleExclamation },
    { title: "النفايات", icon: faTrashCan },
    { title: "الإنارة العامة", icon: faLightbulb },
    { title: "الحدائق والبيئة", icon: faTree },
  ];
  return (
    <>
      <div className="flex xl:flex-row-reverse flex-col m-10 gap-6">
        <form className="border border-gray-400 py-5 px-10 text-right rounded-xl flex-1">
          <div className="flex flex-col gap-2 py-2 pb-7">
            <h1 className="text-3xl font-semibold text-green-800">
              تقديم شكوى أو اقتراح
            </h1>
            <p className="text-gray-600">
              .نسعى دائماً لتحسين خدماتنا من خلال ملاحظاتكم
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-right">اختر فئة البلاغ</p>

            <div className="flex sm:flex-row-reverse flex-col gap-4 mt-4">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.title;
                return (
                  <button
                    type="button"
                    key={category.title}
                    onClick={() => setSelectedCategory(category.title)}
                    className={`
    flex-1
    border rounded-xl p-5
    flex flex-col items-center justify-center gap-3
    transition cursor-pointer text-center
    ${
      isSelected
        ? "border-green-700 bg-green-50 text-green-700"
        : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
    }
  `}
                  >
                    <FontAwesomeIcon
                      icon={category.icon}
                      className="text-3xl"
                    />
                    <p className="font-medium">{category.title}</p>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col py-4 gap-3">
            <label htmlFor="وصف الشكوى بالتفصيل">:وصف الشكوى بالتفصيل</label>
            <textarea
              id="وصف الشكوى بالتفصيل"
              className="border border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-right bg-gray-100"
              placeholder="...يرجى كتابة تفاصيل الشكوى هنا"
            ></textarea>
          </div>
          <div className="flex sm:flex-row-reverse flex-col items-center place-content-between py-4 gap-6">
            <div className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-righ">
              <label htmlFor="المنطقة / الحي">:المنطقة / الحي</label>
              <input
                id="المنطقة / الحي"
                type="text"
                className="border border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-right bg-gray-100 w-full"
                placeholder="مثال: الحي السابع"
              />
            </div>
            <div className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-right">
              <label htmlFor="اسم الشارع (اختياري)">
                :اسم الشارع (اختياري)
              </label>
              <input
                id="اسم الشارع (اختياري)"
                type="text"
                className="border border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-right bg-gray-100 w-full"
                placeholder="مثال: شارع الامام علي"
              />
            </div>
          </div>
          <div className="w-full text-right">
            {/* Title */}
            <p className="font-semibold text-sm mb-2">إرفاق صور</p>

            {/* Upload Area */}
            <label
              className="
          border-2
          border-dashed
          border-gray-300
          rounded-xl
          bg-gray-100
          h-40
          flex
          flex-col
          items-center
          justify-center
          gap-2
          cursor-pointer
          hover:border-green-700
          hover:bg-gray-50
          transition
        "
            >
              {/* Hidden Input */}
              <input type="file" multiple className="hidden" />

              {/* Icon */}
              <FontAwesomeIcon
                icon={faCamera}
                className="text-5xl text-gray-500"
              />

              {/* Main Text */}
              <p className="text-gray-700 text-center">
                قم بسحب وإفلات الصور هنا أو اضغط للاختيار
              </p>

              {/* Sub Text */}
              <p className="text-sm text-gray-400">
                الحد الأقصى: 3 صور، 5 ميجابايت لكل صورة
              </p>
            </label>
          </div>
          <div className="mt-6">
            <button className="w-full bg-green-800 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition cursor-pointer">
              إرسال البلاغ
            </button>
          </div>
        </form>
        <div className="flex xl:flex-col md:flex-row-reverse flex-col flex-wrap items-center gap-6 ">
          <div className="flex flex-col text-right border border-gray-400 bg-gray-100 p-5 rounded-xl flex-1 w-full gap-3">
            <div className="flex flex-row-reverse gap-3 pr-10 items-center py-3">
              <FontAwesomeIcon icon={faGlobe} className="text-green-700" />
              <p className="text-2xl font-semibold">تتبع حالة بلاغ</p>
            </div>
            <div>
              أدخل رقم المرجع الذي وصلك عبر الرسائل النصية لمتابعة حالة طلبك
            </div>
            <div className="flex flex-col gap-5 mt-4">
              <input
                type="text"
                placeholder="(مثال: BEI-12345) رقم المرجع"
                className="border border-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-right bg-gray-100 w-full"
              />
              <button className="bg-gray-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-green-700 transition cursor-pointer">
                بحث وتتبع
              </button>
            </div>
          </div>
          <div
            className="flex flex-col text-right border border-gray-400 bg-gray-100 p-5 rounded-xl w-full gap-3 flex-1"
          >
            {/* Title */}
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                آخر التحديثات
              </h2>

              <div className="border-b border-gray-300 mt-4" />
            </div>

            {/* Updates */}
            <div className="space-y-5">
              {/* Item */}
              <div className="flex flex-row-reverse items-start gap-3">
                <div className="w-3 h-3 bg-green-700 rounded-full mt-2" />

                <div>
                  <p className="font-bold text-gray-800">تم إصلاح عطل إنارة</p>

                  <p className="text-sm text-gray-500">
                    منطقة الرمل - منذ ساعتين
                  </p>
                </div>
              </div>

              {/* Item */}
              <div className="flex flex-row-reverse items-start gap-3">
                <div className="w-3 h-3 bg-green-700 rounded-full mt-2" />

                <div>
                  <p className="font-bold text-gray-800">اكتمال حملة النظافة</p>

                  <p className="text-sm text-gray-500">
                    شارع ليس - منذ 5 ساعات
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="relative rounded-xl">
              <img
                src={Map}
                alt="خريطة البلاغات"
                className="w-full h-full object-cover"
              />

              <div
                className="
        absolute
        bottom-3
        right-3
        bg-black/40
        text-white
        text-sm
        px-3
        py-1
        rounded-lg
      "
              >
                خريطة البلاغات المنجزة
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-gray-100 border border-gray-300 p-5 rounded-xl gap-4 w-full text-right flex-1">
            <div className="text-2xl">
                <h1>إرشادات التقديم</h1>
            </div>
            <div className="flex flex-col gap-3 pr-10">
                <div className="flex flex-row-reverse items-center gap-3">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-green-700" />
                    <p>تأكد من صحة الموقع الجغرافي</p>
                </div>
                <div className="flex flex-row-reverse items-center gap-3">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-green-700" />
                    <p>أرفق صوراً واضحة للمشكلة</p>
                </div>
                <div className="flex flex-row-reverse items-center gap-3">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-green-700" />
                    <p> سيتم الرد خلال 48 ساعة عمل</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Reports;
