import "./App.css";
import React, { useEffect, useState } from "react";
import Preloader from "./components/preloader/page";
import Index from "./routes/index/page";
import { ActiveProvider } from "./utils/context";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    alert("Work in progress")
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="w-full h-screen bg-[url('./assets/wallpapers/981868.webp')] bg-center bg-cover bg-no-repeat">
      {isLoading ?
        <Preloader />
        :
        <ActiveProvider>
          <Index />
        </ActiveProvider>
      }
      {/* <ActiveProvider>
        <Index />
      </ActiveProvider> */}
    </main>
  );
}
