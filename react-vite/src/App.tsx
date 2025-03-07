import { useEffect, useRef } from "react";
import { Card } from "./components/card";

export default function App() {
  const appRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    console.log(appRef.current);
  }, []);
  return (
    <main className="container p-[clamp(1rem,5vw,5rem)] grid place-content-center debug">
      <Card
        className="w-[min(60rem,80vw)]  aspect-video grid place-content-center"
        ref={appRef}
      >
        <h1 className="text-[clamp(1.2rem,3vw,3rem)] font-bold text-center">
          React with Vite and TailwindCSS
        </h1>
      </Card>
    </main>
  );
}
