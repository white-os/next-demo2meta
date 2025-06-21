'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('Hangzhou');

  const API_KEY = 'a10c03222e8f6736d6b11632779c063c';

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=zh_cn`
      );
      
      if (!response.ok) {
        throw new Error('城市未找到或网络错误');
      }
      
      const data: WeatherData = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取天气信息失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const getWeatherDescription = (weatherMain: string) => {
    const descriptions: { [key: string]: string } = {
      'Clear': '晴天',
      'Clouds': '多云',
      'Rain': '雨',
      'Snow': '雪',
      'Thunderstorm': '雷暴',
      'Drizzle': '毛毛雨',
      'Mist': '薄雾',
      'Smoke': '烟雾',
      'Haze': '霾',
      'Dust': '灰尘',
      'Fog': '雾',
      'Sand': '沙尘',
      'Ash': '火山灰',
      'Squall': '狂风',
      'Tornado': '龙卷风'
    };
    return descriptions[weatherMain] || weatherMain;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          天气查询
        </h1>
        
        {/* 搜索表单 */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="输入城市名称"
              className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? '查询中...' : '查询'}
            </button>
          </div>
        </form>

        {/* 错误信息 */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* 天气信息 */}
        {weather && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="text-gray-600">
                {new Date().toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                })}
              </p>
            </div>

            <div className="flex items-center justify-center mb-6">
              <img
                src={getWeatherIcon(weather.weather[0].icon)}
                alt={weather.weather[0].description}
                className="w-20 h-20"
              />
              <div className="ml-4">
                <div className="text-4xl font-bold text-gray-800">
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="text-lg text-gray-600">
                  {getWeatherDescription(weather.weather[0].main)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">体感温度</div>
                <div className="text-xl font-semibold">
                  {Math.round(weather.main.feels_like)}°C
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">湿度</div>
                <div className="text-xl font-semibold">
                  {weather.main.humidity}%
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">风速</div>
                <div className="text-xl font-semibold">
                  {weather.wind.speed} m/s
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">气压</div>
                <div className="text-xl font-semibold">
                  {weather.main.pressure} hPa
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {weather.weather[0].description}
              </p>
            </div>
          </div>
        )}

        {/* 快速查询按钮 */}
        <div className="mt-6 flex gap-2 flex-wrap justify-center">
          {['Hangzhou', 'Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'].map((cityName) => (
            <button
              key={cityName}
              onClick={() => {
                setCity(cityName);
                fetchWeather(cityName);
              }}
              className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all"
            >
              {cityName === 'Hangzhou' ? '杭州' : 
               cityName === 'Beijing' ? '北京' :
               cityName === 'Shanghai' ? '上海' :
               cityName === 'Guangzhou' ? '广州' : '深圳'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 