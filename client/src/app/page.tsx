"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Rodape from "@/components/rodape";
import { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);
  const images = [
    "/images/c1.png",
    "/images/c2.png",
    "/images/c3.png",
    "/images/c4.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Inicia o fade out

      setTimeout(() => {
        setCurrentImage((prev) => prev + 1);
        setFade(true); // Inicia o fade in
      }, 500); // Tempo do fade out antes de trocar a imagem
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen pt-[88px] relative">
      {/* Carrossel como background com efeito fade */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0  bg-opacity-40 z-10"></div>
        <div className="relative w-full h-full">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
                currentImage === index
                  ? fade
                    ? "opacity-100"
                    : "opacity-0"
                  : "opacity-0"
              }`}
            >
              <Image
                src={img}
                alt={`Imagem ${index + 1}`}
                fill
                className="object-cover"
                quality={90}
                priority={index === 1}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Conteúdo principal */}
      <Navbar ativo="" />

      <div className="flex-grow flex flex-col items-center justify-center relative z-10 px-4">
        {/* Logo centralizada */}
        <div className="w-full flex justify-center mb-8">
          <Image
            src="/images/l.svg"
            alt="Logo"
            width={200}
            height={100}
            className="object-contain"
          />
        </div>

        {/* Frase destacada */}
        <div
          className={`${playfair.className} text-center max-w-3xl mx-auto mb-12`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            Aqui é o local de encontro <br />
            <span className="text-yellow-300">entre empresas e ONGs</span>
          </h1>
          <p className="mt-6 text-xl text-white/90 font-light">
            Conectando quem quer ajudar com quem precisa de ajuda
          </p>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 p-4">
          <Link href="/entrar">
            <button className="bg-blue-600 text-white px-20 py-4 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto text-center shadow-xl text-lg font-semibold">
              Entrar
            </button>
          </Link>
        </div>
      </div>

      <Rodape />
    </div>
  );
}
