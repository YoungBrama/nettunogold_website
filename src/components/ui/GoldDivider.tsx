import { cn } from "@/lib/utils";

export function GoldDivider({ className }: { className?: string }) {
  return <div className={cn("divider-gold w-24", className)} aria-hidden="true" />;
}
