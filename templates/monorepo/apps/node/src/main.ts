import { add } from "@monorepo/lib";
import { MyType } from "@monorepo/types";
console.log("Hello from App1!");

const obj: MyType = {
  name: "John Doe",
  age: 30,
};

console.log(`Name: ${obj.name}, Age: ${obj.age}`);
console.log(`2 + 3 = ${add(2, 3)}`);
