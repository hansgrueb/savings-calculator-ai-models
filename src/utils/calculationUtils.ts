
import { UsageArea, AIModel, Subscription } from "@/config/aiModelConfig";

// Calcola i token totali mensili in base al numero di prompt al giorno e alle aree selezionate
export const calculateMonthlyTokens = (
  selectedAreas: UsageArea[],
  promptsPerDay: number
) => {
  // Assumiamo 30 giorni in un mese per semplificare
  const daysInMonth = 30;
  const totalPromptsPerMonth = promptsPerDay * daysInMonth;
  
  // Calcolo della media di token per tutti gli ambiti selezionati
  let totalInputTokens = 0;
  let totalOutputTokens = 0;
  
  selectedAreas.forEach(area => {
    totalInputTokens += area.avgInputTokens * totalPromptsPerMonth;
    totalOutputTokens += area.avgOutputTokens * totalPromptsPerMonth;
  });
  
  return { totalInputTokens, totalOutputTokens };
};

// Calcola il costo mensile a consumo in base ai token e al modello scelto
export const calculatePayAsYouGoCost = (
  inputTokens: number,
  outputTokens: number,
  model: AIModel
) => {
  const inputCost = (inputTokens / 1000) * model.inputCost;
  const outputCost = (outputTokens / 1000) * model.outputCost;
  
  return inputCost + outputCost;
};

// Calcola il risparmio mensile
export const calculateMonthlySavings = (
  subscriptionCost: number,
  payAsYouGoCost: number
) => {
  return subscriptionCost - payAsYouGoCost;
};

// Calcola il risparmio percentuale
export const calculateSavingsPercentage = (
  subscriptionCost: number,
  payAsYouGoCost: number
) => {
  if (subscriptionCost === 0) return 0;
  return ((subscriptionCost - payAsYouGoCost) / subscriptionCost) * 100;
};

// Formatta un valore in un formato di valuta
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

// Formatta il numero di token
export const formatTokens = (tokens: number) => {
  return new Intl.NumberFormat('it-IT').format(tokens);
};
