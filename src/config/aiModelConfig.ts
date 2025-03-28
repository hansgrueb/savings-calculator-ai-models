
// Definizione dei tipi
export type UsageArea = {
  id: string;
  name: string;
  avgInputTokens: number; // Media di token di input per prompt
  avgOutputTokens: number; // Media di token di output per prompt
  icon: string; // Nome dell'icona Lucide da usare
};

export type AIModel = {
  id: string;
  name: string;
  inputCost: number; // Costo per 1000 token di input in $
  outputCost: number; // Costo per 1000 token di output in $
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
    icon: "pen-line"
  },
  {
    id: "graphics",
    name: "Grafica",
    avgInputTokens: 300,
    avgOutputTokens: 800,
    icon: "image"
  },
  {
    id: "video",
    name: "Produzione video",
    avgInputTokens: 500,
    avgOutputTokens: 1500,
    icon: "video"
  },
  {
    id: "dataAnalysis",
    name: "Analisi dei dati",
    avgInputTokens: 800,
    avgOutputTokens: 2000,
    icon: "bar-chart-2"
  },
  {
    id: "programming",
    name: "Programmazione",
    avgInputTokens: 600,
    avgOutputTokens: 2500,
    icon: "code"
  },
  {
    id: "onlineResearch",
    name: "Ricerca Online",
    avgInputTokens: 350,
    avgOutputTokens: 1800,
    icon: "search"
  },
  {
    id: "translations",
    name: "Traduzioni",
    avgInputTokens: 500,
    avgOutputTokens: 600,
    icon: "languages"
  },
  {
    id: "summaries",
    name: "Riassunti",
    avgInputTokens: 1000,
    avgOutputTokens: 400,
    icon: "file-text"
  }
];

// Definizione dei modelli AI disponibili
export const aiModels: AIModel[] = [
  {
    id: "gpt4o",
    name: "GPT-4o",
    inputCost: 0.005,
    outputCost: 0.015
  },
  {
    id: "gpt4omini",
    name: "GPT-4o-mini",
    inputCost: 0.0015,
    outputCost: 0.006
  },
  {
    id: "claude3opus",
    name: "Claude 3 Opus",
    inputCost: 0.015,
    outputCost: 0.075
  },
  {
    id: "claude3sonnet",
    name: "Claude 3 Sonnet",
    inputCost: 0.003,
    outputCost: 0.015
  },
  {
    id: "claude3haiku",
    name: "Claude 3 Haiku",
    inputCost: 0.00025,
    outputCost: 0.00125
  },
  {
    id: "llama3",
    name: "Llama 3 70B",
    inputCost: 0.0004,
    outputCost: 0.0012
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
    id: "perplexitypro",
    name: "Perplexity Pro",
    monthlyCost: 20,
    provider: "Perplexity"
  },
  {
    id: "custom",
    name: "Abbonamento Personalizzato",
    monthlyCost: 0,
    provider: "Altro"
  }
];
