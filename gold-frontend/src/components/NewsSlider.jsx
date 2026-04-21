// src/components/NewsSlider.jsx
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const NewsSlider = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGoldNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://127.0.0.1:8000/api/gold-news", {
        headers: {
          Accept: "application/json", // ❗ بدون Authorization
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();
      setNews(data.articles || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load gold news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoldNews();
  }, []);

  // 🔥 Loader حلو
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 animate-pulse">
        Loading gold news...
      </div>
    );
  }

  return (
    <div className="my-10 px-4">
      <h3 className="text-2xl font-bold mb-6 text-center md:text-left">
        Gold Market News
      </h3>

      {/* ❗ error يظهر بدون ما يخفي السلايدر */}
     {error && news.length === 0 && (
  <p className="text-red-500 text-center mb-4">
    ⚠️ {error}
  </p>
)}

      {news.length === 0 ? (
        <p className="text-center text-gray-400">
          No news available
        </p>
      ) : (
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          navigation
        >
          {news.map((article, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-full">

                {/* الصورة */}
                <img
                  src={
                    article.image ||
                    "https://placehold.co/600x400/e2e2e2/735c00?text=Gold+News"
                  }
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x400/e2e2e2/735c00?text=Gold+News";
                  }}
                />

                {/* المحتوى */}
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="font-bold mb-2 line-clamp-2">
                    {article.title}
                  </h4>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                    {article.description}
                  </p>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d4af37] font-semibold hover:underline mt-auto"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default NewsSlider;