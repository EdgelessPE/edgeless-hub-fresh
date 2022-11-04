import getHash from "./blake3";

test("blake3", async () => {
  const hashRes = await getHash("./test/eMule_0.60.3.1_方块人steve.7z");
  // console.log(JSON.stringify(hashRes,null,2))
  expect(hashRes.val).toEqual(
    "a162f1b9cbc1ce8b155dd47bdadeb0d5898103e79435dda4e50128642a806dfb"
  );
});
