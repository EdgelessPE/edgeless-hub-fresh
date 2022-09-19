import {patch} from "./patch";
import {initial} from "./initial";
import {expect, test} from "@jest/globals"

test("patch", () => {
  expect(patch({}, initial)).toEqual(initial)
  expect(patch({
    ept: {
      mirror: {
        pool: {
          "pineapple": {}
        }
      }
    },
    theme: "light"
  }, initial)).toEqual({
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
