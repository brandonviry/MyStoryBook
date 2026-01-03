import { useRef } from "react";
import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { motion, useScroll } from "motion/react";
import type { MotionValue } from "motion/react";

type StoryArgs = {
  size: number;
  cardColor: string;
  radius: number;
  duration: number;
  offsetY: number;
  progressHeight: number;
  progressColor: string;
};

type TransformContext = {
  args: StoryArgs;
};

const meta: Meta<StoryArgs> = {
  title: "MotionFarmer/Tutorial/ScrollAnimation",
  parameters: {
    // Cadre plus grand pour simuler le scroll sans "manger" la page.
    layout: "fullscreen",
  },
  argTypes: {
    size: {
      control: { type: "number", min: 60, max: 180, step: 10 },
      description: "Taille du bloc principal.",
    },
    cardColor: {
      control: "color",
      description: "Couleur des blocs.",
    },
    radius: {
      control: { type: "number", min: 0, max: 24, step: 2 },
      description: "Arrondi des coins.",
    },
    duration: {
      control: { type: "number", min: 0.2, max: 1.2, step: 0.1 },
      description: "Duree de l'animation.",
    },
    offsetY: {
      control: { type: "number", min: -80, max: 120, step: 10 },
      description: "Decalage vertical de depart.",
    },
    progressHeight: {
      control: { type: "number", min: 2, max: 16, step: 1 },
      description: "Hauteur de la barre de progression.",
    },
    progressColor: {
      control: "color",
      description: "Couleur de la barre de progression.",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<StoryArgs>;

const ScrollStage = ({
  children,
}: {
  children: (params: { scrollYProgress: MotionValue<number> }) => ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div
      ref={containerRef}
      style={{
        height: "72vh",
        overflowY: "auto",
        padding: "20px 16px",
        borderRadius: "12px",
        background:
          "linear-gradient(180deg, rgba(249,250,251,1) 0%, rgba(229,231,235,1) 100%)",
      }}
    >
      {children({ scrollYProgress })}
    </div>
  );
};

const ProgressBar = ({
  height,
  color,
  progress,
}: {
  height: number;
  color: string;
  progress: MotionValue<number>;
}) => (
  <motion.div
    style={{
      position: "sticky",
      top: 0,
      height: `${height}px`,
      backgroundColor: color,
      transformOrigin: "0 50%",
      scaleX: progress,
      zIndex: 1,
    }}
  />
);

export const Theorique: Story = {
  render: (args) => (
    <ScrollStage>
      {({ scrollYProgress }) => (
        <div style={{ display: "grid", gap: "16px" }}>
          <ProgressBar
            height={args.progressHeight}
            color={args.progressColor}
            progress={scrollYProgress}
          />
          <div style={{ height: "40vh" }}>
            <div style={{ fontWeight: 600 }}>Cas theorique</div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              La barre se remplit avec scrollYProgress, et le bloc apparait
              quand il entre dans la vue.
            </div>
          </div>
          <motion.div
            style={{
              width: `${args.size}px`,
              height: `${args.size}px`,
              borderRadius: `${args.radius}px`,
              backgroundColor: args.cardColor,
            }}
            initial={{ opacity: 0, y: args.offsetY }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: args.duration }}
            viewport={{ once: true }}
          />
          <div style={{ height: "50vh" }} />
        </div>
      )}
    </ScrollStage>
  ),
  parameters: {
    docs: {
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args;

          return `import { useRef } from "react";
import { motion, useScroll } from "motion/react";

const containerRef = useRef(null);
const { scrollYProgress } = useScroll({ container: containerRef });

<div ref={containerRef} style={{ height: "72vh", overflowY: "auto" }}>
  <motion.div
    style={{
      position: "sticky",
      top: 0,
      height: "${args.progressHeight}px",
      backgroundColor: "${args.progressColor}",
      transformOrigin: "0 50%",
      scaleX: scrollYProgress,
    }}
  />
  <motion.div
    style={{
      width: "${args.size}px",
      height: "${args.size}px",
      borderRadius: "${args.radius}px",
      backgroundColor: "${args.cardColor}",
    }}
    initial={{ opacity: 0, y: ${args.offsetY} }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: ${args.duration} }}
    viewport={{ once: true }}
  />
</div>`;
        },
      },
    },
  },
  args: {
    size: 100,
    cardColor: "#fde68a",
    radius: 8,
    duration: 0.5,
    offsetY: 50,
    progressHeight: 6,
    progressColor: "#0ea5e9",
  },
};

