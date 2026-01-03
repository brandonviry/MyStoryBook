import { motion } from "motion/react";

export type CercleScaleProps = {
  size?: number;
  color?: string;
  duration?: number;
  scaleFrom?: number;
  scaleTo?: number;
  isActive?: boolean;
};

// Cercle qui apparait en scale avec opacite (utile pour modales, badges, etc.).
const CercleScale = ({
  size = 48,
  color = "#16a34a",
  duration = 0.5,
  scaleFrom = 0,
  scaleTo = 1,
  isActive = true,
}: CercleScaleProps) => {
  return (
    <motion.div
      // Style minimal pour un cercle.
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "999px",
        backgroundColor: color,
      }}
      // Apparition en scale quand l'etat est actif.
      initial={{ opacity: 0, scale: scaleFrom }}
      animate={isActive ? { opacity: 1, scale: scaleTo } : { opacity: 0, scale: scaleFrom }}
      // Duree d'apparition.
      transition={{ duration }}
    />
  );
};

export default CercleScale;
