import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { motion } from "motion/react";

type StoryArgs = {
  gap: number;
  fontSize: number;
  underlineHeight: number;
  underlineOffset: number;
  underlineColor: string;
  textColor: string;
};

type TransformContext = {
  args: StoryArgs;
};

const meta: Meta<StoryArgs> = {
  title: "MotionFarmer/Tutorial/MenuUnderline",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    gap: {
      control: { type: "number", min: 8, max: 48, step: 2 },
      description: "Espace entre les onglets.",
    },
    fontSize: {
      control: { type: "number", min: 12, max: 22, step: 1 },
      description: "Taille du texte.",
    },
    underlineHeight: {
      control: { type: "number", min: 2, max: 8, step: 1 },
      description: "Epaisseur de l'underline.",
    },
    underlineOffset: {
      control: { type: "number", min: 2, max: 12, step: 1 },
      description: "Decalage vertical de l'underline.",
    },
    underlineColor: {
      control: "color",
      description: "Couleur de l'underline.",
    },
    textColor: {
      control: "color",
      description: "Couleur du texte.",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Theorique: Story = {
  render: (args) => {
    const tabs = ["Accueil", "A propos", "Contact"];
    const [active, setActive] = useState(tabs[0]);

    return (
      <div style={{ display: "flex", gap: args.gap, color: args.textColor, fontSize: args.fontSize }}>
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
                  height: args.underlineHeight,
                  background: args.underlineColor,
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: -args.underlineOffset,
                  borderRadius: 4,
                }}
              />
            )}
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args;
          const tabs = ["Accueil", "A propos", "Contact"];

          return `import { motion } from "motion/react";
import { useState } from "react";

const tabs = ${JSON.stringify(tabs)};
const [active, setActive] = useState(tabs[0]);

<div style={{ display: "flex", gap: ${args.gap}, color: "${args.textColor}", fontSize: ${args.fontSize} }}>
  {tabs.map((tab) => (
    <div key={tab} onClick={() => setActive(tab)} style={{ position: "relative", cursor: "pointer" }}>
      {tab}
      {active === tab && (
        <motion.div
          layoutId="underline"
          style={{
            height: ${args.underlineHeight},
            background: "${args.underlineColor}",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -${args.underlineOffset},
            borderRadius: 4,
          }}
        />
      )}
    </div>
  ))}
</div>`;
        },
      },
    },
  },
  args: {
    gap: 30,
    fontSize: 16,
    underlineHeight: 3,
    underlineOffset: 6,
    underlineColor: "#4f46e5",
    textColor: "#0f172a",
  },
};

export const Pratique1: Story = {
  name: "Pratique 1",
  render: (args) => {
    const tabs = ["Produit", "Solutions", "Prix", "Docs"];
    const [active, setActive] = useState(tabs[0]);

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          padding: "10px 14px",
          borderRadius: "14px",
          border: "1px solid #e5e7eb",
          background: "#ffffff",
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div style={{ fontWeight: 800, letterSpacing: "0.4px" }}>FLOW</div>
        <div style={{ display: "flex", gap: args.gap, color: args.textColor, fontSize: args.fontSize }}>
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActive(tab)}
              style={{ position: "relative", cursor: "pointer", padding: "6px 0" }}
            >
              {tab}
              {active === tab && (
                <motion.div
                  layoutId="underline"
                  style={{
                    height: args.underlineHeight,
                    background: args.underlineColor,
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: -args.underlineOffset,
                    borderRadius: 999,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Cas reel: header SaaS avec navigation principale.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args;
          const tabs = ["Produit", "Solutions", "Prix", "Docs"];

          return `import { motion } from "motion/react";
import { useState } from "react";

const tabs = ${JSON.stringify(tabs)};
const [active, setActive] = useState(tabs[0]);

<div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
  <div style={{ fontWeight: 800 }}>FLOW</div>
  <div style={{ display: "flex", gap: ${args.gap}, color: "${args.textColor}", fontSize: ${args.fontSize} }}>
    {tabs.map((tab) => (
      <div key={tab} onClick={() => setActive(tab)} style={{ position: "relative", cursor: "pointer" }}>
        {tab}
        {active === tab && (
          <motion.div
            layoutId="underline"
            style={{
              height: ${args.underlineHeight},
              background: "${args.underlineColor}",
              position: "absolute",
              left: 0,
              right: 0,
              bottom: -${args.underlineOffset},
              borderRadius: 999,
            }}
          />
        )}
      </div>
    ))}
  </div>
</div>`;
        },
      },
    },
  },
  args: {
    gap: 22,
    fontSize: 14,
    underlineHeight: 3,
    underlineOffset: 6,
    underlineColor: "#4f46e5",
    textColor: "#0f172a",
  },
};

