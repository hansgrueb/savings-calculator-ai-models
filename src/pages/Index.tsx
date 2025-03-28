
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Sparkles } from "lucide-react";
import { usageAreas, aiModels, subscriptions, type UsageArea, type AIModel, type Subscription } from "@/config/aiModelConfig";
import UsageAreaSelector from "@/components/UsageAreaSelector";
import AIModelSelector from "@/components/AIModelSelector";
import SubscriptionSelector from "@/components/SubscriptionSelector";
import PromptsPerDayInput from "@/components/PromptsPerDayInput";
import ResultsDisplay from "@/components/ResultsDisplay";
import { 
  calculateMonthlyTokens, 
  calculatePayAsYouGoCost, 
  calculateMonthlySavings,
  calculateSavingsPercentage
} from "@/utils/calculationUtils";

const Index = () => {
  // Stati per i valori selezionati
  const [selectedAreas, setSelectedAreas] = useState<UsageArea[]>([]);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [subscriptionCost, setSubscriptionCost] = useState(0);
  const [promptsPerDay, setPromptsPerDay] = useState(10);
  
  // Stati per i risultati calcolati
  const [totalInputTokens, setTotalInputTokens] = useState(0);
  const [totalOutputTokens, setTotalOutputTokens] = useState(0);
  const [payAsYouGoCost, setPayAsYouGoCost] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [savingsPercentage, setSavingsPercentage] = useState(0);
  
  // Stato per controllare se mostrare i risultati
  const [showResults, setShowResults] = useState(false);
  
  // Controlla se tutti i campi sono compilati
  const isFormComplete = 
    selectedAreas.length > 0 && 
    selectedModel !== null && 
    selectedSubscription !== null && 
    promptsPerDay > 0;
  
  // Calcola i risultati quando il form è completo
  useEffect(() => {
    if (isFormComplete && selectedModel) {
      // Calcola i token mensili
      const { totalInputTokens, totalOutputTokens } = calculateMonthlyTokens(
        selectedAreas,
        promptsPerDay
      );
      
      // Aggiorna gli stati dei token
      setTotalInputTokens(totalInputTokens);
      setTotalOutputTokens(totalOutputTokens);
      
      // Calcola il costo mensile a consumo
      const payAsYouGoCost = calculatePayAsYouGoCost(
        totalInputTokens,
        totalOutputTokens,
        selectedModel
      );
      setPayAsYouGoCost(payAsYouGoCost);
      
      // Calcola il risparmio mensile
      const monthlySavings = calculateMonthlySavings(
        subscriptionCost,
        payAsYouGoCost
      );
      setMonthlySavings(monthlySavings);
      
      // Calcola la percentuale di risparmio
      const savingsPercentage = calculateSavingsPercentage(
        subscriptionCost,
        payAsYouGoCost
      );
      setSavingsPercentage(savingsPercentage);
    }
  }, [selectedAreas, selectedModel, subscriptionCost, promptsPerDay, isFormComplete]);
  
  // Gestisce il click sul bottone di calcolo
  const handleCalculate = () => {
    setShowResults(true);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-10 w-10 text-tech mr-2" />
            <h1 className="text-4xl font-bold text-foreground">Calcolatore Risparmio AI</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scopri quanto puoi risparmiare passando dai modelli AI in abbonamento a quelli a consumo.
          </p>
        </header>
        
        <Card className="mb-8 border shadow-md">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <UsageAreaSelector
                  areas={usageAreas}
                  selectedAreas={selectedAreas}
                  onChange={setSelectedAreas}
                />
                
                <AIModelSelector
                  models={aiModels}
                  selectedModel={selectedModel}
                  onChange={setSelectedModel}
                />
              </div>
              
              <div className="space-y-8">
                <SubscriptionSelector
                  subscriptions={subscriptions}
                  selectedSubscription={selectedSubscription}
                  onSubscriptionChange={setSelectedSubscription}
                  onCostChange={setSubscriptionCost}
                />
                
                <PromptsPerDayInput
                  value={promptsPerDay}
                  onChange={setPromptsPerDay}
                />
                
                <div className="pt-4">
                  <Button 
                    onClick={handleCalculate}
                    className="w-full bg-tech hover:bg-tech-dark text-white"
                    size="lg"
                    disabled={!isFormComplete}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Calcola il tuo potenziale risparmio
                  </Button>
                  
                  {!isFormComplete && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Compila tutti i campi per calcolare il potenziale risparmio.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {showResults && isFormComplete && selectedModel && (
          <ResultsDisplay
            selectedAreas={selectedAreas}
            selectedModel={selectedModel}
            subscriptionCost={subscriptionCost}
            promptsPerDay={promptsPerDay}
            payAsYouGoCost={payAsYouGoCost}
            monthlySavings={monthlySavings}
            savingsPercentage={savingsPercentage}
            totalInputTokens={totalInputTokens}
            totalOutputTokens={totalOutputTokens}
          />
        )}
        
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            Questo calcolatore fornisce stime basate sui dati medi di token per ambito di utilizzo.
            I risultati reali possono variare in base all'effettivo utilizzo.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
