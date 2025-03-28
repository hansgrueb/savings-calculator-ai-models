import { UsageArea, AIModel, Subscription, ModelType } from "@/config/aiModelConfig";
import { ModelUsage } from "@/components/ModelUsageInput";

// Calcola i token totali mensili in base al numero di prompt al giorno e alle aree selezionate
export const calculateMonthlyTokens = (
  selectedAreas: UsageArea[],
  modelUsages: ModelUsage[]
) => {
  // Assumiamo 30 giorni in un mese per semplificare
  const daysInMonth = 30;
  
  // Raggruppa i modelli per tipo
  const modelsByType: Record<ModelType, ModelUsage[]> = {
    "text-to-text": [],
    "text-to-image": [],
    "text-to-video": []
  };
  
  modelUsages.forEach(usage => {
    modelsByType[usage.model.type].push(usage);
  });
  
  // Calcolo token per ogni tipo di modello
  const results = {
    textToText: { inputTokens: 0, outputTokens: 0 },
    textToImage: { inputTokens: 0, outputTokens: 0 },
    textToVideo: { inputTokens: 0, outputTokens: 0 },
    totalCost: 0
  };
  
  // Calcolo per text-to-text
  if (modelsByType["text-to-text"].length > 0) {
    // Filtra solo le aree compatibili con text-to-text
    const textAreas = selectedAreas.filter(area => 
      area.modelTypes.includes("text-to-text")
    );
    
    if (textAreas.length > 0) {
      modelsByType["text-to-text"].forEach(usage => {
        const totalPromptsPerMonth = usage.promptsPerDay * daysInMonth;
        
        // Calcola la media dei token di input e output per le aree selezionate
        const avgInputTokens = textAreas.reduce((sum, area) => sum + area.avgInputTokens, 0) / textAreas.length;
        const avgOutputTokens = textAreas.reduce((sum, area) => sum + area.avgOutputTokens, 0) / textAreas.length;
        
        // Moltiplica per il numero di prompt mensili
        results.textToText.inputTokens = avgInputTokens * totalPromptsPerMonth;
        results.textToText.outputTokens = avgOutputTokens * totalPromptsPerMonth;
        
        // Calcola il costo per questo modello
        const modelInputCost = (results.textToText.inputTokens / 1000) * usage.model.inputCost;
        const modelOutputCost = (results.textToText.outputTokens / 1000) * usage.model.outputCost;
        results.totalCost += modelInputCost + modelOutputCost;
      });
    }
  }
  
  // Calcolo per text-to-image
  if (modelsByType["text-to-image"].length > 0) {
    // Filtra solo le aree compatibili con text-to-image
    const imageAreas = selectedAreas.filter(area => 
      area.modelTypes.includes("text-to-image")
    );
    
    if (imageAreas.length > 0) {
      modelsByType["text-to-image"].forEach(usage => {
        const totalPromptsPerMonth = usage.promptsPerDay * daysInMonth;
        
        // Calcola la media dei token di input e output per le aree selezionate
        const avgInputTokens = imageAreas.reduce((sum, area) => sum + area.avgInputTokens, 0) / imageAreas.length;
        const avgOutputTokens = imageAreas.reduce((sum, area) => sum + area.avgOutputTokens, 0) / imageAreas.length;
        
        // Moltiplica per il numero di prompt mensili
        results.textToImage.inputTokens = avgInputTokens * totalPromptsPerMonth;
        results.textToImage.outputTokens = avgOutputTokens * totalPromptsPerMonth;
        
        // Calcola il costo per questo modello
        const modelInputCost = (results.textToImage.inputTokens / 1000) * usage.model.inputCost;
        const modelOutputCost = (results.textToImage.outputTokens / 1000) * usage.model.outputCost;
        results.totalCost += modelInputCost + modelOutputCost;
      });
    }
  }
  
  // Calcolo per text-to-video
  if (modelsByType["text-to-video"].length > 0) {
    // Filtra solo le aree compatibili con text-to-video
    const videoAreas = selectedAreas.filter(area => 
      area.modelTypes.includes("text-to-video")
    );
    
    if (videoAreas.length > 0) {
      modelsByType["text-to-video"].forEach(usage => {
        const totalPromptsPerMonth = usage.promptsPerDay * daysInMonth;
        
        // Calcola la media dei token di input e output per le aree selezionate
        const avgInputTokens = videoAreas.reduce((sum, area) => sum + area.avgInputTokens, 0) / videoAreas.length;
        const avgOutputTokens = videoAreas.reduce((sum, area) => sum + area.avgOutputTokens, 0) / videoAreas.length;
        
        // Moltiplica per il numero di prompt mensili
        results.textToVideo.inputTokens = avgInputTokens * totalPromptsPerMonth;
        results.textToVideo.outputTokens = avgOutputTokens * totalPromptsPerMonth;
        
        // Calcola il costo per questo modello
        const modelInputCost = (results.textToVideo.inputTokens / 1000) * usage.model.inputCost;
        const modelOutputCost = (results.textToVideo.outputTokens / 1000) * usage.model.outputCost;
        results.totalCost += modelInputCost + modelOutputCost;
      });
    }
  }
  
  return results;
};

// Calcola il costo per un singolo modello
export const calculateModelCost = (
  modelUsage: ModelUsage,
  compatibleAreas: UsageArea[]
) => {
  const daysInMonth = 30;
  const totalPromptsPerMonth = modelUsage.promptsPerDay * daysInMonth;
  
  let totalInputTokens = 0;
  let totalOutputTokens = 0;
  
  compatibleAreas.forEach(area => {
    totalInputTokens += area.avgInputTokens * totalPromptsPerMonth;
    totalOutputTokens += area.avgOutputTokens * totalPromptsPerMonth;
  });
  
  const inputCost = (totalInputTokens / 1000) * modelUsage.model.inputCost;
  const outputCost = (totalOutputTokens / 1000) * modelUsage.model.outputCost;
  
  return {
    inputTokens: totalInputTokens,
    outputTokens: totalOutputTokens,
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost
  };
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
