import { Button } from "./components/button";
import { Card } from "./components/card";
import { type MyType } from "@monorepo/types";

const obj: MyType = {
  name: "John Doe",
  age: 30,
};

export default function App() {
  return (
    <main className="container ">
      <Card>
        <Button>click me</Button>
        <pre>{JSON.stringify(obj, null, 2)}</pre>
      </Card>
    </main>
  );
}
