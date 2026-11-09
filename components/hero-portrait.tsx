"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { type PointerEvent, useRef } from "react";

/**
 * Hero portrait with a subtle cursor-follow tilt. Interaction is pointer-only
 * and decorative: touch devices and reduced-motion users get the static image.
 */
export function HeroPortrait({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Normalised pointer position, -0.5 (top/left) to 0.5 (bottom/right).
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const spring = { stiffness: 140, damping: 18, mass: 0.4 };
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [10, -10]),
    spring,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-10, 10]),
    spring,
  );

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div style={{ perspective: 900 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
        style={prefersReducedMotion ? undefined : { rotateX, rotateY }}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="relative aspect-square w-full overflow-hidden rounded-full border border-line bg-elevated transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_24px_60px_-30px_var(--accent)] lg:aspect-auto lg:h-full lg:rounded-[1.75rem]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes={sizes}
          className="object-cover object-top"
        />
      </motion.div>
    </div>
  );
}
