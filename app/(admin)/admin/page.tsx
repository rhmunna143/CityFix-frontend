"use client";

import { memo, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "@/lib/api/admin";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SkeletonDetail } from "@/components/shared/Skeletons";
import { LazyPie, LazyBar, LazyLine } from "@/components/charts";
import {
  AlertCircle,
  CheckCircle,
  FileText,
  Clock,
  Trash2,
} from "lucide-react";
import type { ChartDatum } from "@/components/charts/StatusPieChart";
import type { TrendDatum } from "@/components/charts/TrendLineChart";

export interface DashboardStats {
  totalComplaints: number;
  slaBreached?: number;
  deletedDepartments?: number;
  deletedCategories?: number;
  complaintsByStatus?: Record<string, number> | ChartDatum[];
  complaintsByDepartment?: Record<string, number> | ChartDatum[];
  resolutionTimeTrend?: TrendDatum[];
}

function normalizeData(
  data: Record<string, number> | ChartDatum[] | undefined
): ChartDatum[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    return Object.entries(data).map(([name, value]) => ({
      name,
      value: Number(value),
    }));
  }
  return [];
}

const ChartsSection = memo(function ChartsSection({
  stats,
}: {
  stats: DashboardStats;
}) {
  const complaintsByStatus = useMemo(
    () => normalizeData(stats.complaintsByStatus),
    [stats.complaintsByStatus]
  );

  const complaintsByDepartment = useMemo(() => {
    return normalizeData(
      stats.complaintsByDepartment || {
        Roads: 12,
        Water: 8,
        Sanitation: 15,
        Electricity: 5,
      }
    );
  }, [stats.complaintsByDepartment]);

  const resolutionTimeTrend: TrendDatum[] = useMemo(() => {
    return (
      stats.resolutionTimeTrend || [
        { date: "Mon", avgHours: 24 },
        { date: "Tue", avgHours: 22 },
        { date: "Wed", avgHours: 26 },
        { date: "Thu", avgHours: 18 },
        { date: "Fri", avgHours: 20 },
        { date: "Sat", avgHours: 15 },
        { date: "Sun", avgHours: 12 },
      ]
    );
  }, [stats.resolutionTimeTrend]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Complaints by Status</CardTitle>
        </CardHeader>
        <CardContent className="h-75">
          <LazyPie data={complaintsByStatus} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Complaints by Department</CardTitle>
        </CardHeader>
        <CardContent className="h-75">
          <LazyBar data={complaintsByDepartment} />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Resolution Time Trend (Avg Hours)</CardTitle>
        </CardHeader>
        <CardContent className="h-75">
          <LazyLine data={resolutionTimeTrend} />
        </CardContent>
      </Card>
    </div>
  );
});

export default function AdminDashboard() {
  const { data: stats, isLoading, error } = useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: fetchDashboardStats,
  });

  if (isLoading) return <SkeletonDetail />;
  if (error)
    return (
      <div className="text-destructive p-4">
        Error loading stats: {error.message}
      </div>
    );
  if (!stats) return null;

  const resolvedStatuses = ["RESOLVED", "CLOSED"];
  let openComplaintsCount = 0;
  let resolvedComplaintsCount = 0;

  if (stats.complaintsByStatus) {
    if (Array.isArray(stats.complaintsByStatus)) {
      stats.complaintsByStatus.forEach((item) => {
        if (resolvedStatuses.includes(item.name)) {
          resolvedComplaintsCount += item.value;
        } else {
          openComplaintsCount += item.value;
        }
      });
    } else {
      Object.entries(stats.complaintsByStatus).forEach(([status, count]) => {
        if (resolvedStatuses.includes(status)) {
          resolvedComplaintsCount += count;
        } else {
          openComplaintsCount += count;
        }
      });
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Overview"
        description="Analytics and performance metrics."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Complaints
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComplaints}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Open Complaints
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openComplaintsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Resolved (Total)
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedComplaintsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Breached</CardTitle>
            <Clock className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {stats.slaBreached || 0}
            </div>
          </CardContent>
        </Card>

        {stats.deletedDepartments !== undefined && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Deleted Departments
              </CardTitle>
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.deletedDepartments}
              </div>
            </CardContent>
          </Card>
        )}

        {stats.deletedCategories !== undefined && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Deleted Categories
              </CardTitle>
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.deletedCategories}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <ChartsSection stats={stats} />
    </div>
  );
}
