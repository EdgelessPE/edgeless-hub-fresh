import { fetchAlpha, fetchHello } from "./index";

test("fetchMirror", async () => {
  const helloRes = await fetchHello("https://pineapple.edgeless.top/api/v3");
  const name = helloRes.unwrap().name;
  expect(name).toEqual("菠萝云");

  const alphaRes = await fetchAlpha(
    "3.1.0",
    "https://pineapple.edgeless.top/api/v3",
    "ALPHA"
  );
  expect(alphaRes.ok).toBe(true);
  const alpha = alphaRes.unwrap();
  expect(alpha.cover?.file.name).toEqual("cover.7z");

  const failedRes = await fetchAlpha(
    "3.1.0",
    "https://pineapple.edgeless.top/api/v3",
    "WRONG_TOKEN"
  );
  expect(failedRes.val).toBe(`Error:Invalid alpha token`);
});
