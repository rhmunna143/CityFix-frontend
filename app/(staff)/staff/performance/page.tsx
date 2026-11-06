"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchStaffStats } from "@/lib/api/complaints";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { StatCard } from "@/components/shared/StatCard";
import { SkeletonDetail } from "@/components/shared/Skeletons";
import { buttonVariants } from "@/components/ui/button";
import { LazyPie, LazyBar } from "@/components/charts";
import {
  Clock,
  AlertTriangle,
  TrendingUp,
  BarChart2,
  Inbox,
  ArrowLeft,
  Award,
  ShieldAlert,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import type { ChartDatum } from "@/components/charts/StatusPieChart";

const STATUS_COLORS: Record<string, string> = {
  SUBMITTED: "#94a3b8",
  ASSIGNED: "#3b82f6",
  IN_PROGRESS: "#f59e0b",
  RESOLVED: "#10b981",
  CLOSED: "#64748b",
};

const PALETTE = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
];

export default function StaffPerformancePage() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["staff-stats"],
    queryFn: () => fetchStaffStats(),
  });

  const totalAssigned = stats?.totalAssigned || 0;
  const resolvedCount = stats?.resolvedCount || 0;
  const inProgressCount = stats?.inProgressCount || 0;
  const activeQueue = stats?.activeQueue || 0;
  const slaBreachedCount = stats?.slaBreachedCount || 0;
  const avgResolutionHours = stats?.avgResolutionHours || 0;
  const resolutionRate =
    stats?.resolutionRate ??
    (totalAssigned > 0
      ? Math.round((resolvedCount / totalAssigned) * 100)
      : 0);

  const complaintsByStatus: ChartDatum[] = useMemo(() => {
    if (stats?.complaintsByStatus && stats.complaintsByStatus.length > 0) {
      return stats.complaintsByStatus;
    }
    return [
      { name: "ASSIGNED", value: stats?.assignedCount || 0 },
      { name: "IN_PROGRESS", value: inProgressCount },
      { name: "RESOLVED", value: resolvedCount },
    ].filter((item) => item.value > 0);
  }, [stats, inProgressCount, resolvedCount]);

  const complaintsByCategory: ChartDatum[] = useMemo(() => {
    if (stats?.complaintsByCategory && stats.complaintsByCategory.length > 0) {
      return stats.complaintsByCategory;
    }
    return [{ name: "General", value: totalAssigned }];
  }, [stats, totalAssigned]);

  if (isLoading) return <SkeletonDetail />;
  if (error) {
    return (
      <div className="text-destructive p-4">
        Error loading performance stats: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Analytics"
        description="Detailed metrics, resolution efficiency, and SLA compliance for your assigned tasks."
        action={
          <Link
            href="/staff"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Queue
          </Link>
        }
      />

      {/* Primary KPI Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Assigned"
          value={totalAssigned}
          description="Lifetime complaints assigned"
          icon={<Inbox className="h-4 w-4 text-primary" />}
        />
        <StatCard
          title="Resolution Rate"
          value={`${resolutionRate}%`}
          description={`${resolvedCount} of ${totalAssigned} completed`}
          icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
        />
        <StatCard
          title="Avg. Resolution Time"
          value={avgResolutionHours > 0 ? `${avgResolutionHours} hrs` : "N/A"}
          description="Average turnaround per issue"
          icon={<Clock className="h-4 w-4 text-blue-500" />}
        />
        <StatCard
          title="SLA Compliance"
          value={
            totalAssigned > 0
              ? `${Math.max(
                  0,
                  100 - Math.round((slaBreachedCount / totalAssigned) * 100)
                )}%`
              : "100%"
          }
          description={
            slaBreachedCount > 0
              ? `${slaBreachedCount} breached issues`
              : "Zero SLA breaches"
          }
          icon={
            <AlertTriangle
              className={`h-4 w-4 ${
                slaBreachedCount > 0
                  ? "text-destructive"
                  : "text-emerald-500"
              }`}
            />
          }
          className={
            slaBreachedCount > 0
              ? "border-destructive/30 bg-destructive/5"
              : ""
          }
        />
      </div>

      {/* Efficiency Highlights */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-primary/5 via-background to-background border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" /> Active Queue Load
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-primary">
              {activeQueue}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {inProgressCount} in progress, {stats?.assignedCount || 0} awaiting
              pickup
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/5 via-background to-background border-emerald-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Award className="h-4 w-4" /> Completed Resolutions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
              {resolvedCount}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Issues verified and closed
            </p>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br ${
            slaBreachedCount > 0
              ? "from-destructive/10 border-destructive/30"
              : "from-muted/40 border-border"
          } via-background to-background`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShieldAlert
                className={`h-4 w-4 ${
                  slaBreachedCount > 0
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              />{" "}
              SLA Breaches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-3xl font-bold tracking-tight ${
                slaBreachedCount > 0
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              {slaBreachedCount}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {slaBreachedCount > 0
                ? "Needs immediate escalation"
                : "No overdue complaints"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-primary" /> Tasks by Status
            </CardTitle>
            <CardDescription>
              Breakdown of all assignments across workflow stages
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            {complaintsByStatus.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No assignment data available yet.
              </div>
            ) : (
              <LazyPie
                data={complaintsByStatus}
                colorFor={(d, i) =>
                  STATUS_COLORS[d.name] || PALETTE[i % PALETTE.length]
                }
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-primary" /> Tasks by Category
            </CardTitle>
            <CardDescription>
              Distribution of complaints handled by issue category
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            {complaintsByCategory.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No category data available yet.
              </div>
            ) : (
              <LazyBar data={complaintsByCategory} barColor="#3b82f6" />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
