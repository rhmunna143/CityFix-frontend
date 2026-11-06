"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export interface ChartDatum {
  name: string;
  value: number;
}

export default function StatusPieChart({
  data,
  colorFor,
}: {
  data: ChartDatum[];
  colorFor?: (d: ChartDatum, i: number) => string;
}) {
  const defaultColors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((d, i) => (
            <Cell
              key={d.name || `cell-${i}`}
              fill={
                colorFor
                  ? colorFor(d, i)
                  : defaultColors[i % defaultColors.length]
              }
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
