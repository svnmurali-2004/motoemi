// File: pages/index.jsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Download } from "lucide-react";
import InputForm from "@/components/predictions/InputForm";
import ShapChart from "@/components/predictions/ShapChart";

const FEATURES = [
  "Weight",
  "Distance",
  "Revenue",
  "Fuel",
  "Labor",
  "Last-mile",
  "Warehouse",
  "Maintenance",
  "Claims",
  "Admin",
];

export default function Home() {
  const [inputs, setInputs] = useState(Array(FEATURES.length).fill(100));
  const [loading, setLoading] = useState(false);
  const [profit, setProfit] = useState(50000.0);
  const [shapData, setShapData] = useState([
    { feature: "Revenue", value: 100000, impact: 4000 },
    { feature: "Fuel", value: 5000, impact: -1500 },
    { feature: "Labor", value: 3000, impact: -1200 },
    { feature: "Distance", value: 600, impact: -800 },
    { feature: "Admin", value: 2000, impact: 700 },
    { feature: "Claims", value: 1000, impact: -500 },
    { feature: "Warehouse", value: 2500, impact: 600 },
    { feature: "Last-mile", value: 1200, impact: -300 },
    { feature: "Maintenance", value: 1800, impact: 400 },
    { feature: "Weight", value: 800, impact: -100 },
  ]);

  const downloadText = `
🟢 Revenue (Value: 100000) → Impact: 4000.00
🔴 Fuel (Value: 5000) → Impact: -1500.00
🔴 Labor (Value: 3000) → Impact: -1200.00
`.trim();

  const handleDownload = () => {
    const blob = new Blob([downloadText], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "suggestions.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        🚛 CN Profitability Predictor
      </h1>

      <InputForm features={FEATURES} inputs={inputs} setInputs={setInputs} />

      <div className="flex justify-center">
        <Button disabled={loading} className="px-6">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Predict (Static Data)"
          )}
        </Button>
      </div>

      {profit !== null && (
        <div className="max-w-4xl mx-auto mt-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-green-700">
                💰 Predicted Profit: ₹{profit.toFixed(2)}
              </h2>
              <ShapChart shapData={shapData} />

              <Button
                variant="outline"
                className="mt-4 flex items-center gap-2"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" /> Download Suggestions
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
