
import React from "react";
import { AIModel } from "@/config/aiModelConfig";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/utils/calculationUtils";

interface AIModelSelectorProps {
  models: AIModel[];
  selectedModel: AIModel | null;
  onChange: (model: AIModel) => void;
}

const AIModelSelector: React.FC<AIModelSelectorProps> = ({
  models,
  selectedModel,
  onChange,
}) => {
  const handleModelChange = (modelId: string) => {
    const model = models.find((m) => m.id === modelId);
    if (model) {
      onChange(model);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Modello AI utilizzato</h3>
      <Select
        value={selectedModel?.id || ""}
        onValueChange={handleModelChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleziona un modello AI" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              <div className="flex flex-col">
                <span>{model.name}</span>
                <span className="text-xs text-muted-foreground">
                  Input: {formatCurrency(model.inputCost)} per 1K token, 
                  Output: {formatCurrency(model.outputCost)} per 1K token
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AIModelSelector;
