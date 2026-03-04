export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  icon: string;
  isDefault?: boolean;
}

export const AI_MODELS: AIModel[] = [
  {
    id: "anthropic/claude-sonnet-4.5",
    name: "Claude Sonnet 4.5",
    provider: "Anthropic",
    description: "Balanced - smart, fast, cost-effective",
    icon: "\u{1F7E3}",
    isDefault: true,
  },
  {
    id: "openai/gpt-4.1",
    name: "GPT-4.1",
    provider: "OpenAI",
    description: "Latest GPT, powerful all-rounder",
    icon: "\u{1F7E2}",
  },
  {
    id: "openai/gpt-4.1-mini",
    name: "GPT-4.1 Mini",
    provider: "OpenAI",
    description: "Fast & affordable",
    icon: "\u{1F7E2}",
  },
  {
    id: "google/gemini-3-flash-preview",
    name: "Gemini 3 Flash",
    provider: "Google",
    description: "Ultra fast response",
    icon: "\u{1F535}",
  },
  {
    id: "anthropic/claude-haiku-4.5",
    name: "Claude Haiku 4.5",
    provider: "Anthropic",
    description: "Speed-optimized",
    icon: "\u{1F7E3}",
  },
  {
    id: "deepseek/deepseek-v3.2",
    name: "DeepSeek V3.2",
    provider: "DeepSeek",
    description: "High quality, low cost",
    icon: "\u{1F7E0}",
  },
  {
    id: "meta-llama/llama-4-maverick",
    name: "Llama 4 Maverick",
    provider: "Meta",
    description: "Latest open-source",
    icon: "\u{1F7E4}",
  },
  {
    id: "mistralai/mistral-large-2512",
    name: "Mistral Large 3",
    provider: "Mistral",
    description: "European multilingual",
    icon: "\u{1F534}",
  },
  {
    id: "qwen/qwen3.5-27b",
    name: "Qwen 3.5 27B",
    provider: "Alibaba",
    description: "Multilingual expert",
    icon: "\u{1F7E1}",
  },
  {
    id: "openai/gpt-4.1-nano",
    name: "GPT-4.1 Nano",
    provider: "OpenAI",
    description: "Ultra fast, cheapest",
    icon: "\u{1F7E2}",
  },
];

export const DEFAULT_MODEL = AI_MODELS.find((m) => m.isDefault)!;
