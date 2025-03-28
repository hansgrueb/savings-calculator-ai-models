
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Sparkles } from "lucide-react";
import { usageAreas, aiModels, subscriptions, type UsageArea } from "@/config/aiModelConfig";
import UsageAreaSelector from "@/components/UsageAreaSelector";
import ResultsDisplay from "@/components/ResultsDisplay";
import ModelUsageInput, { ModelUsage } from "@/components/ModelUsageInput";
import { 
  calculateMonthlyTokens,
  calculateMonthlySavings,
  calculateSavingsPercentage
} from "@/utils/calculationUtils";

const Index = () => {
  // Stati per i valori selezionati
  const [selectedAreas, setSelectedAreas] = useState<UsageArea[]>([]);
  const [selectedModelUsages, setSelectedModelUsages] = useState<ModelUsage[]>([]);
  
  // Stati per i risultati calcolati
  const [payAsYouGoCost, setPayAsYouGoCost] = useState(0);
  const [totalSubscriptionCost, setTotalSubscriptionCost] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [savingsPercentage, setSavingsPercentage] = useState(0);
  const [tokenResults, setTokenResults] = useState({
    textToText: { inputTokens: 0, outputTokens: 0 },
    textToImage: { inputTokens: 0, outputTokens: 0 },
    textToVideo: { inputTokens: 0, outputTokens: 0 },
    totalCost: 0
  });
  
  // Stato per controllare se mostrare i risultati
  const [showResults, setShowResults] = useState(false);
  
  // Controlla se tutti i campi sono compilati
  const isFormComplete = 
    selectedAreas.length > 0 && 
    selectedModelUsages.length > 0;
  
  // Gestisce l'aggiunta di un nuovo modello
  const handleAddModelUsage = (modelUsage: ModelUsage) => {
    setSelectedModelUsages([...selectedModelUsages, modelUsage]);
  };
  
  // Gestisce la rimozione di un modello
  const handleRemoveModelUsage = (id: string) => {
    setSelectedModelUsages(selectedModelUsages.filter(usage => usage.id !== id));
  };
  
  // Gestisce l'aggiornamento del numero di prompt al giorno
  const handleUpdatePromptsPerDay = (id: string, promptsPerDay: number) => {
    setSelectedModelUsages(selectedModelUsages.map(usage => 
      usage.id === id ? { ...usage, promptsPerDay } : usage
    ));
  };

  // Gestisce l'aggiornamento dell'abbonamento per un modello
  const handleUpdateSubscription = (id: string, subscription: {
    id: string;
    name: string;
    monthlyCost: number;
    provider: string;
  }) => {
    setSelectedModelUsages(selectedModelUsages.map(usage => 
      usage.id === id ? { ...usage, subscription } : usage
    ));
  };
  
  // Calcola il costo totale degli abbonamenti
  useEffect(() => {
    const total = selectedModelUsages.reduce((sum, usage) => {
      return sum + (usage.subscription?.monthlyCost || 0);
    }, 0);
    
    setTotalSubscriptionCost(total);
  }, [selectedModelUsages]);
  
  // Calcola i risultati quando il form è completo
  useEffect(() => {
    if (isFormComplete) {
      // Calcola i token mensili e costi totali
      const results = calculateMonthlyTokens(
        selectedAreas,
        selectedModelUsages
      );
      
      setTokenResults(results);
      setPayAsYouGoCost(results.totalCost);
      
      // Calcola il risparmio mensile
      const monthlySavings = calculateMonthlySavings(
        totalSubscriptionCost,
        results.totalCost
      );
      setMonthlySavings(monthlySavings);
      
      // Calcola la percentuale di risparmio
      const savingsPercentage = calculateSavingsPercentage(
        totalSubscriptionCost,
        results.totalCost
      );
      setSavingsPercentage(savingsPercentage);
    }
  }, [selectedAreas, selectedModelUsages, totalSubscriptionCost, isFormComplete]);
  
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
            <div className="grid grid-cols-1 gap-8">
              <UsageAreaSelector
                areas={usageAreas}
                selectedAreas={selectedAreas}
                onChange={setSelectedAreas}
              />
              
              <ModelUsageInput
                models={aiModels}
                subscriptions={subscriptions}
                selectedModelUsages={selectedModelUsages}
                onAddModelUsage={handleAddModelUsage}
                onRemoveModelUsage={handleRemoveModelUsage}
                onUpdatePromptsPerDay={handleUpdatePromptsPerDay}
                onUpdateSubscription={handleUpdateSubscription}
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
          </CardContent>
        </Card>
        
        {showResults && isFormComplete && (
          <ResultsDisplay
            selectedAreas={selectedAreas}
            modelUsages={selectedModelUsages}
            totalSubscriptionCost={totalSubscriptionCost}
            payAsYouGoCost={payAsYouGoCost}
            monthlySavings={monthlySavings}
            savingsPercentage={savingsPercentage}
            tokenResults={tokenResults}
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
