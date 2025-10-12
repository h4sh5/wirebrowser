import { replaceVars } from "#src/app/utils.js";


const test = () => {
  const text = "Lorem Ipsum {{var3}} is {{var1}}{{var2}} {{=var1}} ={{var2}} ={{=var2}} {{==var2}} simply dummy text {{var1}}";
  const expected = "Lorem Ipsum {{var3}} is Variable1Variable2 {{var1}} =Variable2 ={{var2}} {{=var2}} simply dummy text Variable1";
  const replaced = replaceVars(text, {
    var1: "Variable1",
    var2: "Variable2",
  });
  if (replaced != expected) {
    console.log(replaced)
    throw new Error("Variables sostitution failed");
  }
  console.log("OK");
}

test()