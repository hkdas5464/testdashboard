"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentEmployees } from "@/components/dashboard/recent-employees";
import { DepartmentOverview } from "@/components/dashboard/department-overview";
import { StatsCards } from "@/components/dashboard/stats-cards";

export function DashboardOverview() {
  return (
    <div className="grid gap-6">
      <StatsCards />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <DepartmentOverview />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentEmployees />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}