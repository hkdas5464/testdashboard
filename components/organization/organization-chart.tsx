"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { orgChartData } from "@/data/organization";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

interface OrgNode {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar?: string;
  children?: OrgNode[];
}

interface NodeProps {
  node: OrgNode;
  level: number;
}

function OrgNode({ node, level }: NodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: level * 0.1 }}
        className="flex flex-row items-center justify-center"
      >
        <div
          className="inline-block bg-gradient-to-br from-card to-card-foreground/10 rounded-xl border border-border/50 p-4 shadow-lg w-full max-w-[280px] sm:max-w-[320px] text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
          role="group"
          aria-label={`Employee: ${node.name}`}
        >
          <div className="flex flex-col items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-md"
                  >
                    {node.avatar ? (
                      <img
                        src={node.avatar}
                        alt={node.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-base font-semibold text-primary-foreground">
                        {node.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    )}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{node.name} - {node.role}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="space-y-1">
              <p className="font-bold text-sm sm:text-base text-foreground truncate">
                {node.name}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {node.role}
              </p>
              <p className="text-xs mt-2">
                <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {node.department}
                </span>
              </p>
            </div>
            {node.children && node.children.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpand}
                className="mt-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isExpanded ? (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </motion.div>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {node.children && node.children.length > 0 && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-4 pt-6 relative"
          >
            <div className="absolute top-0 left-1/2 h-6 w-px bg-gradient-to-b from-border to-transparent -translate-x-1/2"></div>
            <div className="flex flex-row justify-center">
              <div className="grid grid-flow-col gap-2 sm:gap-4 md:gap-6">
                {node.children.map((child, index) => (
                  <div key={child.id} className="relative">
                    {node.children && node.children.length > 1 && (
                      <>
                        {index === 0 && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "calc(50% + 8px)" }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-0 left-1/2 h-px bg-gradient-to-r from-border to-transparent -translate-y-6"
                          ></motion.div>
                        )}
                        {index === node.children.length - 1 && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "calc(50% + 8px)" }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-0 right-1/2 h-px bg-gradient-to-l from-border to-transparent -translate-y-6"
                          ></motion.div>
                        )}
                        {index > 0 && index < node.children.length - 1 && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-0 w-full h-px bg-border -translate-y-6"
                          ></motion.div>
                        )}
                      </>
                    )}
                    <div className="relative">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 24 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-0 left-1/2 h-6 w-px bg-gradient-to-b from-border to-transparent -translate-x-1/2 -translate-y-6"
                      ></motion.div>
                      <OrgNode node={child} level={level + 1} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function OrganizationChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.3));
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomSpeed = 0.002;
    setScale((prev) => {
      const newScale = prev - e.deltaY * zoomSpeed;
      return Math.min(Math.max(newScale, 0.3), 2.5);
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      e.preventDefault();
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <Card className="relative overflow-hidden border-none shadow-xl bg-background/95 backdrop-blur-sm">
      <CardContent className="p-0">
        <motion.div
          className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-background/90 backdrop-blur-md p-2 rounded-full border border-border/50 shadow-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={zoomIn}
                  className="rounded-full hover:bg-primary/10 transition-colors duration-200"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="h-5 w-5 text-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom In</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={zoomOut}
                  className="rounded-full hover:bg-primary/10 transition-colors duration-200"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="h-5 w-5 text-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetZoom}
                  className="rounded-full hover:bg-primary/10 transition-colors duration-200"
                  aria-label="Reset Zoom"
                >
                  <Maximize2 className="h-5 w-5 text-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset Zoom</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
        <div
          className="min-h-[500px] sm:min-h-[600px] md:min-h-[800px] w-full overflow-auto relative touch-pan-y touch-pan-x"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "none",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Organization Chart"
        >
          <motion.div
            ref={chartRef}
            className="absolute pt-10 pb-20 px-4 sm:px-8 md:px-12"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: "center center",
            }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
          >
            <OrgNode node={orgChartData} level={0} />
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}