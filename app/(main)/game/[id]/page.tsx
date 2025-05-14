"use client";

import { useParams, useRouter } from "next/navigation";

import { GameView } from "@/module/game/game.view";

export default function PageGame() {
  const params = useParams();
  const router = useRouter();

  const id: string = Array.isArray(params.id)
    ? params.id[0]
    : (params.id as string);

  if (!parseInt(id)) {
    router.replace("/error");
  }

  return <GameView id={id} />;
}
