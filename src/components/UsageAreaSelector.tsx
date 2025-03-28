
import React from "react";
import { UsageArea } from "@/config/aiModelConfig";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

interface UsageAreaSelectorProps {
  areas: UsageArea[];
  selectedAreas: UsageArea[];
  onChange: (areas: UsageArea[]) => void;
}

const UsageAreaSelector: React.FC<UsageAreaSelectorProps> = ({
  areas,
  selectedAreas,
  onChange,
}) => {
  // Toggles the selection of an area
  const toggleArea = (area: UsageArea) => {
    // Se l'area è già selezionata, la rimuoviamo
    if (selectedAreas.some((selected) => selected.id === area.id)) {
      onChange(selectedAreas.filter((selected) => selected.id !== area.id));
    } else {
      // Altrimenti la aggiungiamo
      onChange([...selectedAreas, area]);
    }
  };

  // Dynamic import for Lucide icons
  const getIconComponent = (iconName: string) => {
    const Icon = dynamic(() => import(`lucide-react`).then((mod) => mod[iconName]));
    return Icon;
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-2">Seleziona gli ambiti di utilizzo</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {areas.map((area) => {
          const IconComponent = getIconComponent(area.icon);
          const isSelected = selectedAreas.some((selected) => selected.id === area.id);

          return (
            <button
              key={area.id}
              onClick={() => toggleArea(area)}
              className={cn(
                "relative flex flex-col items-center justify-center p-4 border rounded-lg transition-all",
                "hover:border-tech-light",
                isSelected
                  ? "bg-tech-light/10 border-tech text-tech-dark"
                  : "bg-card border-border text-foreground"
              )}
            >
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <Check className="h-4 w-4 text-tech" />
                </div>
              )}
              <div className="p-2">
                <IconComponent className={cn("h-6 w-6", isSelected ? "text-tech" : "text-muted-foreground")} />
              </div>
              <span className="mt-2 text-sm font-medium">{area.name}</span>
            </button>
          );
        })}
      </div>
      {selectedAreas.length === 0 && (
        <p className="text-sm text-muted-foreground mt-2">
          Seleziona almeno un ambito per continuare.
        </p>
      )}
    </div>
  );
};

export default UsageAreaSelector;