export const Pratique1: Story = {
  name: "Pratique 1",
  render: (args) => (
    <ScrollStage>
      {({ scrollYProgress }) => (
        <div style={{ display: "grid", gap: "16px" }}>
          <ProgressBar
            height={args.progressHeight}
            color={args.progressColor}
            progress={scrollYProgress}
          />
          <motion.div
            style={{
              width: "340px",
              padding: "16px",
              borderRadius: `${args.radius}px`,
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              display: "grid",
              gap: "10px",
            }}
            initial={{ opacity: 0, y: args.offsetY }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: args.duration }}
            viewport={{ once: true }}
          >
            <div style={{ fontWeight: 600 }}>Article: tendances UI</div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              Reveal d'une carte au scroll sur une page blog.
            </div>
            <div
              style={{
                height: "120px",
                borderRadius: `${args.radius}px`,
                backgroundColor: args.cardColor,
              }}
            />
          </motion.div>
          <div style={{ height: "50vh" }} />
        </div>
      )}
    </ScrollStage>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Cas reel: page article avec barre de progression et reveal d'une carte.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args;

          return `import { useRef } from "react";
import { motion, useScroll } from "motion/react";

const containerRef = useRef(null);
const { scrollYProgress } = useScroll({ container: containerRef });

<div ref={containerRef} style={{ height: "72vh", overflowY: "auto" }}>
  <motion.div
    style={{
      position: "sticky",
      top: 0,
      height: "${args.progressHeight}px",
      backgroundColor: "${args.progressColor}",
      transformOrigin: "0 50%",
      scaleX: scrollYProgress,
    }}
  />
  <motion.div
    style={{
      width: "340px",
      padding: "16px",
      borderRadius: "${args.radius}px",
      background: "#ffffff",
      border: "1px solid #e5e7eb",
      display: "grid",
      gap: "10px",
    }}
    initial={{ opacity: 0, y: ${args.offsetY} }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: ${args.duration} }}
    viewport={{ once: true }}
  >
    <div style={{ fontWeight: 600 }}>Article: tendances UI</div>
    <div style={{ fontSize: "12px", color: "#6b7280" }}>
      Reveal d'une carte au scroll sur une page blog.
    </div>
    <div
      style={{
        height: "120px",
        borderRadius: "${args.radius}px",
        backgroundColor: "${args.cardColor}",
      }}
    />
  </motion.div>
</div>`;
        },
      },
    },
  },
  args: {
    size: 100,
    cardColor: "#fde68a",
    radius: 12,
    duration: 0.5,
    offsetY: 40,
    progressHeight: 6,
    progressColor: "#0ea5e9",
  },
};

export const Pratique2: Story = {
  name: "Pratique 2",
  render: (args) => (
    <ScrollStage>
      {({ scrollYProgress }) => (
        <div style={{ display: "grid", gap: "16px" }}>
          <ProgressBar
            height={args.progressHeight}
            color={args.progressColor}
            progress={scrollYProgress}
          />
          {["Section 1", "Section 2", "Section 3"].map((title) => (
            <motion.div
              key={title}
              style={{
                width: "320px",
                padding: "14px",
                borderRadius: `${args.radius}px`,
                background: "#ffffff",
                border: "1px solid #e5e7eb",
              }}
              initial={{ opacity: 0, y: args.offsetY }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: args.duration }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div style={{ fontWeight: 600 }}>{title}</div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                Reveal progressif des sections sur une page longue.
              </div>
            </motion.div>
          ))}
          <div style={{ height: "40vh" }} />
        </div>
      )}
    </ScrollStage>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Cas reel: page de documentation longue avec progression et reveal.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args;

          return `import { useRef } from "react";
import { motion, useScroll } from "motion/react";

const containerRef = useRef(null);
const { scrollYProgress } = useScroll({ container: containerRef });

<div ref={containerRef} style={{ height: "72vh", overflowY: "auto" }}>
  <motion.div
    style={{
      position: "sticky",
      top: 0,
      height: "${args.progressHeight}px",
      backgroundColor: "${args.progressColor}",
      transformOrigin: "0 50%",
      scaleX: scrollYProgress,
    }}
  />
  {["Section 1", "Section 2", "Section 3"].map((title) => (
    <motion.div
      key={title}
      style={{
        width: "320px",
        padding: "14px",
        borderRadius: "${args.radius}px",
        background: "#ffffff",
        border: "1px solid #e5e7eb",
      }}
      initial={{ opacity: 0, y: ${args.offsetY} }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: ${args.duration} }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div style={{ fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: "12px", color: "#6b7280" }}>
        Reveal progressif des sections sur une page longue.
      </div>
    </motion.div>
  ))}
</div>`;
        },
      },
    },
  },
  args: {
    size: 100,
    cardColor: "#fde68a",
    radius: 12,
    duration: 0.5,
    offsetY: 30,
    progressHeight: 6,
    progressColor: "#0ea5e9",
  },
};

