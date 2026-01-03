import { motion } from "motion/react";

export type HoverEtTapProps = {
  size?: number;
  color?: string;
  scaleHover?: number;
  scaleTap?: number;
  radius?: number;
  duration?: number;
};

// Bloc simple pour demonstrer hover/tap en production.
const HoverEtTap = ({
  size = 120,
  color = "#0ea5e9",
  scaleHover = 1.06,
  scaleTap = 0.94,
  radius = 12,
  duration = 0.2,
}: HoverEtTapProps) => {
  return (
    <motion.div
      // Style minimal pour voir clairement l'interaction.
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: `${radius}px`,
      }}
      // Animation d'interaction.
      whileHover={{ scale: scaleHover }}
      whileTap={{ scale: scaleTap }}
      transition={{ duration }}
    />
  );
};

export default HoverEtTap;
