"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartDatum } from "./StatusPieChart";

export default function CategoryBarChart({
  data,
  barColor = "#8884d8",
}: {
  data: ChartDatum[];
  barColor?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill={barColor} />
      </BarChart>
    </ResponsiveContainer>
  );
}
