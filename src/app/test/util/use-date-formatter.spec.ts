/**
 * @jest-environment jsdom
 */
import { renderHook } from "@testing-library/react";
import { useDateFormatter } from "../../hooks/util/useDateFormatter";

describe("useDateFormatter", () => {
  const { dateFormat } = useDateFormatter();
  test("do not specify format", () => {
    const date = new Date();
    console.log(date);
    const { result } = renderHook(() => dateFormat(date));

    //expect(result.current.count).toBe(0);
  });
});
