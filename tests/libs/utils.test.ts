import { describe, expect, it } from "vitest";
import { COLORS } from "../../src/const";
import { getStyle } from "../../src/libs/utils";

describe("utils", () => {
  it("gets style by id", () => {
    const style = getStyle("test");
    expect(style.color).toEqual(COLORS.yellow);
  });
});
