import sha256 from "./sha256";

test("sha256", async () => {
  const calcRes = await sha256("./test/eMule_0.60.3.1_方块人steve.7z")
  expect(calcRes.val).toEqual("d57c1004c98f73b18d31085b1d492e7732a1387b082519c3f4386f927449735f")
})
