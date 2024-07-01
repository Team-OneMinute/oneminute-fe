"use client";
import { SubTitle } from "@/app/components/Molecules/SubTitle";

export const InviteSlide = () => {
  const hapticHandler = (
    action: "light" | "medium" | "heavy" | "rigid" | "soft"
  ) => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred(action);
  };

  return (
    <>
      <button onClick={() => hapticHandler("light")}>light</button>
      <button onClick={() => hapticHandler("medium")}>medium</button>
      <button onClick={() => hapticHandler("heavy")}>heavy</button>
      <button onClick={() => hapticHandler("rigid")}>rigid</button>
      <button onClick={() => hapticHandler("soft")}>soft</button>
      {/* <SubTitle text="Coming Soon..." /> */}
    </>
  );
};
