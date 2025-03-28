
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
  Subscription,
  UsageArea 
} from "@/config/aiModelConfig";

interface ResultsDisplayProps {
  selectedAreas: UsageArea[];
  selectedModel: AIModel;
  subscriptionCost: number;
  promptsPerDay: number;
  payAsYouGoCost: number;
  monthlySavings: number;
  savingsPercentage: number;
  totalInputTokens: number;
  totalOutputTokens: number;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  selectedAreas,
  selectedModel,
  subscriptionCost,
  promptsPerDay,
  payAsYouGoCost,
  monthlySavings,
  savingsPercentage,
  totalInputTokens,
  totalOutputTokens,
}) => {
  const isProfit = monthlySavings > 0;

  return (
    <div className="space-y-8">
      <Card className="border-2 border-tech">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Risultato dell'analisi</CardTitle>
          <CardDescription>
            Basato sugli ambiti, modello e utilizzo selezionati
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Costi mensili</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Abbonamento attuale:</span>
                  <span className="font-semibold">{formatCurrency(subscriptionCost)}</span>
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
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Dettagli utilizzo mensile</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Prompt totali:</span>
                  <span className="font-semibold">{promptsPerDay * 30}</span>
                </div>
                <div className="flex justify-between">
                  <span>Token di input:</span>
                  <span className="font-semibold">{formatTokens(totalInputTokens)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Token di output:</span>
                  <span className="font-semibold">{formatTokens(totalOutputTokens)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Costo input:</span>
                  <span className="font-semibold">
                    {formatCurrency((totalInputTokens / 1000) * selectedModel.inputCost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Costo output:</span>
                  <span className="font-semibold">
                    {formatCurrency((totalOutputTokens / 1000) * selectedModel.outputCost)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold mb-2">
              {isProfit 
                ? "Puoi risparmiare passando a un modello a consumo!" 
                : "L'abbonamento è più conveniente per il tuo utilizzo."}
            </h3>
            <p className="text-muted-foreground">
              {isProfit
                ? `Risparmi ${formatCurrency(monthlySavings)} al mese (${formatCurrency(monthlySavings * 12)} all'anno) passando a un modello a consumo.`
                : `L'abbonamento ti fa risparmiare ${formatCurrency(-monthlySavings)} al mese rispetto all'utilizzo a consumo.`}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
