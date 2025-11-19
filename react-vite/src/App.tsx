import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "./components/icon";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>
        <span>Click me</span>

        <Icon
          name={"cog" as IconName}
          className="size-6 shrink-0 text-red-500"
        />
      </Button>
    </div>
  );
}

export default App;
