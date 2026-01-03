import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type StoryArgs = {
  size: number;
  color: string;
  radius: number;
  duration: number;
  enterOpacity: number;
  enterScale: number;
  enterY: number;
  exitOpacity: number;
  exitScale: number;
  exitY: number;
};

type TransformContext = {
  args: StoryArgs;
};

const meta: Meta<StoryArgs> = {
  title: "MotionFarmer/Tutorial/AnimatePresence",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "number", min: 60, max: 220, step: 10 },
      description: "Taille du bloc.",
    },
    color: {
      control: "color",
      description: "Couleur du bloc.",
    },
    radius: {
      control: { type: "number", min: 0, max: 24, step: 2 },
      description: "Arrondi des coins.",
    },
    duration: {
      control: { type: "number", min: 0.1, max: 1, step: 0.05 },
      description: "Duree de l'animation.",
    },
    enterOpacity: {
      control: { type: "number", min: 0, max: 1, step: 0.05 },
      description: "Opacite au depart.",
    },
    enterScale: {
      control: { type: "number", min: 0.8, max: 1.2, step: 0.01 },
      description: "Scale au depart.",
    },
    enterY: {
      control: { type: "number", min: -40, max: 40, step: 2 },
      description: "Decalage vertical au depart.",
    },
    exitOpacity: {
      control: { type: "number", min: 0, max: 1, step: 0.05 },
      description: "Opacite a la sortie.",
    },
    exitScale: {
      control: { type: "number", min: 0.8, max: 1.2, step: 0.01 },
      description: "Scale a la sortie.",
    },
    exitY: {
      control: { type: "number", min: -40, max: 40, step: 2 },
      description: "Decalage vertical a la sortie.",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Theorique: Story = {
  render: (args) => {
    const [show, setShow] = useState(true);

    return (
      <div style={{ display: "grid", gap: "12px" }}>
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
              initial={{ opacity: args.enterOpacity, scale: args.enterScale, y: args.enterY }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: args.exitOpacity, scale: args.exitScale, y: args.exitY }}
              transition={{ duration: args.duration }}
              style={{
                width: `${args.size}px`,
                height: `${args.size}px`,
                background: args.color,
                borderRadius: `${args.radius}px`,
              }}
            />
          ) : null}
        </AnimatePresence>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args;

          return `import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const [show, setShow] = useState(true);

<button onClick={() => setShow(!show)}>Toggle</button>

<AnimatePresence>
  {show ? (
    <motion.div
      key="box"
      initial={{ opacity: ${args.enterOpacity}, scale: ${args.enterScale}, y: ${args.enterY} }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: ${args.exitOpacity}, scale: ${args.exitScale}, y: ${args.exitY} }}
      transition={{ duration: ${args.duration} }}
      style={{
        width: "${args.size}px",
        height: "${args.size}px",
        background: "${args.color}",
        borderRadius: "${args.radius}px",
      }}
    />
  ) : null}
</AnimatePresence>`;
        },
      },
    },
  },
  args: {
    size: 120,
    color: "#4f46e5",
    radius: 12,
    duration: 0.25,
    enterOpacity: 0,
    enterScale: 0.95,
    enterY: 0,
    exitOpacity: 0,
    exitScale: 0.95,
    exitY: 0,
  },
};

export const Pratique1: Story = {
  name: "Pratique 1",
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: "grid", gap: "12px" }}>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            background: "#111827",
            color: "#f9fafb",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Nouveau message
        </button>
        <AnimatePresence>
          {open ? (
            <motion.div
              key="toast"
              initial={{ opacity: args.enterOpacity, scale: args.enterScale, y: args.enterY }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: args.exitOpacity, scale: args.exitScale, y: args.exitY }}
              transition={{ duration: args.duration }}
              style={{
                width: "260px",
                padding: "12px",
                borderRadius: `${args.radius}px`,
                background: "#0f172a",
                color: "#e2e8f0",
                display: "grid",
                gap: "6px",
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.35)",
              }}
            >
              <div style={{ fontWeight: 700 }}>Nouveau DM</div>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                Sophie vient de vous ecrire.
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Cas reel: toast de notification qui apparait/disparait.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args;

          return `import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const [open, setOpen] = useState(false);

<button onClick={() => setOpen(!open)}>Nouveau message</button>

<AnimatePresence>
  {open ? (
    <motion.div
      key="toast"
      initial={{ opacity: ${args.enterOpacity}, scale: ${args.enterScale}, y: ${args.enterY} }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: ${args.exitOpacity}, scale: ${args.exitScale}, y: ${args.exitY} }}
      transition={{ duration: ${args.duration} }}
      style={{
        width: "260px",
        padding: "12px",
        borderRadius: "${args.radius}px",
        background: "#0f172a",
        color: "#e2e8f0",
        display: "grid",
        gap: "6px",
      }}
    >
      <div style={{ fontWeight: 700 }}>Nouveau DM</div>
      <div style={{ fontSize: "12px", color: "#94a3b8" }}>Sophie vient de vous ecrire.</div>
    </motion.div>
  ) : null}
</AnimatePresence>`;
        },
      },
    },
  },
  args: {
    size: 120,
    color: "#4f46e5",
    radius: 12,
    duration: 0.25,
    enterOpacity: 0,
    enterScale: 0.98,
    enterY: -12,
    exitOpacity: 0,
    exitScale: 0.98,
    exitY: -12,
  },
};

