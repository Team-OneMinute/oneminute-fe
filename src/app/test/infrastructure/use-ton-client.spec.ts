/**
 * @jest-environment jsdom
 */
import { renderHook, waitFor } from "@testing-library/react";
import { useTonClient } from "@/app/hooks/infrastructure/useTonClient";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";

jest.mock("@orbs-network/ton-access", () => ({
  getHttpEndpoint: jest.fn(),
}));

jest.mock("@ton/ton", () => ({
  TonClient: jest.fn(),
}));

describe("useTonClient", () => {
  test("success", async () => {
    const mockEndpoint = "https://testnet.ton.endpoint";
    const mockTonClient = {};

    (getHttpEndpoint as jest.Mock).mockResolvedValue(mockEndpoint);
    (TonClient as jest.Mock).mockReturnValue(mockTonClient);

    const { result } = renderHook(() => useTonClient());

    // 初期状態はundefined
    expect(result.current).toBeUndefined();

    await waitFor(() => {
      expect(result.current).toBe(mockTonClient);
      expect(getHttpEndpoint).toHaveBeenCalledWith({ network: "testnet" });
      expect(TonClient).toHaveBeenCalledWith({ endpoint: mockEndpoint });
    });
  });
});
