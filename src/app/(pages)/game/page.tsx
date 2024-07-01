"use client";
import React from "react";
import { Game as StepTile } from "@/app/(pages)/game/games/StepTile/Game";

export default function Game() {
  // TODO: get gameId
  const gameId: string = "0001";

  switch (gameId) {
    case "0001":
      return <StepTile />;
    default:
      // TODO: create error component, when gameId is invalid
      return <div>game id is invalid.</div>
  }
}
