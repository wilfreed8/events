import { useEffect, useState } from "react";

function WeatherInfo({ location, date }: { location: string; date: string }) {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=abf77d6418e64091855222705252005&q=${location.toLowerCase()}&dt=${date}`
        );
        const data = await res.json();

        if (data.error) throw new Error(data.error.message);
        setWeather(data.forecast.forecastday[0]);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchWeather();
  }, [location, date]);

  if (error) return <p className="text-red-600">Erreur météo : {error}</p>;
  if (!weather) return <p>Chargement de la météo...</p>;

  return (
    <div className="bg-blue-50 p-4 rounded shadow mt-4">
      <h3 className="text-lg font-bold mb-2">
        Météo prévue à {location} le {date}
      </h3>
      <p>Condition : {weather.day.condition.text}</p>
      <p>Température max : {weather.day.maxtemp_c}°C</p>
      <p>Température min : {weather.day.mintemp_c}°C</p>
      <p>Pluie : {weather.day.daily_chance_of_rain}%</p>
    </div>
  );
}
export default WeatherInfo;
