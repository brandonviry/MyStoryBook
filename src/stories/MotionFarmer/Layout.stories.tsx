import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { motion } from "motion/react";

type StoryArgs = {
  collapsedWidth: number;
  expandedWidth: number;
  collapsedHeight: number;
  expandedHeight: number;
  radius: number;
  color: string;
  label: string;
};

type TransformContext = {
  args: StoryArgs;
};

const meta: Meta<StoryArgs> = {
  title: "MotionFarmer/Tutorial/Layout",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    collapsedWidth: {
      control: { type: "number", min: 80, max: 260, step: 10 },
      description: "Largeur reduite.",
    },
    expandedWidth: {
      control: { type: "number", min: 180, max: 420, step: 10 },
      description: "Largeur etendue.",
    },
    collapsedHeight: {
      control: { type: "number", min: 50, max: 160, step: 10 },
      description: "Hauteur reduite.",
    },
    expandedHeight: {
      control: { type: "number", min: 120, max: 320, step: 10 },
      description: "Hauteur etendue.",
    },
    radius: {
      control: { type: "number", min: 0, max: 32, step: 2 },
      description: "Arrondi des coins.",
    },
    color: {
      control: "color",
      description: "Couleur du bloc.",
    },
    label: {
      control: "text",
      description: "Texte du bloc.",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Theorique: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: "grid", gap: "16px" }}>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          style={{
            padding: "8px 12px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {open ? "Fermer" : "Ouvrir"}
        </button>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Avec layout</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Sans layout</div>
          <motion.div
            layout
            style={{
              width: open ? args.expandedWidth : args.collapsedWidth,
              height: open ? args.expandedHeight : args.collapsedHeight,
              background: args.color,
              borderRadius: `${args.radius}px`,
              display: "grid",
              placeItems: "center",
              color: "white",
              fontWeight: 600,
            }}
          >
            {args.label}
          </motion.div>
          <motion.div
            style={{
              width: open ? args.expandedWidth : args.collapsedWidth,
              height: open ? args.expandedHeight : args.collapsedHeight,
              background: args.color,
              borderRadius: `${args.radius}px`,
              display: "grid",
              placeItems: "center",
              color: "white",
              fontWeight: 600,
            }}
          >
            {args.label}
          </motion.div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args;

          return `import { motion } from "motion/react";
import { useState } from "react";

const [open, setOpen] = useState(false);

<motion.div
  layout
  style={{
    width: open ? ${args.expandedWidth} : ${args.collapsedWidth},
    height: open ? ${args.expandedHeight} : ${args.collapsedHeight},
    background: "${args.color}",
    borderRadius: ${args.radius},
  }}
/>

<motion.div
  style={{
    width: open ? ${args.expandedWidth} : ${args.collapsedWidth},
    height: open ? ${args.expandedHeight} : ${args.collapsedHeight},
    background: "${args.color}",
    borderRadius: ${args.radius},
  }}
/>`;
        },
      },
    },
  },
  args: {
    collapsedWidth: 150,
    expandedWidth: 300,
    collapsedHeight: 80,
    expandedHeight: 200,
    radius: 12,
    color: "#4f46e5",
    label: "Carte",
  },
};

