/**
 * @jest-environment jsdom
 */
import { renderHook } from "@testing-library/react";
import { usePageNavigate } from "../../hooks/util/usePageNavigate";

const push = jest.fn();
jest.mock("next/navigation", () => {
  const router = jest.requireActual("next/navigation");
  return {
    ...router,
    useRouter: () => {
      return {
        push,
      };
    },
  };
});

describe("usePageNavigate", () => {
  const { goto } = usePageNavigate();

  test("go to game page", () => {
    const pageName = "game";
    renderHook(() => goto(pageName));
    expect(push).toBeCalled();
    expect(push.mock.calls[0][0]).toBe("/game");
  });

  test("request not be defined page name, go to default page", () => {
    const pageName = "not_definition_page";
    renderHook(() => goto(pageName));
    expect(push).toBeCalled();
    expect(push.mock.calls[1][0]).toBe("/");
  });
});
