import type { Meta, StoryObj } from "@storybook/react-vite";
import { motion } from "motion/react";

type StoryArgs = {
  size: number;
  color: string;
  duration: number;
  rotate: number;
  loop: boolean;
  isActive: boolean;
};

type TransformContext = {
  args: StoryArgs;
};

const meta: Meta<StoryArgs> = {
  title: "MotionFarmer/Tutorial/CarrerAnimate360",
  parameters: {
    // Centre le carre pour voir clairement la rotation.
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "number", min: 20, max: 300, step: 10 },
      description: "Taille du carre en pixels.",
    },
    color: {
      control: "color",
      description: "Couleur du carre.",
    },
    duration: {
      control: { type: "number", min: 0.2, max: 10, step: 0.1 },
      description: "Duree de l'animation en secondes.",
    },
    rotate: {
      control: { type: "number", min: 0, max: 720, step: 10 },
      description: "Angle total de rotation.",
    },
    loop: {
      control: "boolean",
      description: "Si actif, la rotation tourne en boucle.",
    },
    isActive: {
      control: "boolean",
      description: "Active ou met en pause l'animation.",
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
      }}
      animate={{ rotate: args.isActive ? args.rotate : 0 }}
      transition={{
        duration: args.duration,
        repeat: args.isActive && args.loop ? Infinity : 0,
      }}
    />
  ),
  parameters: {
    docs: {
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args as StoryArgs;

          return `import { motion } from "motion/react";

<motion.div
  style={{ width: "${args.size}px", height: "${args.size}px", backgroundColor: "${args.color}" }}
  animate={{ rotate: ${args.isActive ? args.rotate : 0} }}
  transition={{ duration: ${args.duration}, repeat: ${args.isActive && args.loop ? "Infinity" : 0} }}
/>`;
        },
      },
    },
  },
  args: {
    size: 100,
    color: "rgba(0, 0, 255, 1)",
    duration: 3,
    rotate: 360,
    loop: false,
    isActive: true,
  },
};

export const Pratique1: Story = {
  name: "Pratique 1",
  render: (args) => {
    const isLoading = args.isActive;

    return (
      <div style={{ display: "grid", gap: "12px", justifyItems: "center" }}>
        <motion.div
          style={{
            width: `${args.size}px`,
            height: `${args.size}px`,
            backgroundColor: args.color,
          }}
          animate={{ rotate: isLoading ? args.rotate : 0 }}
          transition={{
            duration: args.duration,
            repeat: isLoading && args.loop ? Infinity : 0,
          }}
        />
        <p style={{ maxWidth: "320px", fontSize: "14px", textAlign: "center" }}>
          Cas reel: badge de chargement. La rotation n'apparait que quand une
          action est en cours (ex: upload).
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cas d'usage reel: un badge de chargement ou un etat d'action qui tourne rapidement pour signaler une operation en cours (ex: paiement, upload, synchronisation).",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args as StoryArgs;

          return `import { motion } from "motion/react";

const isLoading = ${args.isActive};

<div style={{ display: "grid", gap: "12px", justifyItems: "center" }}>
  <motion.div
    style={{ width: "${args.size}px", height: "${args.size}px", backgroundColor: "${args.color}" }}
    animate={{ rotate: isLoading ? ${args.rotate} : 0 }}
    transition={{ duration: ${args.duration}, repeat: isLoading && ${args.loop} ? Infinity : 0 }}
  />
  <p style={{ maxWidth: "320px", fontSize: "14px", textAlign: "center" }}>
    Cas reel: badge de chargement. La rotation n'apparait que quand une action
    est en cours (ex: upload).
  </p>
</div>`;
        },
      },
    },
  },
  args: {
    size: 64,
    color: "#1f6feb",
    duration: 0.8,
    rotate: 360,
    loop: true,
    isActive: true,
  },
};

