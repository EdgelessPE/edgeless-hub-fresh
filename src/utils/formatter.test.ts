import { formatSize } from "./formatter";

test("formatSize", () => {
  expect(formatSize(114514).toString()).toBe("111.83 KB");
  expect(formatSize(0).toString()).toBe("0 B");
});
