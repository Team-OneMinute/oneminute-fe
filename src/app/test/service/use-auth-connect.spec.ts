/**
 * @jest-environment jsdom
 */
import { renderHook, act, fireEvent, waitFor } from "@testing-library/react";
import { useAuthConnect } from "@/app/hooks/service/useAuthConnect";
import { useFetch } from "@/app/hooks/infrastructure/useFetch";
import { useAuthInit } from "@/app/hooks/infrastructure/useAuthInit";
import { signInWithCustomToken } from "firebase/auth";

jest.mock("@/app/hooks/infrastructure/useFetch", () => ({
  useFetch: jest.fn(),
}));

jest.mock("@/app/hooks/infrastructure/useAuthInit", () => ({
  useAuthInit: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  signInWithCustomToken: jest.fn(),
}));

const mockUseFetch = useFetch as jest.Mock;
const mockUseAuthInit = useAuthInit as jest.Mock;
const mockSignInWithCustomToken = signInWithCustomToken as jest.Mock;

describe("useAuthConnect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("success test", async () => {
    const mockGet = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ token: "mock-custom-token" }),
    });
    const mockAuth = { currentUser: { uid: "test-uid" } };

    mockUseFetch.mockReturnValue({ get: mockGet });
    mockUseAuthInit.mockReturnValue({ authInit: () => mockAuth });
    mockSignInWithCustomToken.mockResolvedValue({ user: { uid: "test-uid" } });

    const { result } = renderHook(() => useAuthConnect());

    await act(async () => {
      const success = await result.current.firebaseAuthConnect(
        "key1=value1&key2=value2"
      );
      expect(success).toBe(true);
    });

    expect(mockGet).toHaveBeenCalledWith(
      "/telegramAuth",
      "key1=value1&key2=value2"
    );
    expect(mockSignInWithCustomToken).toHaveBeenCalledWith(
      mockAuth,
      "mock-custom-token"
    );
  });

    test("should handle error in Firebase auth connection", async () => {
      const mockGet = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ token: "mock-custom-token" }),
      });
      const mockAuth = { currentUser: { uid: "test-uid" } };

      mockUseFetch.mockReturnValue({ get: mockGet });
      mockUseAuthInit.mockReturnValue({ authInit: () => mockAuth });
      mockSignInWithCustomToken.mockRejectedValue(new Error("Mock error"));

      // console.errorをモックしてエラーログの出力を抑制
      const consoleErrorMock = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const { result } = renderHook(() => useAuthConnect());

      await act(async () => {
        const success = await result.current.firebaseAuthConnect(
          "key1=value1&key2=value2"
        );
        expect(success).toBe(false);
      });

      expect(mockGet).toHaveBeenCalledWith(
        "/telegramAuth",
        "key1=value1&key2=value2"
      );
      expect(mockSignInWithCustomToken).toHaveBeenCalledWith(
        mockAuth,
        "mock-custom-token"
      );

      // テスト終了後にconsole.errorのモックを解除
      consoleErrorMock.mockRestore();
    });
  
    test("should handle missing auth instance", async () => {
      // mockUseAuthInit.mockReturnValue({ authInit: () => null });

      // const { result } = renderHook(() => useAuthConnect());

      // await act(async () => {
      //   const success = await result.current.firebaseAuthConnect(
      //     "key1=value1&key2=value2"
      //   );
      //   expect(success).toBe(false);
      // });

      // expect(signInWithCustomToken).not.toHaveBeenCalled();
    });
});
