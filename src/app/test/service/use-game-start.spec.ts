/**
 * @jest-environment jsdom
 */
import { renderHook, waitFor } from "@testing-library/react";
import { useGameStart } from "@/app/hooks/service/useGameStart";
import { usePageNavigate } from "@/app/hooks/util/usePageNavigate";
import { useFunction } from "@/app/hooks/infrastructure/useFunction";

// モックの設定
jest.mock("@/app/hooks/infrastructure/useFunction", () => ({
  useFunction: jest.fn(),
}));

jest.mock("@/app/hooks/util/usePageNavigate", () => ({
  usePageNavigate: jest.fn(),
}));

describe("useGameStart", () => {
  test("success start game", async () => {
    const mockCall = jest
      .fn()
      .mockResolvedValue({ data: { result: "success" } });
    const mockGoto = jest.fn();

    (useFunction as jest.Mock).mockReturnValue({ call: mockCall });
    (usePageNavigate as jest.Mock).mockReturnValue({ goto: mockGoto });

    const { startGame } = useGameStart();
    const { result } = renderHook(() => startGame("00001"));

    expect(mockCall).toHaveBeenCalledWith(
      "app-v1-presentation-startMiniGameByLife",
      {
        gameId: "00001",
      }
    );
    await waitFor(() => expect(mockGoto).toHaveBeenCalledWith("game"));
  });

  test("should not start game if call startMiniGameByLife result is failed", () => {
    const mockCall = jest
      .fn()
      .mockResolvedValue({ data: { result: "failed", reason: "error reason" } });
    const mockGoto = jest.fn();

    (useFunction as jest.Mock).mockReturnValue({ call: mockCall });
    (usePageNavigate as jest.Mock).mockReturnValue({ goto: mockGoto });

    const { startGame } = useGameStart();
    const { result } = renderHook(() => startGame("00001"));

    expect(mockCall).toHaveBeenCalledWith(
      "app-v1-presentation-startMiniGameByLife",
      {
        gameId: "00001",
      }
    );
    expect(mockGoto).not.toHaveBeenCalled();
  });

  test("should not start game if call startMiniGameByLife response is empty", () => {
    const mockCall = jest
      .fn()
      .mockResolvedValue(undefined);
    const mockGoto = jest.fn();

    (useFunction as jest.Mock).mockReturnValue({ call: mockCall });
    (usePageNavigate as jest.Mock).mockReturnValue({ goto: mockGoto });

    const { startGame } = useGameStart();
    const { result } = renderHook(() => startGame("00001"));

    expect(mockCall).toHaveBeenCalledWith(
      "app-v1-presentation-startMiniGameByLife",
      {
        gameId: "00001",
      }
    );
    expect(mockGoto).not.toHaveBeenCalled();
  });
});
