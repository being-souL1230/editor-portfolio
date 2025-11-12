import * as React from "react";
import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends Omit<MotionProps, 'transition' | 'children'> {
  depth?: "light" | "medium" | "heavy";
  hover?: boolean;
  glow?: boolean;
  className?: string;
  children: React.ReactNode;
}

const depthStyles = {
  light: "bg-white/5 border-white/10",
  medium: "bg-white/10 border-white/20",
  heavy: "bg-white/15 border-white/30",
};

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, depth = "medium", hover = true, glow = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative rounded-2xl border shadow-xl overflow-hidden group",
          depthStyles[depth],
          hover && "transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl",
          glow && "shadow-[0_20px_60px_-25px_rgba(109,40,217,0.45)]",
          className
        )}
        whileHover={hover ? { y: -4 } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      >
        {glow && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
