/**
 * @jest-environment jsdom
 */
import { renderHook } from "@testing-library/react";
import { setupEnv } from "../setupEnv";
import { useDateFormatter } from "../../hooks/util/useDateFormatter";

setupEnv();

describe("useDateFormatter", () => {
  const { dateFormat } = useDateFormatter();

  test("default format", () => {
    // 2023/09/01 15:30.44 date obj starts 0 index on month
    const date = new Date(2023, 8, 1, 15, 30, 44, 55);

    const { result } = renderHook(() => dateFormat(date));

    expect(result.current).toBe("20230901153044");
  });

  test("YYYY-MM-DD format", () => {
    // 2023/09/01 15:30.44 date obj starts 0 index on month
    const date = new Date(2023, 8, 1, 15, 30, 44, 55);

    const { result } = renderHook(() => dateFormat(date, "YYYY-MM-DD"));

    expect(result.current).toBe("2023-09-01");
  });

  test("request not defined format", () => {
    // 2023/09/01 15:30.44 date obj starts 0 index on month
    const date = new Date(2023, 8, 1, 15, 30, 44, 55);

    const { result } = renderHook(() => dateFormat(date, "YYYYYYYYY"));

    expect(result.current).toBe("20230901153044");
  });

  test("request data fraud", () => {
    // bad data
    const date = new Date(2023);
    const { result } = renderHook(() => dateFormat(date, "YYYYYYYYY"));

    // linux start date
    expect(result.current).toBe("19700101090002");
  });
});
