import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <div className="flex flex-col h-5 bg-green-700"></div>
        <div className="flex flex-row-reverse p-5 place-content-between bg-gray-100 pl-20 pr-20">
          <div className="flex flex-row-reverse ">
            <h1 className="text-green-700 font-bold text-xl ml-15">
              بلدية بيروت
            </h1>
            <div className="flex flex-row-reverse gap-5 mt-1">
              <Link to="/" className="font-semibold cursor-pointer hover:text-green-700 hover:underline hover:decoration-green-700 hover:underline-offset-8 hover:decoration-4">
                الرئيسية
              </Link>
              <Link to="/municipality" className="font-semibold cursor-pointer hover:text-green-700 hover:underline hover:decoration-green-700 hover:underline-offset-8 hover:decoration-4">
                عن البلدية
              </Link>
              <Link to="/news" className="font-semibold cursor-pointer hover:text-green-700 hover:underline hover:decoration-green-700 hover:underline-offset-8 hover:decoration-4">
                الخدمات
              </Link>
              <Link to="/main" className="font-semibold cursor-pointer hover:text-green-700 hover:underline hover:decoration-green-700 hover:underline-offset-8 hover:decoration-4">
                الأخبار
              </Link>
              <Link to="/main" className="font-semibold cursor-pointer hover:text-green-700 hover:underline hover:decoration-green-700 hover:underline-offset-8 hover:decoration-4">
                المشاريع
              </Link>
              <Link to="/main" className="font-semibold cursor-pointer hover:text-green-700 hover:underline hover:decoration-green-700 hover:underline-offset-8 hover:decoration-4">
                الأحياء
              </Link>
            </div>
          </div>
          <div className="flex flex-row-reverse gap-20">
            <div className="flex flex-row-reverse gap-15">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-gray-500 absolute mr-3 mt-3"
              />

              <input
                type="text"
                placeholder=". . . بحث عن مشاريع"
                className="w-full bg-gray-200 border-2 border-gray-300 rounded-xl h-10 pr-10 text-right"
              />
            </div>
            <button className="bg-green-700 text-white p-2 pl-5 pr-5 rounded-xl">
              دخول المواطن
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