export const Pratique3: Story = {
  name: "Pratique 3",
  render: (args) => (
    <ScrollStage>
      {({ scrollYProgress }) => (
        <div style={{ display: "grid", gap: "16px" }}>
          <ProgressBar
            height={args.progressHeight}
            color={args.progressColor}
            progress={scrollYProgress}
          />
          <motion.div
            style={{
              width: "300px",
              padding: "16px",
              borderRadius: `${args.radius}px`,
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              display: "grid",
              gap: "12px",
            }}
            initial={{ opacity: 0, y: args.offsetY }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: args.duration }}
            viewport={{ once: true }}
          >
            <div style={{ fontWeight: 600 }}>Inscription newsletter</div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              Un CTA qui apparait au scroll sur une landing page.
            </div>
            <motion.button
              type="button"
              style={{
                padding: "10px 12px",
                borderRadius: `${args.radius}px`,
                border: "1px solid #e5e7eb",
                background: args.cardColor,
                fontWeight: 600,
              }}
              initial={{ opacity: 0, y: args.offsetY }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: args.duration }}
              viewport={{ once: true }}
            >
              S'inscrire
            </motion.button>
          </motion.div>
          <div style={{ height: "40vh" }} />
        </div>
      )}
    </ScrollStage>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Cas reel: CTA d'inscription avec reveal et progression de lecture.",
      },
      source: {
        transform: (_code: string, context: TransformContext) => {
          const args = context.args;

          return `import { useRef } from "react";
import { motion, useScroll } from "motion/react";

const containerRef = useRef(null);
const { scrollYProgress } = useScroll({ container: containerRef });

<div ref={containerRef} style={{ height: "72vh", overflowY: "auto" }}>
  <motion.div
    style={{
      position: "sticky",
      top: 0,
      height: "${args.progressHeight}px",
      backgroundColor: "${args.progressColor}",
      transformOrigin: "0 50%",
      scaleX: scrollYProgress,
    }}
  />
  <motion.div
    style={{
      width: "300px",
      padding: "16px",
      borderRadius: "${args.radius}px",
      background: "#ffffff",
      border: "1px solid #e5e7eb",
      display: "grid",
      gap: "12px",
    }}
    initial={{ opacity: 0, y: ${args.offsetY} }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: ${args.duration} }}
    viewport={{ once: true }}
  >
    <div style={{ fontWeight: 600 }}>Inscription newsletter</div>
    <div style={{ fontSize: "12px", color: "#6b7280" }}>
      Un CTA qui apparait au scroll sur une landing page.
    </div>
    <motion.button
      type="button"
      style={{
        padding: "10px 12px",
        borderRadius: "${args.radius}px",
        border: "1px solid #e5e7eb",
        background: "${args.cardColor}",
        fontWeight: 600,
      }}
      initial={{ opacity: 0, y: ${args.offsetY} }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: ${args.duration} }}
      viewport={{ once: true }}
    >
      S'inscrire
    </motion.button>
  </motion.div>
</div>`;
        },
      },
    },
  },
  args: {
    size: 100,
    cardColor: "#fde68a",
    radius: 12,
    duration: 0.55,
    offsetY: 40,
    progressHeight: 6,
    progressColor: "#0ea5e9",
  },
};
