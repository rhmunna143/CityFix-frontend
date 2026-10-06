"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { GsiButtonConfiguration } from "@/types/google";

interface GoogleSignInButtonProps {
  text?: GsiButtonConfiguration["text"];
  theme?: GsiButtonConfiguration["theme"];
  className?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function GoogleSignInButton({
  text = "continue_with",
  theme = "outline",
  className = "",
  onSuccess,
  onError,
}: GoogleSignInButtonProps) {
  const { googleLogin } = useAuth();
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) {
      setRenderError("Google Client ID is missing. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local.");
      return;
    }

    const initAndRender = () => {
      if (!window.google?.accounts?.id || !buttonRef.current) return;

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            if (!response.credential) {
              toast.error("Google login failed: No credentials returned");
              return;
            }

            setIsSubmitting(true);
            try {
              await googleLogin(response.credential);
              toast.success("Signed in with Google successfully!");
              onSuccess?.();
            } catch (err: any) {
              const msg = err.message || "Failed to log in with Google";
              toast.error(msg);
              onError?.(err);
            } finally {
              setIsSubmitting(false);
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // Determine optimal width (Google allows 200 - 400px)
        const containerWidth = containerRef.current?.clientWidth || 380;
        const buttonWidth = Math.min(Math.max(containerWidth, 200), 400);

        buttonRef.current.innerHTML = "";
        window.google.accounts.id.renderButton(buttonRef.current, {
          type: "standard",
          theme: theme,
          size: "large",
          text: text,
          shape: "rectangular",
          logo_alignment: "center",
          width: buttonWidth,
        });

        setIsScriptLoaded(true);
      } catch (err: any) {
        console.error("Failed to initialize Google Sign-In:", err);
        setRenderError(err.message || "Failed to initialize Google Sign-In");
      }
    };

    if (window.google?.accounts?.id) {
      initAndRender();
      return;
    }

    const scriptSrc = "https://accounts.google.com/gsi/client";
    let script = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const handleLoad = () => initAndRender();
    script.addEventListener("load", handleLoad);

    return () => {
      script.removeEventListener("load", handleLoad);
    };
  }, [clientId, text, theme, googleLogin, onSuccess, onError]);

  if (renderError && process.env.NODE_ENV !== "production") {
    return (
      <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive text-center">
        {renderError}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full flex flex-col items-center justify-center ${className}`}>
      {/* Loading overlay during token verification */}
      {isSubmitting && (
        <div className="absolute inset-0 bg-background/85 backdrop-blur-[1px] flex items-center justify-center rounded-md z-20 border shadow-xs">
          <Loader2 className="h-4 w-4 animate-spin text-primary mr-2" />
          <span className="text-xs font-medium text-foreground">Verifying Google account...</span>
        </div>
      )}

      {/* Placeholder shown while script loads */}
      {!isScriptLoaded && (
        <div className="w-full h-[40px] flex items-center justify-center border rounded-md bg-background text-muted-foreground text-sm font-medium animate-pulse cursor-wait">
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12c0 2.03.45 3.84 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Loading Google Sign-In...</span>
        </div>
      )}

      {/* Target container for Google GSI button */}
      <div
        ref={buttonRef}
        className={`w-full flex justify-center ${!isScriptLoaded ? "hidden" : ""}`}
      />
    </div>
  );
}
