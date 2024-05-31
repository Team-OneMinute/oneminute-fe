/**
 * @jest-environment jsdom
 */
import { renderHook } from "@testing-library/react";
import { setupEnv } from "../setupEnv";
import { useEnv } from "../../hooks/util/useEnv";

setupEnv();

describe("useDateFormatter", () => {
  const { getEnv } = useEnv();
  test("get env", () => {
    const { result } = renderHook(() => getEnv());
    expect(result.current).toBe("test");
  });
});
