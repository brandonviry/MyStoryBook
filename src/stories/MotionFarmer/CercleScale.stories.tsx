import type { Meta, StoryObj } from "@storybook/react-vite";
import { motion } from "motion/react";
import CercleScale from "./CercleScale";

type StoryArgs = {
  size: number;
  color: string;
  duration: number;
  scaleFrom: number;
  scaleTo: number;
  isActive: boolean;
};

type TransformContext = {
  args: StoryArgs;
};

const meta: Meta<StoryArgs> = {
  title: "MotionFarmer/Tutorial/CercleScale",
  component: CercleScale,
  parameters: {
    // Centre pour bien voir l'apparition.
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "number", min: 8, max: 120, step: 2 },
      description: "Diametre du cercle en pixels.",
    },
    color: {
      control: "color",
      description: "Couleur du cercle.",
    },
    duration: {
      control: { type: "number", min: 0.1, max: 2, step: 0.1 },
      description: "Duree de l'apparition en secondes.",
    },
    scaleFrom: {
      control: { type: "number", min: 0, max: 1, step: 0.05 },
      description: "Scale de depart.",
    },
    scaleTo: {
      control: { type: "number", min: 0.5, max: 1.5, step: 0.05 },
      description: "Scale final.",
    },
    isActive: {
      control: "boolean",
      description: "Active ou masque le cercle.",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Theorique: Story = {
  render: (args) => (
    <motion.div
      style={{
        width: `${args.size}px`,
        height: `${args.size}px`,
        borderRadius: "999px",
        backgroundColor: args.color,
      }}
      initial={{ opacity: 0, scale: args.scaleFrom }}
      animate={args.isActive ? { opacity: 1, scale: args.scaleTo } : { opacity: 0, scale: args.scaleFrom }}
      transition={{ duration: args.duration }}
    />
  ),
  parameters: {
    docs: {
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args as StoryArgs;

          return `import { motion } from "motion/react";

<motion.div
  style={{
    width: "${args.size}px",
    height: "${args.size}px",
    borderRadius: "999px",
    backgroundColor: "${args.color}",
  }}
  initial={{ opacity: 0, scale: ${args.scaleFrom} }}
  animate={{ opacity: ${args.isActive ? 1 : 0}, scale: ${args.isActive ? args.scaleTo : args.scaleFrom} }}
  transition={{ duration: ${args.duration} }}
/>`;
        },
      },
    },
  },
  args: {
    size: 48,
    color: "#16a34a",
    duration: 0.5,
    scaleFrom: 0,
    scaleTo: 1,
    isActive: true,
  },
};

export const Pratique1: Story = {
  name: "Pratique 1",
  render: (args) => {
    const hasNotification = args.isActive;

    return (
      <div style={{ display: "grid", gap: "10px", justifyItems: "center" }}>
        <div
          style={{
            position: "relative",
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            display: "grid",
            placeItems: "center",
            fontSize: "20px",
          }}
        >
          🔔
          <div style={{ position: "absolute", top: "-6px", right: "-6px" }}>
            <motion.div
              style={{
                width: `${args.size}px`,
                height: `${args.size}px`,
                borderRadius: "999px",
                backgroundColor: args.color,
              }}
              initial={{ opacity: 0, scale: args.scaleFrom }}
              animate={
                hasNotification
                  ? { opacity: 1, scale: args.scaleTo }
                  : { opacity: 0, scale: args.scaleFrom }
              }
              transition={{ duration: args.duration }}
            />
          </div>
        </div>
        <div style={{ fontSize: "12px", color: "#6b7280" }}>
          Condition reelle: badge visible si un message arrive.
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cas reel: badge de notification. Le cercle apparait uniquement quand une notification est presente.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args as StoryArgs;

          return `import { motion } from "motion/react";

const hasNotification = ${args.isActive};

<div style={{ position: "relative", width: "42px", height: "42px" }}>
  <div>🔔</div>
  <div style={{ position: "absolute", top: "-6px", right: "-6px" }}>
    <motion.div
      style={{
        width: "${args.size}px",
        height: "${args.size}px",
        borderRadius: "999px",
        backgroundColor: "${args.color}",
      }}
      initial={{ opacity: 0, scale: ${args.scaleFrom} }}
      animate={hasNotification ? { opacity: 1, scale: ${args.scaleTo} } : { opacity: 0, scale: ${args.scaleFrom} }}
      transition={{ duration: ${args.duration} }}
    />
  </div>
</div>`;
        },
      },
    },
  },
  args: {
    size: 12,
    color: "#ef4444",
    duration: 0.2,
    scaleFrom: 0,
    scaleTo: 1,
    isActive: true,
  },
};

