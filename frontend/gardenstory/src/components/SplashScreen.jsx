import { useEffect, useState } from "react";

const messages = [
  "Kastellaan kukkia...",
  "Haetaan siemeniä...",
  "Multa tuoksuu raikkaalta...",
];

export default function SplashScreen({ onFinish }) {
  const [index, setIndex] = useState(0);

  // Tekstin vaihtaminen
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // SplashScreenin kesto 3 sekuntia
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // vanhemmalle komponentille ilmoitetaan, että splash on valmis
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-green-100">
      <h1 className="text-4xl font-bold text-green-900 mb-10">
        Garden Story
      </h1>

      <p className="absolute bottom-8 sm:bottom-4 text-green-700 animate-pulse">
        {messages[index]}
      </p>
    </div>
  );
}

