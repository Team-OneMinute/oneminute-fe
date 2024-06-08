/**
 * @jest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react";
import { setupEnv } from "@/app/test/setupEnv";
import { useFunction } from "@/app/hooks/infrastructure/useFunction";
import { getFunctions, httpsCallable } from "firebase/functions";
import { initializeApp } from "firebase/app";

setupEnv();

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/functions", () => ({
  getFunctions: jest.fn(),
  httpsCallable: jest.fn(),
}));

describe("useFunction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("call", async () => {
    const mockCallApi = jest.fn();
    mockCallApi.mockResolvedValue({ key: "value" });

    (initializeApp as jest.Mock).mockReturnValue({});
    (getFunctions as jest.Mock).mockReturnValue({});
    (httpsCallable as jest.Mock).mockReturnValue(mockCallApi);

    const { result } = renderHook(() => useFunction());

    const endPoint = "test-endpoint";
    const reqBody = { reqKey: "reqValue" };

    await act(async () => {
      await result.current.call(endPoint, reqBody);
    });

    expect(httpsCallable).toHaveBeenCalledWith({}, "test-endpoint");
    expect(mockCallApi).toHaveBeenCalledWith({ reqKey: "reqValue" });
  });
});
