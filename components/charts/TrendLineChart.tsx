"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface TrendDatum {
  date: string;
  avgHours: number;
}

export default function TrendLineChart({
  data,
  lineColor = "#00C49F",
}: {
  data: TrendDatum[];
  lineColor?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="avgHours"
          stroke={lineColor}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
