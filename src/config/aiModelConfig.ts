
// Definizione dei tipi
export type UsageArea = {
  id: string;
  name: string;
  avgInputTokens: number; // Media di token di input per prompt
  avgOutputTokens: number; // Media di token di output per prompt
  icon: string; // Nome dell'icona Lucide da usare
  modelTypes: ModelType[]; // Tipi di modelli compatibili con questa area
};

export type ModelType = "text-to-text" | "text-to-image" | "text-to-video";

export type AIModel = {
  id: string;
  name: string;
  inputCost: number; // Costo per 1000 token di input in $
  outputCost: number; // Costo per 1000 token di output in $
  type: ModelType; // Tipo di modello
  provider: string; // Provider del modello
};

export type Subscription = {
  id: string;
  name: string;
  monthlyCost: number; // Costo mensile in $
  provider: string;
};

// Definizione degli ambiti di utilizzo con stime di token
export const usageAreas: UsageArea[] = [
  {
    id: "writing",
    name: "Scrittura",
    avgInputTokens: 400,
    avgOutputTokens: 1200,
    icon: "PenLine",
    modelTypes: ["text-to-text"]
  },
  {
    id: "graphics",
    name: "Grafica",
    avgInputTokens: 300,
    avgOutputTokens: 800,
    icon: "Image",
    modelTypes: ["text-to-text", "text-to-image"]
  },
  {
    id: "video",
    name: "Produzione video",
    avgInputTokens: 500,
    avgOutputTokens: 1500,
    icon: "Video",
    modelTypes: ["text-to-text", "text-to-video"]
  },
  {
    id: "dataAnalysis",
    name: "Analisi dei dati",
    avgInputTokens: 800,
    avgOutputTokens: 2000,
    icon: "BarChart2",
    modelTypes: ["text-to-text"]
  },
  {
    id: "programming",
    name: "Programmazione",
    avgInputTokens: 600,
    avgOutputTokens: 2500,
    icon: "Code",
    modelTypes: ["text-to-text"]
  },
  {
    id: "onlineResearch",
    name: "Ricerca Online",
    avgInputTokens: 350,
    avgOutputTokens: 1800,
    icon: "Search",
    modelTypes: ["text-to-text"]
  },
  {
    id: "translations",
    name: "Traduzioni",
    avgInputTokens: 500,
    avgOutputTokens: 600,
    icon: "Languages",
    modelTypes: ["text-to-text"]
  },
  {
    id: "summaries",
    name: "Riassunti",
    avgInputTokens: 1000,
    avgOutputTokens: 400,
    icon: "FileText",
    modelTypes: ["text-to-text"]
  }
];

// Definizione dei modelli AI disponibili
export const aiModels: AIModel[] = [
  {
    id: "gpt4o",
    name: "GPT-4o",
    inputCost: 0.005,
    outputCost: 0.015,
    type: "text-to-text",
    provider: "OpenAI"
  },
  {
    id: "gpt4omini",
    name: "GPT-4o-mini",
    inputCost: 0.0015,
    outputCost: 0.006,
    type: "text-to-text",
    provider: "OpenAI"
  },
  {
    id: "claude3opus",
    name: "Claude 3 Opus",
    inputCost: 0.015,
    outputCost: 0.075,
    type: "text-to-text",
    provider: "Anthropic"
  },
  {
    id: "claude3sonnet",
    name: "Claude 3 Sonnet",
    inputCost: 0.003,
    outputCost: 0.015,
    type: "text-to-text",
    provider: "Anthropic"
  },
  {
    id: "claude3haiku",
    name: "Claude 3 Haiku",
    inputCost: 0.00025,
    outputCost: 0.00125,
    type: "text-to-text",
    provider: "Anthropic"
  },
  {
    id: "llama3",
    name: "Llama 3 70B",
    inputCost: 0.0004,
    outputCost: 0.0012,
    type: "text-to-text",
    provider: "Meta"
  },
  {
    id: "dalle3",
    name: "DALL-E 3",
    inputCost: 0.04,
    outputCost: 0.08,
    type: "text-to-image",
    provider: "OpenAI"
  },
  {
    id: "midjourney",
    name: "Midjourney v6",
    inputCost: 0.05,
    outputCost: 0.1,
    type: "text-to-image",
    provider: "Midjourney"
  },
  {
    id: "sora",
    name: "Sora",
    inputCost: 0.1,
    outputCost: 0.2,
    type: "text-to-video",
    provider: "OpenAI"
  },
  {
    id: "runway",
    name: "Runway Gen-2",
    inputCost: 0.08,
    outputCost: 0.15,
    type: "text-to-video",
    provider: "Runway"
  }
];

// Definizione degli abbonamenti comuni
export const subscriptions: Subscription[] = [
  {
    id: "chatgptplus",
    name: "ChatGPT Plus",
    monthlyCost: 20,
    provider: "OpenAI"
  },
  {
    id: "chatgptteam",
    name: "ChatGPT Team",
    monthlyCost: 30,
    provider: "OpenAI"
  },
  {
    id: "chatgptenterprise",
    name: "ChatGPT Enterprise",
    monthlyCost: 60,
    provider: "OpenAI"
  },
  {
    id: "claudeproplus",
    name: "Claude Pro Plus",
    monthlyCost: 20,
    provider: "Anthropic"
  },
  {
    id: "claudeteam",
    name: "Claude Team",
    monthlyCost: 28,
    provider: "Anthropic"
  },
  {
    id: "midjourneypro",
    name: "Midjourney Pro",
    monthlyCost: 30,
    provider: "Midjourney"
  },
  {
    id: "midjourneystandard",
    name: "Midjourney Standard",
    monthlyCost: 10,
    provider: "Midjourney"
  },
  {
    id: "perplexitypro",
    name: "Perplexity Pro",
    monthlyCost: 20,
    provider: "Perplexity"
  },
  {
    id: "runwaygen",
    name: "Runway Pro",
    monthlyCost: 15,
    provider: "Runway"
  },
  {
    id: "custom",
    name: "Abbonamento Personalizzato",
    monthlyCost: 0,
    provider: "Altro"
  }
];
