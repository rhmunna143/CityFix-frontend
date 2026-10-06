import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { AiAssistantChat } from "@/components/shared/AiAssistantChat";
import { ScrollProgressBar } from "@/components/public/MotionWrappers";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <AiAssistantChat />
    </div>
  );
}
