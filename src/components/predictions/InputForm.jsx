"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputForm({ features, inputs, setInputs }) {
  const handleInputChange = (index, value) => {
    const updated = [...inputs];
    updated[index] = parseFloat(value) || 0;
    setInputs(updated);
  };

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            📥 Enter CN Details:
          </h2>

          {features.map((feature, index) => (
            <div key={feature} className="space-y-1">
              <Label htmlFor={`input-${index}`} className="font-medium">
                {feature}
              </Label>

              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <Input
                  id={`input-${index}`}
                  type="number"
                  className="md:w-1/3"
                  value={inputs[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />

                <input
                  type="range"
                  min={0}
                  max={100000}
                  step={100}
                  value={inputs[index]}
                  className="w-full md:flex-1"
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
