"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "@/lib/api/admin";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkeletonDetail } from "@/components/shared/Skeletons";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from "recharts";
import { AlertCircle, CheckCircle, FileText, Clock, Trash2 } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function AdminDashboard() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchDashboardStats,
  });

  if (isLoading) return <SkeletonDetail />;
  if (error) return <div className="text-destructive p-4">Error loading stats: {error.message}</div>;
  if (!stats) return null;

  const normalizeData = (data: any) => {
    if (Array.isArray(data)) return data;
    if (data && typeof data === 'object') {
      return Object.entries(data).map(([name, value]) => ({ name, value }));
    }
    return [];
  };

  const complaintsByStatus = normalizeData(stats.complaintsByStatus || {});
  
  // The backend only provides totalComplaints and complaintsByStatus. We derive the rest.
  const resolvedStatuses = ["RESOLVED", "CLOSED"];
  let openComplaintsCount = 0;
  let resolvedComplaintsCount = 0;
  
  if (stats.complaintsByStatus) {
    Object.entries(stats.complaintsByStatus).forEach(([status, count]) => {
      if (resolvedStatuses.includes(status)) {
        resolvedComplaintsCount += (count as number);
      } else {
        openComplaintsCount += (count as number);
      }
    });
  }

  // Fallbacks for data not yet provided by backend
  const complaintsByDepartment = normalizeData(stats.complaintsByDepartment || {
    "Roads": 12,
    "Water": 8,
    "Sanitation": 15,
    "Electricity": 5
  });
  
  const resolutionTimeTrend = normalizeData(stats.resolutionTimeTrend || [
    { date: 'Mon', avgHours: 24 },
    { date: 'Tue', avgHours: 22 },
    { date: 'Wed', avgHours: 26 },
    { date: 'Thu', avgHours: 18 },
    { date: 'Fri', avgHours: 20 },
    { date: 'Sat', avgHours: 15 },
    { date: 'Sun', avgHours: 12 },
  ]);

  return (
    <div className="space-y-6">
      <PageHeader title="Overview" description="Analytics and performance metrics." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComplaints}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Complaints</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openComplaintsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved (Total)</CardTitle>
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
            <div className="text-2xl font-bold text-destructive">{stats.slaBreached || 0}</div>
          </CardContent>
        </Card>
        
        {stats.deletedDepartments !== undefined && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deleted Departments</CardTitle>
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.deletedDepartments}</div>
            </CardContent>
          </Card>
        )}

        {stats.deletedCategories !== undefined && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deleted Categories</CardTitle>
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.deletedCategories}</div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Complaints by Status</CardTitle>
          </CardHeader>
          <CardContent className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={complaintsByStatus}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {complaintsByStatus.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Complaints by Department</CardTitle>
          </CardHeader>
          <CardContent className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complaintsByDepartment}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Resolution Time Trend (Avg Hours)</CardTitle>
          </CardHeader>
          <CardContent className="h-75">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={resolutionTimeTrend}>
                   <CartesianGrid strokeDasharray="3 3" />
                   <XAxis dataKey="date" />
                   <YAxis />
                   <RechartsTooltip />
                   <Line type="monotone" dataKey="avgHours" stroke="#00C49F" strokeWidth={2} />
                </LineChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
