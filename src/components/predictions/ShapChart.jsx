"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

export default function ShapChart({ shapData }) {
  // Sort by absolute impact descending
  const sortedData = [...shapData].sort(
    (a, b) => Math.abs(b.impact) - Math.abs(a.impact)
  );

  // Calculate min and max impact for XAxis domain
  const impacts = sortedData.map((d) => d.impact);
  const minImpact = Math.min(...impacts, 0);
  const maxImpact = Math.max(...impacts, 0);

  return (
    <div className="mt-6">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2 text-gray-800">
            📊 SHAP Feature Impact
          </h3>
          <div className="w-full overflow-x-auto">
            <div style={{ minWidth: 500 }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sortedData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="feature" type="category" width={120} />
                  <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                  <Bar dataKey="impact" radius={4}>
                    {sortedData.map((entry, idx) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={entry.impact >= 0 ? "#4f46e5" : "#ef4444"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
