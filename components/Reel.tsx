"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/reels/naturaleza/Fence1.jpeg",
  "/reels/naturaleza/Fence3.jpeg",
  "/reels/naturaleza/Fence4.jpeg",
  "/reels/naturaleza/Fence5.jpeg",
  "/reels/naturaleza/Fence6.jpeg",
  "/reels/naturaleza/Fence7.jpeg",
  "/reels/naturaleza/Fence8.jpeg",
  "/reels/naturaleza/Fence9.jpeg",
  "/reels/naturaleza/Fence10.jpeg",
  "/reels/naturaleza/Fence11.jpeg",
  "/reels/naturaleza/Fence12.jpeg",
  "/reels/naturaleza/Fence13.jpeg",
  "/reels/naturaleza/Fence15.jpeg",
  "/reels/naturaleza/Fence16.jpeg",
  "/reels/naturaleza/Fence17.jpeg",
  "/reels/naturaleza/Fence18.jpeg",
  "/reels/naturaleza/Fence19.jpeg",
  "/reels/naturaleza/Fence20.jpeg",
  "/reels/naturaleza/Fence21.jpeg",
  "/reels/naturaleza/Fence22.jpeg",
  "/reels/naturaleza/Image1.jpeg",
  "/reels/naturaleza/Image3.jpeg",
  "/reels/naturaleza/Image4.jpeg",
  "/reels/naturaleza/Image5.jpeg",
  "/reels/naturaleza/Image6.jpeg",
  "/reels/naturaleza/Image7.jpeg",
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