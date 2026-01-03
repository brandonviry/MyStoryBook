import { motion } from "motion/react";

export type CarrerAnimate360Props = {
  size?: number;
  color?: string;
  duration?: number;
  rotate?: number;
  loop?: boolean;
  isActive?: boolean;
};

// Carre anime configurable: taille, couleur, duree, rotation.
const CarrerAnimate360 = ({
  size = 100,
  color = "blue",
  duration = 3,
  rotate = 360,
  loop = false,
  isActive = true,
}: CarrerAnimate360Props) => {
  return (
    <motion.div
      // Style simple pour bien voir l'animation dans Storybook.
      style={{ width: `${size}px`, height: `${size}px`, backgroundColor: color }}
      // Rotation d'un tour complet.
      animate={{ rotate: isActive ? rotate : 0 }}
      // Duree totale: 3 secondes.
      transition={{ duration, repeat: isActive && loop ? Infinity : 0 }}
    />
  );
};

export default CarrerAnimate360;
