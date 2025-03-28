
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, ArrowUp } from "lucide-react";
import { formatCurrency, formatTokens } from "@/utils/calculationUtils";
import { 
  AIModel,
  UsageArea,
  ModelType
} from "@/config/aiModelConfig";
import { ModelUsage } from "@/components/ModelUsageInput";

interface ResultsDisplayProps {
  selectedAreas: UsageArea[];
  modelUsages: ModelUsage[];
  totalSubscriptionCost: number;
  payAsYouGoCost: number;
  monthlySavings: number;
  savingsPercentage: number;
  tokenResults: {
    textToText: { inputTokens: number, outputTokens: number },
    textToImage: { inputTokens: number, outputTokens: number },
    textToVideo: { inputTokens: number, outputTokens: number },
    totalCost: number
  };
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  selectedAreas,
  modelUsages,
  totalSubscriptionCost,
  payAsYouGoCost,
  monthlySavings,
  savingsPercentage,
  tokenResults,
}) => {
  const isProfit = monthlySavings > 0;
  
  // Raggruppa i modelli per tipo
  const modelsByType: Record<ModelType, ModelUsage[]> = {
    "text-to-text": [],
    "text-to-image": [],
    "text-to-video": []
  };
  
  modelUsages.forEach(usage => {
    modelsByType[usage.model.type].push(usage);
  });

  return (
    <div className="space-y-8">
      <Card className="border-2 border-tech">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Risultato dell'analisi</CardTitle>
          <CardDescription>
            Basato sugli ambiti, modelli e utilizzo selezionati
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Costi mensili</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Abbonamenti attuali:</span>
                  <span className="font-semibold">{formatCurrency(totalSubscriptionCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Costo a consumo stimato:</span>
                  <span className="font-semibold">{formatCurrency(payAsYouGoCost)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span>Risparmio mensile:</span>
                  <span 
                    className={`font-bold ${isProfit ? 'text-savings' : 'text-destructive'}`}
                  >
                    {isProfit ? '+' : ''}{formatCurrency(monthlySavings)}
                  </span>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span>Percentuale di risparmio:</span>
                  <span 
                    className={`font-bold ${isProfit ? 'text-savings' : 'text-destructive'}`}
                  >
                    {isProfit ? (
                      <ArrowDown className="inline-block mr-1 h-4 w-4" />
                    ) : (
                      <ArrowUp className="inline-block mr-1 h-4 w-4" />
                    )}
                    {Math.abs(savingsPercentage).toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={isProfit ? Math.min(savingsPercentage, 100) : 0} 
                  className={`h-2 ${isProfit ? 'bg-muted' : 'bg-destructive/20'}`}
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Dettagli utilizzo mensile</h3>
              
              {modelsByType["text-to-text"].length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Modelli Text-to-Text</h4>
                  <div className="flex justify-between">
                    <span>Token di input:</span>
                    <span className="font-semibold">{formatTokens(tokenResults.textToText.inputTokens)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Token di output:</span>
                    <span className="font-semibold">{formatTokens(tokenResults.textToText.outputTokens)}</span>
                  </div>
                </div>
              )}
              
              {modelsByType["text-to-image"].length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Modelli Text-to-Image</h4>
                  <div className="flex justify-between">
                    <span>Token di input:</span>
                    <span className="font-semibold">{formatTokens(tokenResults.textToImage.inputTokens)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Token di output:</span>
                    <span className="font-semibold">{formatTokens(tokenResults.textToImage.outputTokens)}</span>
                  </div>
                </div>
              )}
              
              {modelsByType["text-to-video"].length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Modelli Text-to-Video</h4>
                  <div className="flex justify-between">
                    <span>Token di input:</span>
                    <span className="font-semibold">{formatTokens(tokenResults.textToVideo.inputTokens)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Token di output:</span>
                    <span className="font-semibold">{formatTokens(tokenResults.textToVideo.outputTokens)}</span>
                  </div>
                </div>
              )}
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Dettaglio modelli</h4>
                {modelUsages.map((usage) => {
                  // Trova le aree compatibili per questo modello
                  const compatibleAreas = selectedAreas.filter(area => 
                    area.modelTypes.includes(usage.model.type)
                  );
                  
                  const promptsPerMonth = usage.promptsPerDay * 30;
                  
                  return (
                    <div key={usage.id} className="py-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{usage.model.name}</span>
                        <span>{usage.promptsPerDay} prompt/giorno × 30 = {promptsPerMonth} prompt/mese</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {compatibleAreas.length > 0 ? 
                          `Utilizzato per: ${compatibleAreas.map(a => a.name).join(", ")}` : 
                          "Nessun ambito compatibile selezionato"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold mb-2">
              {isProfit 
                ? "Puoi risparmiare passando a modelli a consumo!" 
                : "Gli abbonamenti sono più convenienti per il tuo utilizzo."}
            </h3>
            <p className="text-muted-foreground">
              {isProfit
                ? `Risparmi ${formatCurrency(monthlySavings)} al mese (${formatCurrency(monthlySavings * 12)} all'anno) passando a modelli a consumo.`
                : `Gli abbonamenti ti fanno risparmiare ${formatCurrency(-monthlySavings)} al mese rispetto all'utilizzo a consumo.`}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
