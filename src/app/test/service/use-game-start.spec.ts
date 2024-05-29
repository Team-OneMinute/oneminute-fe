/**
 * @jest-environment jsdom
 */
import { renderHook, waitFor } from "@testing-library/react";
import { useGameStart } from "@/app/hooks/service/useGameStart";
import { useAuthInit } from "@/app/hooks/infrastructure/useAuthInit";
import { useFirestore } from "@/app/hooks/infrastructure/useFirestore";
import { usePageNavigate } from "@/app/hooks/util/usePageNavigate";
import { serverTimestamp } from "firebase/firestore";

// モックの設定
jest.mock("@/app/hooks/infrastructure/useAuthInit", () => ({
  useAuthInit: jest.fn(),
}));

jest.mock("@/app/hooks/infrastructure/useFirestore", () => ({
  useFirestore: jest.fn(),
}));

jest.mock("@/app/hooks/util/usePageNavigate", () => ({
  usePageNavigate: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  serverTimestamp: jest.fn(),
}));

describe("useGameStart", () => {
  test("success start game", async () => {
    const mockUid = "test-uid";
    const mockAuth = {
      currentUser: {
        uid: mockUid,
      },
    };
    const mockAddDocument = jest.fn().mockResolvedValue(true);
    const mockGoto = jest.fn();

    (useAuthInit as jest.Mock).mockReturnValue({ authInit: () => mockAuth });
    (useFirestore as jest.Mock).mockReturnValue({
      addDocument: mockAddDocument,
    });
    (usePageNavigate as jest.Mock).mockReturnValue({ goto: mockGoto });
    (serverTimestamp as jest.Mock).mockReturnValue("timestamp");

    const { startGame } = useGameStart();
    const { result } = renderHook(() => startGame());

    expect(mockAddDocument).toHaveBeenCalledWith("0001_transaction", {
      uid: mockUid,
      created_at: "timestamp",
      cheat_check_flag: 0,
      bet_flg: 0,
    });
    await waitFor(() => expect(mockGoto).toHaveBeenCalledWith("game"));
  });

  test("should not start game if auth is not initialized", () => {
    (useAuthInit as jest.Mock).mockReturnValue({ authInit: () => null });
    (useFirestore as jest.Mock).mockReturnValue({ addDocument: jest.fn() });
    (usePageNavigate as jest.Mock).mockReturnValue({ goto: jest.fn() });

    const { startGame } = useGameStart();
    const { result } = renderHook(() => startGame());

    expect(useFirestore().addDocument).not.toHaveBeenCalled();
    expect(usePageNavigate().goto).not.toHaveBeenCalled();
  });

  test("should not start game if currentUser is null", () => {
    const mockAuth = {
      currentUser: null,
    };
    (useAuthInit as jest.Mock).mockReturnValue({
      authInit: () => mockAuth,
    });
    (useFirestore as jest.Mock).mockReturnValue({ addDocument: jest.fn() });
    (usePageNavigate as jest.Mock).mockReturnValue({ goto: jest.fn() });

    const { startGame } = useGameStart();
    const { result } = renderHook(() => startGame());

    expect(useFirestore().addDocument).not.toHaveBeenCalled();
    expect(usePageNavigate().goto).not.toHaveBeenCalled();
  });

  test("should not navigate to game page if addDocument response is not successful", async () => {
    const mockUid = "test-uid";
    const mockAuth = {
      currentUser: {
        uid: mockUid,
      },
    };

    const mockAddDocument = jest.fn().mockResolvedValue(false);
    const mockGoto = jest.fn();

    (useAuthInit as jest.Mock).mockReturnValue({ authInit: () => mockAuth });
    (useFirestore as jest.Mock).mockReturnValue({
      addDocument: mockAddDocument,
    });
    (usePageNavigate as jest.Mock).mockReturnValue({ goto: mockGoto });
    (serverTimestamp as jest.Mock).mockReturnValue("timestamp");

    const { startGame } = useGameStart();
    const { result } = renderHook(() => startGame());

    await waitFor(() =>
      expect(mockAddDocument).toHaveBeenCalledWith("0001_transaction", {
        uid: mockUid,
        created_at: "timestamp",
        cheat_check_flag: 0,
        bet_flg: 0,
      })
    );

    // `goto`が呼び出されないことを確認
    expect(mockGoto).not.toHaveBeenCalled();
  });
});
