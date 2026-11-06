import { lazy, Suspense, type ComponentProps } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Pie = lazy(() => import("./StatusPieChart"));
const Bar = lazy(() => import("./CategoryBarChart"));
const Line = lazy(() => import("./TrendLineChart"));

const ChartFallback = () => (
  <div className="h-full w-full flex items-center justify-center p-2">
    <Skeleton className="h-full w-full min-h-[260px] rounded-lg" />
  </div>
);

export const LazyPie = (props: ComponentProps<typeof Pie>) => (
  <Suspense fallback={<ChartFallback />}>
    <Pie {...props} />
  </Suspense>
);

export const LazyBar = (props: ComponentProps<typeof Bar>) => (
  <Suspense fallback={<ChartFallback />}>
    <Bar {...props} />
  </Suspense>
);

export const LazyLine = (props: ComponentProps<typeof Line>) => (
  <Suspense fallback={<ChartFallback />}>
    <Line {...props} />
  </Suspense>
);
