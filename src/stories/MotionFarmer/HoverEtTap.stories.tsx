import type { Meta, StoryObj } from "@storybook/react-vite";
import { motion } from "motion/react";
import HoverEtTap from "./HoverEtTap.tsx";

type StoryArgs = {
  size: number;
  color: string;
  scaleHover: number;
  scaleTap: number;
  radius: number;
  duration: number;
};

type TransformContext = {
  args: StoryArgs;
};

const meta: Meta<StoryArgs> = {
  title: "MotionFarmer/Tutorial/HoverEtTap",
  component: HoverEtTap,
  parameters: {
    // Centre pour tester l'interaction.
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "number", min: 40, max: 240, step: 5 },
      description: "Taille du bloc en pixels.",
    },
    color: {
      control: "color",
      description: "Couleur du bloc.",
    },
    scaleHover: {
      control: { type: "number", min: 0.8, max: 1.3, step: 0.02 },
      description: "Scale au survol.",
    },
    scaleTap: {
      control: { type: "number", min: 0.8, max: 1.3, step: 0.02 },
      description: "Scale au clic/tap.",
    },
    radius: {
      control: { type: "number", min: 0, max: 48, step: 2 },
      description: "Arrondi des coins.",
    },
    duration: {
      control: { type: "number", min: 0.05, max: 0.6, step: 0.05 },
      description: "Duree de l'animation.",
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
        backgroundColor: args.color,
        borderRadius: `${args.radius}px`,
      }}
      whileHover={{ scale: args.scaleHover }}
      whileTap={{ scale: args.scaleTap }}
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
    backgroundColor: "${args.color}",
    borderRadius: "${args.radius}px",
  }}
  whileHover={{ scale: ${args.scaleHover} }}
  whileTap={{ scale: ${args.scaleTap} }}
  transition={{ duration: ${args.duration} }}
/>`;
        },
      },
    },
  },
  args: {
    size: 120,
    color: "#0ea5e9",
    scaleHover: 1.06,
    scaleTap: 0.94,
    radius: 12,
    duration: 0.2,
  },
};

export const Pratique1: Story = {
  name: "Pratique 1",
  render: (args) => (
    <motion.button
      type="button"
      style={{
        padding: "12px 18px",
        borderRadius: `${args.radius}px`,
        border: "1px solid #e5e7eb",
        background: args.color,
        color: "#0f172a",
        fontWeight: 600,
      }}
      whileHover={{ scale: args.scaleHover }}
      whileTap={{ scale: args.scaleTap }}
      transition={{ duration: args.duration }}
    >
      Acheter
    </motion.button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Cas reel: bouton d'action principal. L'effet hover/tap donne un retour immediat.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args as StoryArgs;

          return `import { motion } from "motion/react";

<motion.button
  type="button"
  style={{
    padding: "12px 18px",
    borderRadius: "${args.radius}px",
    border: "1px solid #e5e7eb",
    background: "${args.color}",
    color: "#0f172a",
    fontWeight: 600,
  }}
  whileHover={{ scale: ${args.scaleHover} }}
  whileTap={{ scale: ${args.scaleTap} }}
  transition={{ duration: ${args.duration} }}
>
  Acheter
</motion.button>`;
        },
      },
    },
  },
  args: {
    size: 120,
    color: "#fde68a",
    scaleHover: 1.03,
    scaleTap: 0.96,
    radius: 12,
    duration: 0.15,
  },
};

export const Pratique2: Story = {
  name: "Pratique 2",
  render: (args) => (
    <motion.div
      style={{
        width: "220px",
        padding: "12px",
        borderRadius: `${args.radius}px`,
        border: "1px solid #e5e7eb",
        display: "grid",
        gap: "10px",
      }}
      whileHover={{ scale: args.scaleHover }}
      whileTap={{ scale: args.scaleTap }}
      transition={{ duration: args.duration }}
    >
      <div
        style={{
          height: "120px",
          borderRadius: "10px",
          background: args.color,
        }}
      />
      <div style={{ fontWeight: 600 }}>Carte produit</div>
      <div style={{ fontSize: "12px", color: "#6b7280" }}>
        Cas reel: carte clickable dans un catalogue.
      </div>
    </motion.div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Cas reel: carte produit. L'animation renforce l'idee de clic.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args as StoryArgs;

          return `import { motion } from "motion/react";

<motion.div
  style={{
    width: "220px",
    padding: "12px",
    borderRadius: "${args.radius}px",
    border: "1px solid #e5e7eb",
    display: "grid",
    gap: "10px",
  }}
  whileHover={{ scale: ${args.scaleHover} }}
  whileTap={{ scale: ${args.scaleTap} }}
  transition={{ duration: ${args.duration} }}
>
  <div
    style={{
      height: "120px",
      borderRadius: "10px",
      background: "${args.color}",
    }}
  />
  <div style={{ fontWeight: 600 }}>Carte produit</div>
  <div style={{ fontSize: "12px", color: "#6b7280" }}>
    Cas reel: carte clickable dans un catalogue.
  </div>
</motion.div>`;
        },
      },
    },
  },
  args: {
    size: 120,
    color: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
    scaleHover: 1.02,
    scaleTap: 0.98,
    radius: 14,
    duration: 0.18,
  },
};

export const Pratique3: Story = {
  name: "Pratique 3",
  render: (args) => (
    <motion.div
      style={{
        width: "260px",
        padding: "14px",
        borderRadius: `${args.radius}px`,
        border: "1px solid #e5e7eb",
        display: "grid",
        gap: "10px",
      }}
      whileHover={{ scale: args.scaleHover }}
      whileTap={{ scale: args.scaleTap }}
      transition={{ duration: args.duration }}
    >
      <div style={{ fontWeight: 600 }}>Plan Pro</div>
      <div style={{ fontSize: "12px", color: "#6b7280" }}>
        Cas reel: selection d'un plan tarifaire.
      </div>
      <div
        style={{
          height: "8px",
          borderRadius: "999px",
          background: args.color,
        }}
      />
    </motion.div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Cas reel: carte de pricing. Le hover/tap confirme la selection.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args as StoryArgs;

          return `import { motion } from "motion/react";

<motion.div
  style={{
    width: "260px",
    padding: "14px",
    borderRadius: "${args.radius}px",
    border: "1px solid #e5e7eb",
    display: "grid",
    gap: "10px",
  }}
  whileHover={{ scale: ${args.scaleHover} }}
  whileTap={{ scale: ${args.scaleTap} }}
  transition={{ duration: ${args.duration} }}
>
  <div style={{ fontWeight: 600 }}>Plan Pro</div>
  <div style={{ fontSize: "12px", color: "#6b7280" }}>
    Cas reel: selection d'un plan tarifaire.
  </div>
  <div
    style={{
      height: "8px",
      borderRadius: "999px",
      background: "${args.color}",
    }}
  />
</motion.div>`;
        },
      },
    },
  },
  args: {
    size: 120,
    color: "#22c55e",
    scaleHover: 1.02,
    scaleTap: 0.97,
    radius: 16,
    duration: 0.2,
  },
};
