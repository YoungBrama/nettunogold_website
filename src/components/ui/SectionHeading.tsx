import { cn } from "@/lib/utils";
import { GoldDivider } from "./GoldDivider";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.25em] text-gold">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-gold-gradient leading-tight">
        {title}
      </h2>
      <GoldDivider className={align === "center" ? "mx-auto" : ""} />
      {subtitle && (
        <p className="max-w-2xl text-muted text-base sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
