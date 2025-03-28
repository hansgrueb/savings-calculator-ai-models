
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface PromptsPerDayInputProps {
  value: number;
  onChange: (value: number) => void;
}

const PromptsPerDayInput: React.FC<PromptsPerDayInputProps> = ({
  value,
  onChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value, 10);
    if (!isNaN(inputValue) && inputValue >= 0) {
      onChange(Math.min(inputValue, 100)); // Limita a 100 prompt al giorno come massimo
    }
  };

  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Numero medio di prompt al giorno</h3>
      <div className="flex items-center space-x-4">
        <Slider
          value={[value]}
          min={1}
          max={100}
          step={1}
          onValueChange={handleSliderChange}
          className="flex-1"
        />
        <Input
          type="number"
          min={1}
          max={100}
          value={value}
          onChange={handleInputChange}
          className="w-20"
        />
      </div>
      <div className="text-sm text-muted-foreground">
        <span className="font-medium">{value}</span> prompt al giorno = circa{" "}
        <span className="font-medium">{value * 30}</span> prompt al mese
      </div>
    </div>
  );
};

export default PromptsPerDayInput;