export const Pratique2: Story = {
  name: "Pratique 2",
  render: (args) => {
    const isValid = args.isActive;

    return (
      <div style={{ display: "grid", gap: "10px", width: "260px" }}>
        <label style={{ fontSize: "12px", color: "#6b7280" }}>Email</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            padding: "10px 12px",
          }}
        >
          <input
            type="text"
            value="contact@exemple.com"
            readOnly
            style={{ border: "none", outline: "none", width: "100%" }}
          />
          <motion.div
            style={{
              width: `${args.size}px`,
              height: `${args.size}px`,
              borderRadius: "999px",
              backgroundColor: args.color,
            }}
            initial={{ opacity: 0, scale: args.scaleFrom }}
            animate={isValid ? { opacity: 1, scale: args.scaleTo } : { opacity: 0, scale: args.scaleFrom }}
            transition={{ duration: args.duration }}
          />
        </div>
        <div style={{ fontSize: "12px", color: "#6b7280" }}>
          Condition reelle: cercle visible si le champ est valide.
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cas reel: validation de formulaire. Le cercle apparait uniquement quand le champ est valide.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args as StoryArgs;

          return `import { motion } from "motion/react";

const isValid = ${args.isActive};

<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <input value="contact@exemple.com" readOnly />
  <motion.div
    style={{
      width: "${args.size}px",
      height: "${args.size}px",
      borderRadius: "999px",
      backgroundColor: "${args.color}",
    }}
    initial={{ opacity: 0, scale: ${args.scaleFrom} }}
    animate={isValid ? { opacity: 1, scale: ${args.scaleTo} } : { opacity: 0, scale: ${args.scaleFrom} }}
    transition={{ duration: ${args.duration} }}
  />
</div>`;
        },
      },
    },
  },
  args: {
    size: 10,
    color: "#22c55e",
    duration: 0.25,
    scaleFrom: 0,
    scaleTo: 1,
    isActive: true,
  },
};

export const Pratique3: Story = {
  name: "Pratique 3",
  render: (args) => {
    const isOnline = args.isActive;

    return (
      <div style={{ display: "grid", gap: "10px", justifyItems: "center" }}>
        <div
          style={{
            width: "96px",
            height: "96px",
            borderRadius: "999px",
            background: "#e5e7eb",
            display: "grid",
            placeItems: "center",
            fontSize: "28px",
          }}
        >
          🙂
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <motion.div
            style={{
              width: `${args.size}px`,
              height: `${args.size}px`,
              borderRadius: "999px",
              backgroundColor: args.color,
            }}
            initial={{ opacity: 0, scale: args.scaleFrom }}
            animate={isOnline ? { opacity: 1, scale: args.scaleTo } : { opacity: 0, scale: args.scaleFrom }}
            transition={{ duration: args.duration }}
          />
          <span style={{ fontSize: "12px", color: "#6b7280" }}>
            {isOnline ? "En ligne" : "Hors ligne"}
          </span>
        </div>
        <div style={{ fontSize: "12px", color: "#6b7280" }}>
          Condition reelle: indicateur visible si l'utilisateur est en ligne.
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cas reel: presence utilisateur. Le cercle apparait uniquement si l'utilisateur est en ligne.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args as StoryArgs;

          return `import { motion } from "motion/react";

const isOnline = ${args.isActive};

<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <motion.div
    style={{
      width: "${args.size}px",
      height: "${args.size}px",
      borderRadius: "999px",
      backgroundColor: "${args.color}",
    }}
    initial={{ opacity: 0, scale: ${args.scaleFrom} }}
    animate={isOnline ? { opacity: 1, scale: ${args.scaleTo} } : { opacity: 0, scale: ${args.scaleFrom} }}
    transition={{ duration: ${args.duration} }}
  />
  <span>{isOnline ? "En ligne" : "Hors ligne"}</span>
</div>`;
        },
      },
    },
  },
  args: {
    size: 8,
    color: "#22c55e",
    duration: 0.2,
    scaleFrom: 0,
    scaleTo: 1,
    isActive: true,
  },
};

