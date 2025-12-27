import { ModelTool } from "../types";

export const TOOLS: ModelTool[] = [
  {
    id: "bg-remover",
    name: "Background Eraser",
    description:
      "Instantly remove backgrounds using optimized on-device edge detection.",
    icon: "✨",
    category: "image",
  },
  {
    id: "translator",
    name: "Multi-Lingual Bridge",
    description: "Transform text across 100+ languages with neural precision.",
    icon: "🌍",
    category: "text",
  },
  {
    id: "image-gen",
    name: "Nano Banana Pro Gen",
    description: "State-of-the-art image generation (1K, 2K, 4K resolution).",
    icon: "🍌",
    category: "pro",
  },
  {
    id: "chatbot",
    name: "Gemini Pro Chat",
    description: "Deep reasoning AI assistant for complex problem solving.",
    icon: "🤖",
    category: "text",
  },
];
