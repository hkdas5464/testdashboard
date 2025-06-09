"use client";

import { useTheme } from "next-themes";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

export function DepartmentOverview() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const data = [
    { name: "Engineering", value: 310, color: "var(--chart-1)" },
    { name: "Sales", value: 150, color: "var(--chart-2)" },
    { name: "Marketing", value: 120, color: "var(--chart-3)" },
    { name: "HR", value: 80, color: "var(--chart-4)" },
    { name: "Operations", value: 140, color: "var(--chart-5)" },
  ];

  const departmentMetrics = [
    { department: "Engineering", headcount: 310, openPositions: 8, turnover: "4.2%" },
    { department: "Sales", headcount: 150, openPositions: 5, turnover: "6.7%" },
    { department: "Marketing", headcount: 120, openPositions: 3, turnover: "5.8%" },
    { department: "HR", headcount: 80, openPositions: 2, turnover: "3.5%" },
    { department: "Operations", headcount: 140, openPositions: 5, turnover: "4.9%" },
  ];

  return (
    <div className="space-y-6">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => 
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? 'hsl(var(--card))' : 'white',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6">
        <div className="rounded-lg border">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Headcount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Open Positions
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Turnover Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {departmentMetrics.map((dept) => (
                <tr key={dept.department}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{dept.department}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{dept.headcount}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{dept.openPositions}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{dept.turnover}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}