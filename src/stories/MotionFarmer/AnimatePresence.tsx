import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export type AnimatePresenceProps = {
  size?: number;
  color?: string;
  radius?: number;
  duration?: number;
};

// Exemple simple d'apparition/disparition avec AnimatePresence.
export default function AnimatePresenceExemple({
  size = 120,
  color = "#4f46e5",
  radius = 12,
  duration = 0.25,
}: AnimatePresenceProps) {
  const [show, setShow] = useState(true);

  return (
    <>
      <button
        type="button"
        onClick={() => setShow((value) => !value)}
        style={{
          padding: "8px 12px",
          borderRadius: "10px",
          border: "1px solid #e5e7eb",
          background: "#ffffff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Toggle
      </button>

      <AnimatePresence>
        {show ? (
          <motion.div
            key="box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration }}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: color,
              borderRadius: `${radius}px`,
              marginTop: "12px",
            }}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
