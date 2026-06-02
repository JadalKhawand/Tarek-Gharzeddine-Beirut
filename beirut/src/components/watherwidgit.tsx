import { useEffect, useState } from "react";

interface WeatherData {
  main: { temp: number; humidity: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
}

function getTimeOfDay(): string {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return "صباح";
  if (h >= 12 && h < 17) return "ظهر";
  if (h >= 17 && h < 21) return "مساء";
  return "ليل";
}

function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_KEY = "592b44a370ec8d850fe154c0189a64c4";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Beirut&appid=${API_KEY}&units=metric`
    )
      .then((r) => r.json())
      .then((data) => { setWeather(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-400 animate-pulse">
        <span>⏳</span>
        <span>جاري التحميل...</span>
      </div>
    );
  }

  if (!weather?.main) {
    return (
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-400">
        <span>⚠️</span>
        <span>تعذر تحميل الطقس</span>
      </div>
    );
  }

  const temp   = Math.round(weather.main.temp);
  const icon   = weather.weather[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600">
      {icon ? (
        <img src={iconUrl} alt="weather" className="w-8 h-8" />
      ) : (
        <span>🌤️</span>
      )}
      <span className="font-medium">{temp}°م</span>
      <span className="text-gray-400 text-xs">بيروت {getTimeOfDay()}</span>
    </div>
  );
}

export default WeatherWidget;