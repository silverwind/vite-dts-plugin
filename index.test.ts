import {dtsPlugin} from "./index.ts";

test("exists", () => {
  expect(dtsPlugin).toBeFunction();
});
