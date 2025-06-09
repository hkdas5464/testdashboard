"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockEmployees } from "@/data/employees";

export function RecentEmployees() {
  const router = useRouter();
  const recentEmployees = mockEmployees.slice(0, 5);
  
  return (
    <div className="space-y-4">
      {recentEmployees.map((employee) => (
        <div 
          key={employee.id} 
          className="flex items-center justify-between space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 cursor-pointer"
          onClick={() => router.push(`/employees/${employee.id}`)}
        >
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={employee.avatar} alt={employee.name} />
              <AvatarFallback>{employee.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{employee.name}</p>
              <p className="text-xs text-muted-foreground">{employee.position}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={employee.status === "Active" ? "default" : employee.status === "On Leave" ? "outline" : "secondary"}>
              {employee.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/employees/${employee.id}`);
                }}>View Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Message</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
      
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={() => router.push('/employees')}
      >
        View All Employees
      </Button>
    </div>
  );
}