import { motion, useScroll } from "motion/react";

export type ScrollAnimationProps = {
  size?: number;
  color?: string;
  radius?: number;
  duration?: number;
  offsetY?: number;
  once?: boolean;
  showProgress?: boolean;
  progressHeight?: number;
  progressColor?: string;
};

// Bloc qui apparait au scroll (whileInView).
const ScrollAnimation = ({
  size = 100,
  color = "#fde68a",
  radius = 8,
  duration = 0.5,
  offsetY = 50,
  once = true,
  showProgress = true,
  progressHeight = 6,
  progressColor = "#0ea5e9",
}: ScrollAnimationProps) => {
  const { scrollYProgress } = useScroll();

  return (
    <div style={{ width: "100%" }}>
      {showProgress ? (
        <motion.div
          // Barre de progression de scroll.
          style={{
            position: "sticky",
            top: 0,
            left: 0,
            height: `${progressHeight}px`,
            backgroundColor: progressColor,
            transformOrigin: "0 50%",
            scaleX: scrollYProgress,
            zIndex: 1,
          }}
        />
      ) : null}
      <motion.div
        // Apparition au scroll.
        initial={{ opacity: 0, y: offsetY }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration }}
        viewport={{ once }}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          borderRadius: `${radius}px`,
        }}
      />
    </div>
  );
};

export default ScrollAnimation;
