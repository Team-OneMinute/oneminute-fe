/**
 * @jest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react";
import { useFetch } from "../../hooks/infrastructure/useFetch";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe("useFetch", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test("fetch in dev", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({}),
    });

    const { result } = renderHook(() => useFetch("dev"));

    const uri = "/test-endpoint";
    const params = "param1=value1&param2=value2";

    await act(async () => {
      await result.current.get(uri, params);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:5001/oneminute-88837/us-central1/test-endpoint?param1=value1&param2=value2",
      {
        method: "GET",
      }
    );
  });

  test("fetch in stg", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({}),
    });

    const { result } = renderHook(() => useFetch("stg"));

    const uri = "/test-endpoint";
    const params = "param1=value1&param2=value2";

    await act(async () => {
      await result.current.get(uri, params);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://us-central1-oneminute-88837.cloudfunctions.net/test-endpoint?param1=value1&param2=value2",
      {
        method: "GET",
      }
    );
  });

  test("fetch in prod", async () => {
    // (global.fetch as jest.Mock).mockResolvedValueOnce({
    //   json: () => Promise.resolve({}),
    // });

    // const { result } = renderHook(() => useFetch("dev"));

    // const uri = "/test-endpoint";
    // const params = "param1=value1&param2=value2";

    // await act(async () => {
    //   await result.current.get(uri, params);
    // });

    // expect(global.fetch).toHaveBeenCalledWith(
    //   "http://127.0.0.1:5001/oneminute-88837/us-central1/test-endpoint?param1=value1&param2=value2",
    //   {
    //     method: "GET",
    //   }
    // );
  });
});
