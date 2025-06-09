"use client";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Users, Briefcase, Building, CalendarClock } from "lucide-react";

export function StatsCards() {
  const stats = [
    {
      title: "Total Employees",
      value: "1,234",
      description: "14 new this month",
      icon: <Users className="h-5 w-5 text-primary" />,
      change: "+2.5%",
    },
    {
      title: "Open Positions",
      value: "23",
      description: "5 filled this month",
      icon: <Briefcase className="h-5 w-5 text-primary" />,
      change: "-12%",
    },
    {
      title: "Departments",
      value: "15",
      description: "Across 4 locations",
      icon: <Building className="h-5 w-5 text-primary" />,
      change: "0%",
    },
    {
      title: "Avg. Tenure",
      value: "3.7 yrs",
      description: "Improved from last year",
      icon: <CalendarClock className="h-5 w-5 text-primary" />,
      change: "+0.4",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 p-1.5 flex items-center justify-center">
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <CardDescription>{stat.description}</CardDescription>
              <span className={stat.change.startsWith('+') ? 'text-green-500' : stat.change.startsWith('-') ? 'text-red-500' : ''}>
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}