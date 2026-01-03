import { motion } from "motion/react";
import { useState } from "react";

export type LayoutProps = {
  collapsedWidth?: number;
  expandedWidth?: number;
  collapsedHeight?: number;
  expandedHeight?: number;
  radius?: number;
  color?: string;
  label?: string;
};

// Bloc cliquable qui change de taille avec animation layout.
const Layout = ({
  collapsedWidth = 150,
  expandedWidth = 300,
  collapsedHeight = 80,
  expandedHeight = 200,
  radius = 12,
  color = "#4f46e5",
  label = "Clique moi",
}: LayoutProps) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setOpen((value) => !value)}
      style={{
        width: open ? expandedWidth : collapsedWidth,
        height: open ? expandedHeight : collapsedHeight,
        background: color,
        borderRadius: radius,
        cursor: "pointer",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {label}
    </motion.div>
  );
};

export default Layout;
