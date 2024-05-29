/**
 * @jest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react";
import { useTonConnect } from "@/app/hooks/service/useTonConnect";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { SenderArguments, Address, Cell } from "@ton/core";

jest.mock("@tonconnect/ui-react", () => ({
  useTonConnectUI: jest.fn(),
}));

const mockUseTonConnectUI = useTonConnectUI as jest.Mock;

describe("useTonConnect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("success ton connect", async () => {
    const mockSendTransaction = jest.fn().mockResolvedValue({
      transactionId: "test-transaction-id",
    });

    mockUseTonConnectUI.mockReturnValue([
      {
        sendTransaction: mockSendTransaction,
        connected: true,
      },
    ]);

    const { result } = renderHook(() => useTonConnect());

    const senderArgs: SenderArguments = {
      to: {
        toString: () => "test-address",
      } as Address,
      value: BigInt(1000),
      body: {
        toBoc: () => Buffer.from("test-payload"),
      } as Cell,
    };

    await act(async () => {
      await result.current.sender.send(senderArgs);
    });

    expect(mockSendTransaction).toHaveBeenCalledWith({
      messages: [
        {
          address: "test-address",
          amount: "1000",
          payload: Buffer.from("test-payload").toString("base64"),
        },
      ],
      validUntil: expect.any(Number),
    });
  });

  test("should initialize with correct connection status", () => {
    mockUseTonConnectUI.mockReturnValue([
      {
        sendTransaction: jest.fn(),
        connected: true,
      },
    ]);

    const { result } = renderHook(() => useTonConnect());

    expect(result.current.connected).toBe(true);
  });

  test("should handle unconnected state", () => {
    mockUseTonConnectUI.mockReturnValue([
      {
        sendTransaction: jest.fn(),
        connected: false,
      },
    ]);

    const { result } = renderHook(() => useTonConnect());

    expect(result.current.connected).toBe(false);
  });
});
