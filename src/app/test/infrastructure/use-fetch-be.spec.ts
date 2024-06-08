/**
 * @jest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react";
import { useFetchBE } from "@/app/hooks/infrastructure/useFetchBE";
import { setupEnv } from "@/app/test/setupEnv";

setupEnv();

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe("useFetch", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test("fetch get", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({}),
    });

    const { result } = renderHook(() => useFetchBE());

    const endPoint = "/test-endpoint";
    const params = "param1=value1&param2=value2";

    await act(async () => {
      await result.current.get(endPoint, params);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://testUrl.com/test-endpoint?param1=value1&param2=value2",
      {
        method: "GET",
      }
    );
  });

  test("fetch post", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({}),
    });

    const { result } = renderHook(() => useFetchBE());

    const endPoint = "/test-endpoint";
    // const params = "param1=value1&param2=value2";
    const params = {
      param1: "value1",
      param2: "value2",
    };

    await act(async () => {
      await result.current.post(endPoint, params);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://testUrl.com/test-endpoint",
      {
        method: "POST",
        body: '{"param1":"value1","param2":"value2"}',
      }
    );
  });
});
