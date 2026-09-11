import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

// Browser-only: the WebGL canvas must never render on the server.
const FloatingScene = lazy(() => import("./three/FloatingScene"));

/**
 * Decorative 3D layer used behind page headers and the hero.
 * Pointer events pass through so the page stays fully usable.
 */
export function Scene3D({
  variant = "header",
  className = "",
}: {
  variant?: "hero" | "header";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden opacity-80 mix-blend-screen ${className}`}
    >
      <ClientOnly>
        <Suspense fallback={null}>
          <FloatingScene variant={variant} />
        </Suspense>
      </ClientOnly>
    </div>
  );
}