export const Pratique2: Story = {
  name: "Pratique 2",
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: "grid", gap: "12px" }}>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            color: "#0f172a",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Voir profil
        </button>
        <AnimatePresence>
          {open ? (
            <motion.div
              key="modal"
              initial={{ opacity: args.enterOpacity, scale: args.enterScale, y: args.enterY }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: args.exitOpacity, scale: args.exitScale, y: args.exitY }}
              transition={{ duration: args.duration }}
              style={{
                width: "320px",
                padding: "16px",
                borderRadius: `${args.radius}px`,
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                display: "grid",
                gap: "10px",
              }}
            >
              <div style={{ fontWeight: 700 }}>Profil</div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                Bio courte, liens et stats.
              </div>
              <div
                style={{
                  height: "6px",
                  borderRadius: "999px",
                  background: args.color,
                  width: "80%",
                }}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Cas reel: panneau de profil qui apparait en overlay.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args;

          return `import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const [open, setOpen] = useState(false);

<button onClick={() => setOpen(!open)}>Voir profil</button>

<AnimatePresence>
  {open ? (
    <motion.div
      key="modal"
      initial={{ opacity: ${args.enterOpacity}, scale: ${args.enterScale}, y: ${args.enterY} }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: ${args.exitOpacity}, scale: ${args.exitScale}, y: ${args.exitY} }}
      transition={{ duration: ${args.duration} }}
      style={{
        width: "320px",
        padding: "16px",
        borderRadius: "${args.radius}px",
        background: "#ffffff",
        border: "1px solid #e5e7eb",
      }}
    >
      <div style={{ fontWeight: 700 }}>Profil</div>
      <div style={{ fontSize: "12px", color: "#6b7280" }}>Bio courte, liens et stats.</div>
    </motion.div>
  ) : null}
</AnimatePresence>`;
        },
      },
    },
  },
  args: {
    size: 120,
    color: "#4f46e5",
    radius: 12,
    duration: 0.25,
    enterOpacity: 0,
    enterScale: 0.98,
    enterY: 0,
    exitOpacity: 0,
    exitScale: 0.98,
    exitY: 0,
  },
};

export const Pratique3: Story = {
  name: "Pratique 3",
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: "grid", gap: "12px" }}>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            background: "#0f172a",
            color: "#f8fafc",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Supprimer
        </button>
        <AnimatePresence>
          {open ? (
            <motion.div
              key="confirm"
              initial={{ opacity: args.enterOpacity, scale: args.enterScale, y: args.enterY }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: args.exitOpacity, scale: args.exitScale, y: args.exitY }}
              transition={{ duration: args.duration }}
              style={{
                width: "280px",
                padding: "14px",
                borderRadius: `${args.radius}px`,
                background: "#111827",
                color: "#f9fafb",
                display: "grid",
                gap: "10px",
                border: "1px solid #1f2937",
              }}
            >
              <div style={{ fontWeight: 700 }}>Supprimer le dossier ?</div>
              <div style={{ fontSize: "12px", color: "#cbd5f5" }}>
                Cette action est irreversible.
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  style={{
                    padding: "8px 10px",
                    borderRadius: "8px",
                    border: "1px solid #1f2937",
                    background: "#1f2937",
                    color: "#e5e7eb",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  style={{
                    padding: "8px 10px",
                    borderRadius: "8px",
                    border: "1px solid #991b1b",
                    background: "#ef4444",
                    color: "#fff5f5",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Cas reel: confirmation destructrice en panneau.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args;

          return `import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const [open, setOpen] = useState(false);

<button onClick={() => setOpen(!open)}>Supprimer</button>

<AnimatePresence>
  {open ? (
    <motion.div
      key="confirm"
      initial={{ opacity: ${args.enterOpacity}, scale: ${args.enterScale}, y: ${args.enterY} }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: ${args.exitOpacity}, scale: ${args.exitScale}, y: ${args.exitY} }}
      transition={{ duration: ${args.duration} }}
      style={{
        width: "280px",
        padding: "14px",
        borderRadius: "${args.radius}px",
        background: "#111827",
        color: "#f9fafb",
      }}
    >
      <div style={{ fontWeight: 700 }}>Supprimer le dossier ?</div>
      <div style={{ fontSize: "12px", color: "#cbd5f5" }}>
        Cette action est irreversible.
      </div>
    </motion.div>
  ) : null}
</AnimatePresence>`;
        },
      },
    },
  },
  args: {
    size: 120,
    color: "#4f46e5",
    radius: 12,
    duration: 0.25,
    enterOpacity: 0,
    enterScale: 1,
    enterY: 12,
    exitOpacity: 0,
    exitScale: 1,
    exitY: 12,
  },
};