export const Pratique2: Story = {
  name: "Pratique 2",
  render: (args) => {
    const isProcessing = args.isActive;

    return (
      <div
        style={{
          width: "280px",
          padding: "16px",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          display: "grid",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <motion.div
            style={{
              width: `${args.size}px`,
              height: `${args.size}px`,
              backgroundColor: args.color,
            }}
            animate={{ rotate: isProcessing ? args.rotate : 0 }}
            transition={{
              duration: args.duration,
              repeat: isProcessing && args.loop ? Infinity : 0,
            }}
          />
          <div>
            <div style={{ fontWeight: 600 }}>Paiement en cours</div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              Veuillez patienter...
            </div>
          </div>
        </div>
        <button
          type="button"
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            background: "#f9fafb",
            color: "#9ca3af",
          }}
          disabled
        >
          Confirmer
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cas d'usage reel: carte de paiement en cours de traitement. L'animation tourne tant que la confirmation n'est pas recue.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args as StoryArgs;

          return `import { motion } from "motion/react";

const isProcessing = ${args.isActive};

<div
  style={{
    width: "280px",
    padding: "16px",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    display: "grid",
    gap: "12px",
  }}
>
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <motion.div
      style={{ width: "${args.size}px", height: "${args.size}px", backgroundColor: "${args.color}" }}
      animate={{ rotate: isProcessing ? ${args.rotate} : 0 }}
      transition={{ duration: ${args.duration}, repeat: isProcessing && ${args.loop} ? Infinity : 0 }}
    />
    <div>
      <div style={{ fontWeight: 600 }}>Paiement en cours</div>
      <div style={{ fontSize: "12px", color: "#6b7280" }}>
        Veuillez patienter...
      </div>
    </div>
  </div>
  <button
    type="button"
    style={{
      width: "100%",
      padding: "8px 10px",
      borderRadius: "8px",
      border: "1px solid #e5e7eb",
      background: "#f9fafb",
      color: "#9ca3af",
    }}
    disabled
  >
    Confirmer
  </button>
</div>`;
        },
      },
    },
  },
  args: {
    size: 28,
    color: "#0ea5e9",
    duration: 0.9,
    rotate: 360,
    loop: true,
    isActive: true,
  },
};

export const Pratique3: Story = {
  name: "Pratique 3",
  render: (args) => {
    const isSyncing = args.isActive;

    return (
      <div style={{ display: "grid", gap: "10px", width: "240px" }}>
        <div style={{ fontSize: "12px", color: "#6b7280" }}>
          Statut: {isSyncing ? "Synchronisation..." : "A jour"}
        </div>
        <button
          type="button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 12px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            fontWeight: 600,
          }}
        >
          <motion.div
            style={{
              width: `${args.size}px`,
              height: `${args.size}px`,
              backgroundColor: args.color,
            }}
            animate={{ rotate: isSyncing ? args.rotate : 0 }}
            transition={{
              duration: args.duration,
              repeat: isSyncing && args.loop ? Infinity : 0,
            }}
          />
          Synchroniser
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cas d'usage reel: bouton de synchronisation. L'animation n'apparait que si une sync est active.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args as StoryArgs;

          return `import { motion } from "motion/react";

const isSyncing = ${args.isActive};

<div style={{ display: "grid", gap: "10px", width: "240px" }}>
  <div style={{ fontSize: "12px", color: "#6b7280" }}>
    Statut: {isSyncing ? "Synchronisation..." : "A jour"}
  </div>
  <button
    type="button"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 12px",
      borderRadius: "10px",
      border: "1px solid #e5e7eb",
      background: "#ffffff",
      fontWeight: 600,
    }}
  >
    <motion.div
      style={{ width: "${args.size}px", height: "${args.size}px", backgroundColor: "${args.color}" }}
      animate={{ rotate: isSyncing ? ${args.rotate} : 0 }}
      transition={{ duration: ${args.duration}, repeat: isSyncing && ${args.loop} ? Infinity : 0 }}
    />
    Synchroniser
  </button>
</div>`;
        },
      },
    },
  },
  args: {
    size: 16,
    color: "#22c55e",
    duration: 0.6,
    rotate: 360,
    loop: true,
    isActive: false,
  },
};

