import * as React from "react";
import { motion } from "framer-motion";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

interface ParticleButtonProps extends ButtonProps {
  particles?: boolean;
}

export const ParticleButton = React.forwardRef<HTMLButtonElement, ParticleButtonProps>(
  ({ className, children, particles = true, asChild, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);
    const [showParticles, setShowParticles] = React.useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (particles) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();
        
        setRipples((prev) => [...prev, { x, y, id }]);
        setShowParticles(true);

        setTimeout(() => {
          setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
        }, 600);

        setTimeout(() => setShowParticles(false), 300);
      }

      if (props.onClick) {
        props.onClick(e);
      }
    };

    // If using asChild, don't add particle effects to avoid React.Children.only error
    if (asChild) {
      return (
        <Button
          ref={ref}
          className={cn("relative overflow-hidden group", className)}
          onClick={handleClick}
          asChild
          {...props}
        >
          {children}
        </Button>
      );
    }

    return (
      <Button
        ref={ref}
        className={cn("relative overflow-hidden group", className)}
        onClick={handleClick}
        {...props}
      >
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 20,
              height: 20,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        
        {particles && showParticles && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{
                  x: "50%",
                  y: "50%",
                  opacity: 1,
                }}
                animate={{
                  x: `${50 + Math.cos((i * Math.PI * 2) / 8) * 100}%`,
                  y: `${50 + Math.sin((i * Math.PI * 2) / 8) * 100}%`,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}

        <span className="relative z-10 flex items-center gap-2">{children}</span>

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          style={{ width: "50%" }}
        />
      </Button>
    );
  }
);

ParticleButton.displayName = "ParticleButton";
