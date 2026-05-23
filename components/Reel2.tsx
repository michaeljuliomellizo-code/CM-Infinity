"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/reels2/Cleaning1.png",
  "/reels2/Cleaning2.png",
  "/reels2/Cleaning3.png",
  "/reels2/Cleaning4.png",
  "/reels2/Cleaning5.png",
  "/reels2/Cleaning6.png",
  "/reels2/Cleaning8.png",
  "/reels2/Cleaning9.png",
  "/reels2/Cleaning10.png",
  "/reels2/Cleaning11.png",
  "/reels2/Cleaning12.png",
  "/reels2/Cleaning13.png",
];

export default function Reel() {
  const [current, setCurrent] = useState(0);

  // Cambio automático cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-black min-h-screen p-6">
      
      {/* Contenedor del reel */}
      <div className="relative w-[400px] h-[500px] overflow-hidden rounded-xl shadow-lg">
        
        <Image
          src={images[current]}
          alt={`Imagen ${current + 1}`}
          fill
          priority
          className="object-cover transition-all duration-500"
        />

      </div>

      {/* Botones */}
      <div className="flex gap-4">
        <button
          onClick={prevImage}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          ← Previous
        </button>

        <button
          onClick={nextImage}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Next →
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              current === index
                ? "bg-black"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}