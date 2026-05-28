import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Map from "../assets/Beirut-map.png";
import { useNavigate } from "react-router-dom";
import {
  faRoadCircleExclamation, faTrashCan, faLightbulb, faTree,
  faCamera, faGlobe, faCircleCheck, faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Footer from "./footer";
import { useAuth } from "../context/AuthContext";

function Reports() {
  const [selectedCategory, setSelectedCategory] = useState("الطرق والأرصفة");
  const [description, setDescription] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { token } = useAuth();
  const navigate = useNavigate();

  const categories = [
    { title: "الطرق والأرصفة", icon: faRoadCircleExclamation },
    { title: "النفايات", icon: faTrashCan },
    { title: "الإنارة العامة", icon: faLightbulb },
    { title: "الحدائق والبيئة", icon: faTree },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 3) {
      setError("الحد الأقصى 3 صور فقط");
      return;
    }
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setError("");
    if (!description) return setError("يرجى كتابة وصف الشكوى");
    if (!neighborhood) return setError("يرجى كتابة المنطقة / الحي");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("category", selectedCategory);
      formData.append("description", description);
      formData.append("neighborhood", neighborhood);
      formData.append("street", street);
      images.forEach((img) => formData.append("images", img));

      const res = await fetch("http://localhost:3000/complaints", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) return setError(data.error || "حدث خطأ ما");

      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError("فشل الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex xl:flex-row-reverse flex-col my-10 mx-5 gap-6">
        <div className="border border-gray-400 py-5 px-10 text-right rounded-xl flex-1">
          <div className="flex flex-col gap-2 py-2 pb-7">
            <h1 className="text-3xl font-semibold text-green-800">تقديم شكوى أو اقتراح</h1>
            <p className="text-gray-600">.نسعى دائماً لتحسين خدماتنا من خلال ملاحظاتكم</p>
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
                    className={`flex-1 border rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition cursor-pointer text-center
                      ${isSelected ? "border-green-700 bg-green-50 text-green-700" : "border-gray-300 hover:border-green-400 hover:bg-gray-50"}`}
                  >
                    <FontAwesomeIcon icon={category.icon} className="text-3xl" />
                    <p className="font-medium">{category.title}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col py-4 gap-3">
            <label>:وصف الشكوى بالتفصيل</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-right bg-gray-100"
              placeholder="...يرجى كتابة تفاصيل الشكوى هنا"
            />
          </div>

          <div className="flex sm:flex-row-reverse flex-col items-center place-content-between py-4 gap-6">
            <div className="w-full p-3">
              <label>:المنطقة / الحي</label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="border border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-right bg-gray-100 w-full"
                placeholder="مثال: الحي السابع"
              />
            </div>
            <div className="w-full p-3">
              <label>:اسم الشارع (اختياري)</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="border border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-right bg-gray-100 w-full"
                placeholder="مثال: شارع الامام علي"
              />
            </div>
          </div>

          <div className="w-full text-right">
            <p className="font-semibold text-sm mb-2">إرفاق صور</p>
            <label className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-100 h-40 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-green-700 hover:bg-gray-50 transition">
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <FontAwesomeIcon icon={faCamera} className="text-5xl text-gray-500" />
              <p className="text-gray-700 text-center">قم بسحب وإفلات الصور هنا أو اضغط للاختيار</p>
              <p className="text-sm text-gray-400">الحد الأقصى: 3 صور، 5 ميجابايت لكل صورة</p>
            </label>

            {/* Image previews */}
            {images.length > 0 && (
              <div className="flex flex-row-reverse gap-3 mt-3 flex-wrap">
                {images.map((img, i) => (
                  <div key={i} className="relative w-20 h-20">
                    <img
                      src={URL.createObjectURL(img)}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 text-right bg-red-50 border border-red-100 rounded-xl px-4 py-2 mt-4">
              {error}
            </p>
          )}

          {/* Success */}
          {success && (
            <p className="text-sm text-green-700 text-right bg-green-50 border border-green-100 rounded-xl px-4 py-2 mt-4">
              ✓ تم إرسال البلاغ بنجاح، سيتم التواصل معك قريباً
            </p>
          )}

          <div className="mt-6 w-full">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-green-800 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:bg-green-400 transition cursor-pointer px-6"
            >
              {loading ? "جاري الإرسال..." : "إرسال البلاغ"}
            </button>
          </div>
        </div>

        {/* Right side - unchanged */}
        <div className="flex xl:flex-col md:flex-row-reverse flex-col flex-wrap items-center gap-6">
          <div className="flex flex-col text-right border border-gray-400 bg-gray-100 p-5 rounded-xl flex-1 w-full gap-3">
            <div className="flex flex-row-reverse gap-3 pr-10 items-center py-3">
              <FontAwesomeIcon icon={faGlobe} className="text-green-700" />
              <p className="text-2xl font-semibold">تتبع حالة بلاغ</p>
            </div>
            <div>أدخل رقم المرجع الذي وصلك عبر الرسائل النصية لمتابعة حالة طلبك</div>
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

          <div className="flex flex-col text-right border border-gray-400 bg-gray-100 p-5 rounded-xl w-full gap-3 flex-1">
            <div>
              <h2 className="text-xl font-bold text-gray-800">آخر التحديثات</h2>
              <div className="border-b border-gray-300 mt-4" />
            </div>
            <div className="space-y-5">
              <div className="flex flex-row-reverse items-start gap-3">
                <div className="w-3 h-3 bg-green-700 rounded-full mt-2" />
                <div>
                  <p className="font-bold text-gray-800">تم إصلاح عطل إنارة</p>
                  <p className="text-sm text-gray-500">منطقة الرمل - منذ ساعتين</p>
                </div>
              </div>
              <div className="flex flex-row-reverse items-start gap-3">
                <div className="w-3 h-3 bg-green-700 rounded-full mt-2" />
                <div>
                  <p className="font-bold text-gray-800">اكتمال حملة النظافة</p>
                  <p className="text-sm text-gray-500">شارع ليس - منذ 5 ساعات</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl">
              <img src={Map} alt="خريطة البلاغات" className="w-full h-full object-cover" />
              <div className="absolute bottom-3 right-3 bg-black/40 text-white text-sm px-3 py-1 rounded-lg">
                خريطة البلاغات المنجزة
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-gray-100 border border-gray-300 p-5 rounded-xl gap-4 w-full text-right flex-1">
            <div className="text-2xl"><h1>إرشادات التقديم</h1></div>
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
                <p>سيتم الرد خلال 48 ساعة عمل</p>
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