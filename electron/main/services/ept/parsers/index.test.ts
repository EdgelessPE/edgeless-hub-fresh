import { fetchHello } from "./index";

test("fetchMirror", async () => {
  const helloRes = await fetchHello("https://pineapple.edgeless.top/api/v3");

  // 取镜像站名称作为测试成功标志
  const name = helloRes.unwrap().name;
  expect(name).toEqual("菠萝云");
});
