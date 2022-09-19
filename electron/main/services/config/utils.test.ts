import {patch} from "./utils";
import {initial} from "./initial";
import {expect, test} from "@jest/globals"

test("patch", () => {
  expect(patch({}, initial)).toBe(initial)
  expect(patch({
    ept: {
      mirror: {
        pool: {
          "pineapple": {}
        }
      }
    },
    theme: "light"
  }, initial)).toBe({
    ept: {
      mirror: {
        pool: {
          "pineapple": {}
        },
        current: null
      }
    },
    theme: "light"
  })
})
