
import React, { useState } from "react";
import { AIModel, Subscription } from "@/config/aiModelConfig";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { formatCurrency } from "@/utils/calculationUtils";

export type ModelUsage = {
  id: string;
  model: AIModel;
  promptsPerDay: number;
  subscription: Subscription | null;
};

interface ModelUsageInputProps {
  models: AIModel[];
  subscriptions: Subscription[];
  selectedModelUsages: ModelUsage[];
  onAddModelUsage: (modelUsage: ModelUsage) => void;
  onRemoveModelUsage: (id: string) => void;
  onUpdatePromptsPerDay: (id: string, promptsPerDay: number) => void;
  onUpdateSubscription: (id: string, subscription: Subscription) => void;
}

const ModelUsageInput: React.FC<ModelUsageInputProps> = ({
  models,
  subscriptions,
  selectedModelUsages,
  onAddModelUsage,
  onRemoveModelUsage,
  onUpdatePromptsPerDay,
  onUpdateSubscription,
}) => {
  const [selectedModelId, setSelectedModelId] = useState<string>("");
  const [promptsPerDay, setPromptsPerDay] = useState<number>(10);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string>("none");

  const handleAddModel = () => {
    if (!selectedModelId) return;
    
    const selectedModel = models.find(m => m.id === selectedModelId);
    if (!selectedModel) return;
    
    const selectedSubscription = selectedSubscriptionId && selectedSubscriptionId !== "none" ? 
      subscriptions.find(s => s.id === selectedSubscriptionId) || null : 
      null;
    
    const newModelUsage: ModelUsage = {
      id: `${selectedModelId}-${Date.now()}`, // Unique ID
      model: selectedModel,
      promptsPerDay,
      subscription: selectedSubscription,
    };
    
    onAddModelUsage(newModelUsage);
    
    // Reset selection
    setSelectedModelId("");
    setPromptsPerDay(10);
    setSelectedSubscriptionId("none");
  };

  const handlePromptsChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      onUpdatePromptsPerDay(id, value);
    }
  };

  const handleSubscriptionChange = (id: string, subscriptionId: string) => {
    if (subscriptionId === "none") {
      // Handle removal of subscription
      onUpdateSubscription(id, {
        id: "",
        name: "",
        monthlyCost: 0,
        provider: ""
      });
      return;
    }
    
    const subscription = subscriptions.find(s => s.id === subscriptionId);
    if (subscription) {
      onUpdateSubscription(id, subscription);
    }
  };

  const availableModels = models.filter(model => 
    !selectedModelUsages.some(usage => usage.model.id === model.id)
  );

  const getFilteredSubscriptions = (modelType: string) => {
    // Filter subscriptions based on model type
    // For text-to-text models: OpenAI, Anthropic, Perplexity subscriptions
    // For image models: Midjourney subscriptions
    // For video models: Runway subscriptions
    let providers: string[] = [];
    
    if (modelType === "text-to-text") {
      providers = ["OpenAI", "Anthropic", "Perplexity"];
    } else if (modelType === "text-to-image") {
      providers = ["OpenAI", "Midjourney"];
    } else if (modelType === "text-to-video") {
      providers = ["OpenAI", "Runway"];
    }
    
    // Always include custom subscription
    return subscriptions.filter(sub => 
      providers.includes(sub.provider) || sub.id === "custom"
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Modelli AI utilizzati</h3>
      
      {/* Elenco dei modelli selezionati */}
      {selectedModelUsages.length > 0 && (
        <div className="space-y-4">
          {selectedModelUsages.map((usage) => (
            <div key={usage.id} className="flex items-center p-3 border rounded-lg bg-card space-x-4">
              <div className="flex-1">
                <div className="font-medium">{usage.model.name}</div>
                <div className="text-xs text-muted-foreground">
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs mr-2">
                    {usage.model.type === "text-to-text" ? "Testo" : 
                     usage.model.type === "text-to-image" ? "Immagine" : "Video"}
                  </span>
                  <span>
                    Input: {formatCurrency(usage.model.inputCost)} per 1K token, 
                    Output: {formatCurrency(usage.model.outputCost)} per 1K token
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Select
                  value={usage.subscription?.id || "none"}
                  onValueChange={(value) => handleSubscriptionChange(usage.id, value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Abbonamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nessun abbonamento</SelectItem>
                    {getFilteredSubscriptions(usage.model.type).map(sub => (
                      <SelectItem key={sub.id} value={sub.id}>
                        {sub.name} ({formatCurrency(sub.monthlyCost)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm whitespace-nowrap">Prompt al giorno:</span>
                  <Input 
                    type="number"
                    min={1}
                    value={usage.promptsPerDay}
                    onChange={(e) => handlePromptsChange(e, usage.id)}
                    className="w-20"
                  />
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onRemoveModelUsage(usage.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      {/* Form per aggiungere un nuovo modello */}
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <Select
            value={selectedModelId}
            onValueChange={setSelectedModelId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleziona un modello AI" />
            </SelectTrigger>
            <SelectContent>
              {availableModels.length === 0 ? (
                <SelectItem value="no_models" disabled>Hai selezionato tutti i modelli disponibili</SelectItem>
              ) : (
                availableModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex flex-col">
                      <span>{model.name}</span>
                      <span className="text-xs text-muted-foreground">
                        <span className="bg-primary/10 text-primary px-1 py-0.5 rounded text-xs mr-1">
                          {model.type === "text-to-text" ? "Testo" : 
                           model.type === "text-to-image" ? "Immagine" : "Video"}
                        </span>
                        {model.provider}
                      </span>
                    </div>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        
        {selectedModelId && (
          <div className="w-44">
            <Select
              value={selectedSubscriptionId}
              onValueChange={setSelectedSubscriptionId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Abbonamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nessun abbonamento</SelectItem>
                {getFilteredSubscriptions(
                  models.find(m => m.id === selectedModelId)?.type || "text-to-text"
                ).map((sub) => (
                  <SelectItem key={sub.id} value={sub.id}>
                    {sub.name} ({formatCurrency(sub.monthlyCost)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="w-32">
          <Input
            type="number"
            min={1}
            placeholder="Prompt/giorno"
            value={promptsPerDay}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value > 0) setPromptsPerDay(value);
            }}
          />
        </div>
        
        <Button 
          onClick={handleAddModel}
          disabled={!selectedModelId}
          className="bg-tech hover:bg-tech-dark text-white"
        >
          Aggiungi Modello
        </Button>
      </div>
      
      {selectedModelUsages.length === 0 && (
        <p className="text-sm text-muted-foreground mt-2">
          Seleziona almeno un modello AI per continuare.
        </p>
      )}
    </div>
  );
};

export default ModelUsageInput;
