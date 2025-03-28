
import React, { useState, useEffect } from "react";
import { Subscription } from "@/config/aiModelConfig";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/utils/calculationUtils";
import { useForm } from "react-hook-form";

interface SubscriptionSelectorProps {
  subscriptions: Subscription[];
  selectedSubscription: Subscription | null;
  onSubscriptionChange: (subscription: Subscription) => void;
  onCostChange: (cost: number) => void;
}

const SubscriptionSelector: React.FC<SubscriptionSelectorProps> = ({
  subscriptions,
  selectedSubscription,
  onSubscriptionChange,
  onCostChange,
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customCost, setCustomCost] = useState("0");
  
  const form = useForm();

  // Gestisce il cambio di abbonamento
  const handleSubscriptionChange = (subscriptionId: string) => {
    const subscription = subscriptions.find((s) => s.id === subscriptionId);
    if (subscription) {
      onSubscriptionChange(subscription);
      setShowCustomInput(subscription.id === "custom");
      if (subscription.id !== "custom") {
        onCostChange(subscription.monthlyCost);
      }
    }
  };

  // Gestisce il cambio del costo personalizzato
  const handleCustomCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomCost(value);
    const numericValue = parseFloat(value) || 0;
    onCostChange(numericValue);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Abbonamento attuale</h3>
      <Select
        value={selectedSubscription?.id || ""}
        onValueChange={handleSubscriptionChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleziona un abbonamento" />
        </SelectTrigger>
        <SelectContent>
          {subscriptions.map((subscription) => (
            <SelectItem key={subscription.id} value={subscription.id}>
              <div className="flex flex-col">
                <span>{subscription.name}</span>
                {subscription.id !== "custom" && (
                  <span className="text-xs text-muted-foreground">
                    {subscription.provider} - {formatCurrency(subscription.monthlyCost)}/mese
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showCustomInput && (
        <div className="mt-4">
          <FormField
            control={form.control}
            name="customCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Costo mensile personalizzato (€)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={customCost}
                    onChange={handleCustomCostChange}
                    className="w-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default SubscriptionSelector;
