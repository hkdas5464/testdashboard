"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronRight, 
  User, 
  PanelLeft, 
  Home, 
  Settings,
  ChevronsLeft,
  ChevronsRight,
  Network
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNavItemClick?: () => void;
}

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  collapsed: boolean;
  onNavItemClick?: () => void;
}

function SidebarItem({ href, icon, title, isActive, collapsed, onNavItemClick }: SidebarItemProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link 
            href={href} 
            onClick={() => onNavItemClick?.()}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-300 ease-in-out",
              isActive ? 
                "bg-primary/10 text-primary" : 
                "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
            )}
          >
            <span className="flex h-6 w-6 items-center justify-center">
              {icon}
            </span>
            {!collapsed && (
              <span className="truncate">{title}</span>
            )}
            {!collapsed && isActive && (
              <ChevronRight className="ml-auto h-4 w-4" />
            )}
          </Link>
        </TooltipTrigger>
        {collapsed && (
          <TooltipContent side="right">
            {title}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export function Sidebar({ collapsed, onToggleCollapse, onNavItemClick }: SidebarProps) {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/", icon: <Home size={18} />, title: "Dashboard" },
    { href: "/profile", icon: <User size={18} />, title: "My Profile" },
    { href: "/organization", icon: <Network size={18} />, title: "Organization" },
    { href: "/settings", icon: <Settings size={18} />, title: "Settings" }
  ];

  return (
    <div 
      className={cn(
        "flex flex-col border-r bg-card transition-all duration-300 ease-in-out h-full",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className={cn(
        "flex h-14 items-center border-b px-4",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <PanelLeft className="h-5 w-5" />
            <span className="font-semibold">Employee Portal</span>
          </Link>
        )}
        {collapsed && (
          <PanelLeft className="h-5 w-5" />
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleCollapse}
          className={cn(
            "md:flex",
            collapsed ? "ml-0" : "ml-auto",
            "hidden" // Hide on mobile
          )}
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </Button>
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              title={item.title}
              isActive={pathname === item.href}
              collapsed={collapsed}
              onNavItemClick={onNavItemClick}
            />
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}