export const Pratique2: Story = {
  name: "Pratique 2",
  render: (args) => {
    const tabs = ["Overview", "Analytics", "Members", "Billing"];
    const [active, setActive] = useState(tabs[1]);

    return (
      <div
        style={{
          width: "520px",
          padding: "14px 16px",
          borderRadius: "14px",
          background: "#0f172a",
          color: "#e2e8f0",
          display: "grid",
          gap: "10px",
        }}
      >
        <div style={{ fontSize: "12px", color: "#94a3b8" }}>Equipe / Dashboard</div>
        <div style={{ display: "flex", gap: args.gap, fontSize: args.fontSize }}>
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActive(tab)}
              style={{ position: "relative", cursor: "pointer", color: "#e2e8f0" }}
            >
              {tab}
              {active === tab && (
                <motion.div
                  layoutId="underline"
                  style={{
                    height: args.underlineHeight,
                    background: args.underlineColor,
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: -args.underlineOffset,
                    borderRadius: 999,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Cas reel: onglets de dashboard avec underline subtil.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args;
          const tabs = ["Overview", "Analytics", "Members", "Billing"];

          return `import { motion } from "motion/react";
import { useState } from "react";

const tabs = ${JSON.stringify(tabs)};
const [active, setActive] = useState(tabs[1]);

<div style={{ display: "flex", gap: ${args.gap}, fontSize: ${args.fontSize} }}>
  {tabs.map((tab) => (
    <div key={tab} onClick={() => setActive(tab)} style={{ position: "relative", cursor: "pointer" }}>
      {tab}
      {active === tab && (
        <motion.div
          layoutId="underline"
          style={{
            height: ${args.underlineHeight},
            background: "${args.underlineColor}",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -${args.underlineOffset},
            borderRadius: 999,
          }}
        />
      )}
    </div>
  ))}
</div>`;
        },
      },
    },
  },
  args: {
    gap: 20,
    fontSize: 14,
    underlineHeight: 3,
    underlineOffset: 6,
    underlineColor: "#38bdf8",
    textColor: "#e2e8f0",
  },
};

export const Pratique3: Story = {
  name: "Pratique 3",
  render: (args) => {
    const tabs = ["Profil", "Securite", "Factures", "Notifications"];
    const [active, setActive] = useState(tabs[0]);

    return (
      <div
        style={{
          width: "520px",
          padding: "16px",
          borderRadius: "16px",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: "8px" }}>Parametres</div>
        <div style={{ display: "flex", gap: args.gap, fontSize: args.fontSize }}>
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActive(tab)}
              style={{ position: "relative", cursor: "pointer", color: "#0f172a" }}
            >
              {tab}
              {active === tab && (
                <motion.div
                  layoutId="underline"
                  style={{
                    height: args.underlineHeight,
                    background: args.underlineColor,
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: -args.underlineOffset,
                    borderRadius: 999,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Cas reel: onglets de parametres dans une application.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args;
          const tabs = ["Profil", "Securite", "Factures", "Notifications"];

          return `import { motion } from "motion/react";
import { useState } from "react";

const tabs = ${JSON.stringify(tabs)};
const [active, setActive] = useState(tabs[0]);

<div style={{ display: "flex", gap: ${args.gap}, fontSize: ${args.fontSize} }}>
  {tabs.map((tab) => (
    <div key={tab} onClick={() => setActive(tab)} style={{ position: "relative", cursor: "pointer" }}>
      {tab}
      {active === tab && (
        <motion.div
          layoutId="underline"
          style={{
            height: ${args.underlineHeight},
            background: "${args.underlineColor}",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -${args.underlineOffset},
            borderRadius: 999,
          }}
        />
      )}
    </div>
  ))}
</div>`;
        },
      },
    },
  },
  args: {
    gap: 18,
    fontSize: 14,
    underlineHeight: 3,
    underlineOffset: 6,
    underlineColor: "#4f46e5",
    textColor: "#0f172a",
  },
};
