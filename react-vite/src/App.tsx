import { Card } from "@/components/card";
import { ToggleThemeButton } from "./components/theme-toggle";

export default function App() {
  return (
    <main className="container grid place-items-center ">
      <ToggleThemeButton className="mb-4" />
      <Card className=" w-120 aspect-video">Hello,d Vite + React!</Card>
    </main>
  );
}
