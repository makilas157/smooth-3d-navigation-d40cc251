/**
 * Decorative 3D layer used behind page headers and the hero.
 * The WebGL/3D torus effect has been removed — this component
 * now renders nothing, kept as a no-op so existing
 * <Scene3D /> usages elsewhere in the app don't break.
 */
export function Scene3D({
  variant = "header",
  className = "",
}: {
  variant?: "hero" | "header" | "ambient";
  className?: string;
}) {
  return null;
}