export const Pratique1: Story = {
  name: "Pratique 1",
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <motion.div
        layout
        onClick={() => setOpen((value) => !value)}
        style={{
          width: open ? args.expandedWidth : args.collapsedWidth,
          height: open ? args.expandedHeight : args.collapsedHeight,
          background: "#0b1220",
          borderRadius: `${args.radius}px`,
          color: "white",
          display: "grid",
          gap: "10px",
          padding: "14px",
          cursor: "pointer",
          boxShadow: "0 14px 40px rgba(15, 23, 42, 0.35)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
            }}
          />
          <div style={{ display: "grid", gap: "2px" }}>
            <div style={{ fontWeight: 700 }}>Focus Flow</div>
            <div style={{ fontSize: "12px", color: "#94a3b8" }}>
              Lofi Mix - 32 min
            </div>
          </div>
        </div>
        {open ? (
          <div style={{ display: "grid", gap: "8px" }}>
            <div
              style={{
                height: "6px",
                borderRadius: "999px",
                background: "#1f2937",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "45%",
                  height: "100%",
                  background: args.color,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              <span>1:12</span>
              <span>3:40</span>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              {["Prev", "Pause", "Next"].map((label) => (
                <button
                  key={label}
                  type="button"
                  style={{
                    padding: "6px 10px",
                    borderRadius: "10px",
                    border: "1px solid #1f2937",
                    background: "#111827",
                    color: "#e5e7eb",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ fontSize: "12px", color: "#94a3b8" }}>
            Clique pour voir les controles
          </div>
        )}
      </motion.div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Cas reel: mini player qui s'etend pour afficher les details.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args;

          return `import { motion } from "motion/react";
import { useState } from "react";

const [open, setOpen] = useState(false);

<motion.div
  layout
  onClick={() => setOpen(!open)}
  style={{
    width: open ? ${args.expandedWidth} : ${args.collapsedWidth},
    height: open ? ${args.expandedHeight} : ${args.collapsedHeight},
    background: "#0b1220",
    borderRadius: ${args.radius},
    color: "white",
    display: "grid",
    gap: "10px",
    padding: "14px",
    cursor: "pointer",
  }}
>
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <div style={{ width: "48px", height: "48px", borderRadius: "10px", background: "linear-gradient(135deg, #38bdf8, #0ea5e9)" }} />
    <div>
      <div style={{ fontWeight: 700 }}>Focus Flow</div>
      <div style={{ fontSize: "12px", color: "#94a3b8" }}>Lofi Mix - 32 min</div>
    </div>
  </div>
  {open ? (
    <div>
      <div style={{ height: "6px", borderRadius: "999px", background: "#1f2937" }} />
      <div style={{ fontSize: "12px", color: "#94a3b8" }}>1:12 / 3:40</div>
    </div>
  ) : (
    <div style={{ fontSize: "12px", color: "#94a3b8" }}>Clique pour voir les controles</div>
  )}
</motion.div>`;
        },
      },
    },
  },
  args: {
    collapsedWidth: 220,
    expandedWidth: 380,
    collapsedHeight: 90,
    expandedHeight: 210,
    radius: 16,
    color: "#38bdf8",
    label: "Carte",
  },
};

export const Pratique2: Story = {
  name: "Pratique 2",
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <motion.div
        layout
        onClick={() => setOpen((value) => !value)}
        style={{
          width: open ? args.expandedWidth : args.collapsedWidth,
          height: open ? args.expandedHeight : args.collapsedHeight,
          background: "#ffffff",
          borderRadius: `${args.radius}px`,
          border: "1px solid #e5e7eb",
          color: "#0f172a",
          display: "grid",
          gap: "10px",
          padding: "14px",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "999px",
              background: args.color,
            }}
          />
          <div style={{ display: "grid", gap: "2px" }}>
            <div style={{ fontWeight: 700 }}>Amina K.</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>
              Product Designer
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: "11px",
              color: "#16a34a",
              background: "#dcfce7",
              borderRadius: "999px",
              padding: "4px 8px",
            }}
          >
            Online
          </div>
        </div>
        {open ? (
          <div style={{ display: "grid", gap: "8px" }}>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              Design systems, onboarding, et UI kits.
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {["12 projets", "4 equipes", "98%"].map((item) => (
                <div
                  key={item}
                  style={{
                    fontSize: "12px",
                    padding: "6px 8px",
                    borderRadius: "8px",
                    background: "#f1f5f9",
                    color: "#0f172a",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ fontSize: "12px", color: "#64748b" }}>Voir details</div>
        )}
      </motion.div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Cas reel: carte profil qui s'ouvre pour afficher les infos.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args;

          return `import { motion } from "motion/react";
import { useState } from "react";

const [open, setOpen] = useState(false);

<motion.div
  layout
  onClick={() => setOpen(!open)}
  style={{
    width: open ? ${args.expandedWidth} : ${args.collapsedWidth},
    height: open ? ${args.expandedHeight} : ${args.collapsedHeight},
    background: "#ffffff",
    borderRadius: ${args.radius},
    border: "1px solid #e5e7eb",
    color: "#0f172a",
    display: "grid",
    gap: "10px",
    padding: "14px",
  }}
>
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <div style={{ width: "44px", height: "44px", borderRadius: "999px", background: "${args.color}" }} />
    <div>
      <div style={{ fontWeight: 700 }}>Amina K.</div>
      <div style={{ fontSize: "12px", color: "#64748b" }}>Product Designer</div>
    </div>
  </div>
  {open ? (
    <div style={{ fontSize: "12px", color: "#6b7280" }}>
      Design systems, onboarding, et UI kits.
    </div>
  ) : (
    <div style={{ fontSize: "12px", color: "#64748b" }}>Voir details</div>
  )}
</motion.div>`;
        },
      },
    },
  },
  args: {
    collapsedWidth: 220,
    expandedWidth: 380,
    collapsedHeight: 90,
    expandedHeight: 220,
    radius: 16,
    color: "#22c55e",
    label: "Carte",
  },
};

