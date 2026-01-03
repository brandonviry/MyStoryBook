import { motion } from "motion/react";
import { useState } from "react";

const defaultTabs = ["Accueil", "A propos", "Contact"];

export type MenuUnderlineProps = {
  tabs?: string[];
  gap?: number;
  fontSize?: number;
  underlineHeight?: number;
  underlineOffset?: number;
  underlineColor?: string;
  textColor?: string;
};

// Menu avec underline anime pour l'onglet actif.
export default function MenuUnderline({
  tabs = defaultTabs,
  gap = 30,
  fontSize = 16,
  underlineHeight = 3,
  underlineOffset = 6,
  underlineColor = "#4f46e5",
  textColor = "#0f172a",
}: MenuUnderlineProps) {
  const [active, setActive] = useState(tabs[0] ?? "");

  return (
    <div style={{ display: "flex", gap, color: textColor, fontSize }}>
      {tabs.map((tab) => (
        <div
          key={tab}
          onClick={() => setActive(tab)}
          style={{ position: "relative", cursor: "pointer" }}
        >
          {tab}

          {active === tab && (
            <motion.div
              layoutId="underline"
              style={{
                height: underlineHeight,
                background: underlineColor,
                position: "absolute",
                left: 0,
                right: 0,
                bottom: -underlineOffset,
                borderRadius: 4,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
