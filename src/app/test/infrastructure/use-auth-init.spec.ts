/**
 * @jest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react";
import { useAuthInit } from "../../hooks/infrastructure/useAuthInit";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { setupEnv } from "../setupEnv"; 
import { firebaseConfig } from "@/app/config/firebaseConfig";

setupEnv();

// モックの設定
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

describe("useAuthInit", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should initialize Firebase app and auth", () => {
    const mockApp = {};
    const mockAuth = {};

    (initializeApp as jest.Mock).mockReturnValue(mockApp);
    (getAuth as jest.Mock).mockReturnValue(mockAuth);

    const { result } = renderHook(() => useAuthInit());
    const auth = result.current.authInit();

    expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
    expect(getAuth).toHaveBeenCalledWith(mockApp);
    expect(auth).toBe(mockAuth);
  });
});