export const Pratique3: Story = {
  name: "Pratique 3",
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <motion.div
        layout
        onClick={() => setOpen((value) => !value)}
        style={{
          width: open ? args.expandedWidth : args.collapsedWidth,
          height: open ? args.expandedHeight : args.collapsedHeight,
          background: "#111827",
          borderRadius: `${args.radius}px`,
          border: "1px solid #1f2937",
          color: "white",
          display: "grid",
          gap: "10px",
          padding: "14px",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700 }}>Panier</div>
          <div style={{ fontSize: "12px", color: "#9ca3af" }}>3 articles</div>
        </div>
        {open ? (
          <div style={{ display: "grid", gap: "8px" }}>
            {["Casque", "Clavier", "T-shirt"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#e5e7eb",
                }}
              >
                <span>{item}</span>
                <span>29 EUR</span>
              </div>
            ))}
            <div style={{ height: "1px", background: "#1f2937" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 700,
              }}
            >
              <span>Total</span>
              <span>87 EUR</span>
            </div>
            <button
              type="button"
              style={{
                padding: "8px 10px",
                borderRadius: "10px",
                border: "1px solid #1f2937",
                background: "#0f172a",
                color: "#e5e7eb",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Passer commande
            </button>
          </div>
        ) : (
          <div style={{ fontSize: "12px", color: "#9ca3af" }}>
            Voir le resume
          </div>
        )}
      </motion.div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Cas reel: resume de panier qui se deploie.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args;

          return `import { motion } from "motion/react";
import { useState } from "react";

const [open, setOpen] = useState(false);

<motion.div
  layout
  onClick={() => setOpen(!open)}
  style={{
    width: open ? ${args.expandedWidth} : ${args.collapsedWidth},
    height: open ? ${args.expandedHeight} : ${args.collapsedHeight},
    background: "#111827",
    borderRadius: ${args.radius},
    border: "1px solid #1f2937",
    color: "white",
    display: "grid",
    gap: "10px",
    padding: "14px",
  }}
>
  <div style={{ fontWeight: 700 }}>Panier</div>
  {open ? (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
        <span>Casque</span>
        <span>29 EUR</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
        <span>Clavier</span>
        <span>29 EUR</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
        <span>T-shirt</span>
        <span>29 EUR</span>
      </div>
    </div>
  ) : (
    <div style={{ fontSize: "12px", color: "#9ca3af" }}>Voir le resume</div>
  )}
</motion.div>`;
        },
      },
    },
  },
  args: {
    collapsedWidth: 220,
    expandedWidth: 380,
    collapsedHeight: 90,
    expandedHeight: 230,
    radius: 16,
    color: "#4f46e5",
    label: "Carte",
  },
};
