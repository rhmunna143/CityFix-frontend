"use client";

import dynamic from "next/dynamic";
import { useIdle } from "@/hooks/useIdle";

const AiAssistantChat = dynamic(
  () => import("./AiAssistantChat").then((m) => m.AiAssistantChat),
  { ssr: false }
);

export function LazyAiAssistant() {
  const idle = useIdle(2000);
  return idle ? <AiAssistantChat /> : null;
}
