"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Mail, MoreHorizontal, Phone } from "lucide-react";
import { Employee } from "@/types/employee";

interface EmployeeCardProps {
  employee: Employee;
  onClick: () => void;
}

export function EmployeeCard({ employee, onClick }: EmployeeCardProps) {
  return (
    <Card 
      className="overflow-hidden transition-all duration-200 hover:shadow-md"
      onClick={onClick}
    >
      <div className="h-2 bg-primary" />
      <div className="p-5">
        <div className="flex justify-between items-start">
          <Avatar className="h-12 w-12 mb-3">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback>{employee.initials}</AvatarFallback>
          </Avatar>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>View Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-destructive">
                Deactivate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="space-y-1.5">
          <h3 className="font-semibold text-lg leading-none">{employee.name}</h3>
          <p className="text-sm text-muted-foreground">{employee.position}</p>
        </div>

        <div className="mt-3 flex items-center gap-1">
          <Badge variant={
            employee.status === "Active" ? "default" : 
            employee.status === "On Leave" ? "outline" : "secondary"
          }>
            {employee.status}
          </Badge>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            <span className="truncate">{employee.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-3.5 w-3.5" />
            <span>{employee.phone}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}