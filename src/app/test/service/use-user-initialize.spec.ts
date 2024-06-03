/**
 * @jest-environment jsdom
 */
import { useFetchBE } from "@/app/hooks/infrastructure/useFetchBE";
import { useFirestore } from "@/app/hooks/infrastructure/useFirestore";
import { useUserInitialize } from "@/app/hooks/service/useUserInitialize";
import { act, renderHook } from "@testing-library/react";

jest.mock("@/app/hooks/infrastructure/useFirestore", () => ({
  useFirestore: jest.fn(),
}));

jest.mock("@/app/hooks/infrastructure/useFetchBE", () => ({
  useFetchBE: jest.fn(),
}));

const mockUseFirestore = useFirestore as jest.Mock;
const mockUseFetchBE = useFetchBE as jest.Mock;

describe("useUserInitialize", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("success test", async () => {
    const mockGetDocumentByDocNo = jest.fn().mockResolvedValue(undefined);
    const mockPost = jest.fn().mockResolvedValue({
      status: 200,
    });

    mockUseFirestore.mockReturnValue({ getDocumentByDocNo: mockGetDocumentByDocNo });
    mockUseFetchBE.mockReturnValue({ post: mockPost });

    const { result } = renderHook(() => useUserInitialize());

    await act(async () => {
      await result.current.userInitialize(
        "test-uid"
      );
    });

    expect(mockGetDocumentByDocNo).toHaveBeenCalledWith("users", "test-uid");
    expect(mockPost).toHaveBeenCalledWith("/initializeUserData", {
      uid: "test-uid",
    });
  });

  test("should handle already exist user", async () => {
    const mockGetDocumentByDocNo = jest
      .fn()
      .mockResolvedValue({ uid: "test-user", life: 0 });
    const mockPost = jest.fn().mockResolvedValue({
      status: 201,
    });

    mockUseFirestore.mockReturnValue({ getDocumentByDocNo: mockGetDocumentByDocNo });
    mockUseFetchBE.mockReturnValue({ post: mockPost });

    const { result } = renderHook(() => useUserInitialize());

    await act(async () => {
      await result.current.userInitialize("test-uid");
    });

    expect(mockGetDocumentByDocNo).toHaveBeenCalledWith("users", "test-uid");
    expect(mockPost).toHaveBeenCalledTimes(0);
  });
});
