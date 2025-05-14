import { useEffect, useState } from "react";
import { Image } from "@heroui/image";

const CarouselComponent = () => {
  const images = [
    "https://www.ourastore.com/_next/image?url=https%3A%2F%2Fcdn.ourastore.com%2Fourastore.com%2Fbanner%2Fbannerwebmlbbxnaruto-ezgif.com-optijpeg.jpg&w=3840&q=100",
    "https://www.ourastore.com/_next/image?url=https%3A%2F%2Fcdn.ourastore.com%2Fourastore.com%2Fbanner%2Fbannerwebstarlightmiya-ezgif.com-optijpeg.jpg&w=3840&q=100",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <Image
                alt={`carousel-image-${index}`}
                className="w-full h-auto"
                radius={"md"}
                src={image}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full"
        onClick={goToPrev}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full"
        onClick={goToNext}
      >
        &#10095;
      </button>
    </div>
  );
};

export default CarouselComponent;
