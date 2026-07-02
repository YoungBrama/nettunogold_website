import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

const variantClasses: Record<NonNullable<ButtonBaseProps["variant"]>, string> = {
  primary:
    "bg-gold-gradient text-background font-semibold hover:brightness-110 shadow-[0_0_0_1px_rgba(201,162,39,0.4)]",
  secondary:
    "bg-transparent text-gold border border-gold/60 hover:bg-gold/10 hover:border-gold",
  ghost: "bg-transparent text-foreground hover:text-gold",
};

const sizeClasses: Record<NonNullable<ButtonBaseProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm min-h-[44px]",
  md: "px-6 py-3 text-sm sm:text-base min-h-[44px]",
  lg: "px-8 py-4 text-base sm:text-lg min-h-[52px]",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-sm uppercase tracking-widest transition-colors duration-200 whitespace-nowrap";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonBaseProps & { href?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
