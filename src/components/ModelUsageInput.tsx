
import React from "react";
import { AIModel } from "@/config/aiModelConfig";
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
};

interface ModelUsageInputProps {
  models: AIModel[];
  selectedModelUsages: ModelUsage[];
  onAddModelUsage: (modelUsage: ModelUsage) => void;
  onRemoveModelUsage: (id: string) => void;
  onUpdatePromptsPerDay: (id: string, promptsPerDay: number) => void;
}

const ModelUsageInput: React.FC<ModelUsageInputProps> = ({
  models,
  selectedModelUsages,
  onAddModelUsage,
  onRemoveModelUsage,
  onUpdatePromptsPerDay,
}) => {
  const [selectedModelId, setSelectedModelId] = React.useState<string>("");
  const [promptsPerDay, setPromptsPerDay] = React.useState<number>(10);

  const handleAddModel = () => {
    if (!selectedModelId) return;
    
    const selectedModel = models.find(m => m.id === selectedModelId);
    if (!selectedModel) return;
    
    const newModelUsage: ModelUsage = {
      id: `${selectedModelId}-${Date.now()}`, // Unique ID
      model: selectedModel,
      promptsPerDay,
    };
    
    onAddModelUsage(newModelUsage);
    
    // Reset selection
    setSelectedModelId("");
    setPromptsPerDay(10);
  };

  const handlePromptsChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      onUpdatePromptsPerDay(id, value);
    }
  };

  const availableModels = models.filter(model => 
    !selectedModelUsages.some(usage => usage.model.id === model.id)
  );

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
                <SelectItem value="none" disabled>Hai selezionato tutti i modelli disponibili</SelectItem>
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
