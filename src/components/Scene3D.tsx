import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const FloatingScene = lazy(() => import("./three/FloatingScene"));

export function Scene3D({
  variant = "header",
  className = "",
}: {
  variant?: "hero" | "header" | "ambient";
  className?: string;
}) {
  const ambient = variant === "ambient";

  return (
    <div
      aria-hidden="true"
      className={`${
        ambient
          ? "pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-55 mix-blend-screen"
          : "pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-70 mix-blend-screen"
      } ${className}`}
    >
      <ClientOnly fallback={null}>
        <Suspense fallback={null}>
          <FloatingScene variant={variant} />
        </Suspense>
      </ClientOnly>
    </div>
  );
}
