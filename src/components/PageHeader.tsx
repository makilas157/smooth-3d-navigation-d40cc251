import type { ReactNode } from "react";
import { CursorGrid } from "./CursorGrid";
import { SectionTag } from "./SectionHeading";

export function PageHeader({
  tag,
  title,
  intro,
}: {
  tag: string;
  title: ReactNode;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 pt-32 pb-16 lg:pt-40 lg:pb-24">
      <CursorGrid />
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,oklch(0.68_0.19_40/0.14),transparent)]" />
      <div className="container-x relative max-w-3xl">
        <SectionTag>{tag}</SectionTag>
        <h1 className="mt-4 text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro ? (
          <p className="accent-rule mt-6 max-w-xl text-base text-muted-foreground">{intro}</p>
        ) : null}
      </div>
    </section>
  );
}
