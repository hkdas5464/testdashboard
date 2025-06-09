"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Custom media query hook for mobile detection
  const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      setMatches(media.matches);

      const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
  };

  const isMobile = useMediaQuery("(max-width: 767px)");

  // Auto-collapse sidebar on mobile screens
  useEffect(() => {
    setIsMounted(true);
    if (isMobile) {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
  }, [isMobile]);

  // Sidebar animation variants
  const sidebarVariants = {
    expanded: {
      width: 240,
      opacity: 1,
      x: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.3,
          },
    },
    collapsed: {
      width: isMobile ? 0 : 70,
      opacity: isMobile ? 0 : 1,
      x: isMobile ? -50 : 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.3,
          },
    },
    hidden: {
      width: 0,
      opacity: 0,
      x: -50,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.3,
          },
    },
    initial: {
      opacity: 0,
      x: -50,
    },
  };

  // Main content animation variants
  const mainVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          },
    },
  };

  // Function to close sidebar on nav item click in mobile view
  const handleNavItemClick = () => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.3 },
        }}
      >
        <Header
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </motion.div>
      <div className="flex flex-1 overflow-hidden">
        <AnimatePresence>
          {isMounted && (
            <motion.div
              className={`${
                sidebarCollapsed ? "md:w-[70px]" : "w-[240px]"
              } transform-gpu md:block ${
                sidebarCollapsed && isMobile ? "hidden" : ""
              }`}
              variants={sidebarVariants}
              initial="initial"
              animate={sidebarCollapsed ? "collapsed" : "expanded"}
              exit="hidden"
            >
              <Sidebar
                collapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                onNavItemClick={handleNavItemClick}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.main
          className="flex-1 overflow-y-auto p-6"
          variants={mainVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="mx-auto max-w-7xl"
            variants={mainVariants}
            initial="initial"
            animate="animate"
          >
            {children}
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}