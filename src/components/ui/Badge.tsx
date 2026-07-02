import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-sans font-medium uppercase tracking-widest text-gold-light",
        className
      )}
    >
      {children}
    </span>
  );
}
