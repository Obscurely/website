"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { TimeProvider, useCurrentTime } from "@contexts/portfolio/TimeContext";
import {
  IconArrowRight,
  IconCircleCheckFilled,
  IconClick,
  IconCode,
  IconCurrencyDollar,
  IconFileText,
  IconLockOpen,
  IconShield,
  IconShieldCheck,
  IconUsers,
} from "@tabler/icons-react";
import { Button } from "@ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";

const TerminalLogs = () => {
  const currentTime = useCurrentTime();
  const [logs, setLogs] = useState<
    Array<{ id: string; time: string; level: string; msg: string }>
  >([]);
  const [hasStarted, setHasStarted] = useState(false);

  // Initialize logs once time is available
  useEffect(() => {
    if (!currentTime || hasStarted) return;

    const formatTime = (date: Date) =>
      `[${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}]`;

    const now = new Date(currentTime);
    // Create initial timestamps relative to the current user time
    const t1 = new Date(now.getTime() - 8000);
    const t2 = new Date(now.getTime() - 4000);

    setLogs([
      {
        id: "init-1",
        time: formatTime(t1),
        level: "SECURE",
        msg: "Security scan passed. Score: 100%.",
      },
      {
        id: "init-2",
        time: formatTime(t2),
        level: "WARN",
        msg: "Traffic spike (50k req/s). Stable.",
      },
      {
        id: "init-3",
        time: formatTime(now),
        level: "SUCCESS",
        msg: "Cloud costs reduced by 85%.",
      },
    ]);
    setHasStarted(true);
  }, [currentTime, hasStarted]);

  // Add new logs periodically
  useEffect(() => {
    if (!hasStarted) return;

    const candidates = [
      { level: "SUCCESS", msg: "Memory reduction 512MB -> 128MB." },
      { level: "SPEED", msg: "Cold start completed in 25ms." },
      { level: "SYS", msg: "Automated error handling active." },
      { level: "SYS", msg: "Auto-scaling resources on demand." },
      { level: "SHIELD", msg: "Unauthorized access blocked." },
      { level: "INFO", msg: "Fully stable. 99.99% Uptime." },
      { level: "SUCCESS", msg: "State snapshot completed." },
    ];
    let index = 0;

    const interval = setInterval(() => {
      if (index >= candidates.length) {
        clearInterval(interval);
        return;
      }

      const nextLog = candidates[index];
      index++;

      setLogs((prev) => {
        const now = new Date();
        const timeStr = `[${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}]`;

        const newEntry = {
          id: Date.now().toString() + Math.random(),
          time: timeStr,
          level: nextLog.level,
          msg: nextLog.msg,
        };

        const newState = [...prev, newEntry];
        return newState.length > 4 ? newState.slice(1) : newState;
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [hasStarted]);

  return (
    <AnimatePresence mode="popLayout">
      {logs.slice(-3).map((log, index) => {
        const isBottomLog = index === logs.slice(-3).length - 1;
        const isMiddleLog = index === 1;

        const timeOpacity = isBottomLog
          ? "text-slate-400"
          : isMiddleLog
            ? "text-slate-500"
            : "text-slate-600";

        const msgOpacity = isBottomLog
          ? "text-slate-200"
          : isMiddleLog
            ? "text-slate-400"
            : "text-slate-500";

        const getStatusColor = () => {
          const colors: Record<string, string> = {
            SUCCESS: "text-emerald-400",
            SECURE: "text-emerald-400",
            SHIELD: "text-emerald-400",
            WARN: "text-yellow-400",
            INFO: "text-blue-400",
            SPEED: "text-cyan-400",
            SYS: "text-indigo-400",
          };

          const baseColor = colors[log.level] || "text-slate-400";

          if (isBottomLog) {
            return baseColor;
          } else if (isMiddleLog) {
            return `${baseColor} opacity-60`;
          } else {
            return `${baseColor} opacity-30`;
          }
        };

        return (
          <motion.div
            key={log.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start gap-3 text-xs leading-tight py-1.5 ${
              isBottomLog
                ? "border-l-2 border-cyan-500 bg-cyan-900/10 pl-3"
                : "pl-0"
            }`}
          >
            <span className={`shrink-0 font-mono ${timeOpacity}`}>
              {log.time}
            </span>
            <span className={getStatusColor()}>{log.level}</span>
            <span className={`truncate ${msgOpacity}`}>{log.msg}</span>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export const SolutionsPageHero = () => {
  return (
    <section className="relative w-full overflow-hidden font-sans selection:bg-cyan-500/30 pt-24 lg:pt-32">
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#070d1f] overflow-hidden">
        {/* The Dot Matrix (Schematic Grid) */}
        <div className="absolute inset-0 h-full w-full">
          <div
            className="absolute inset-0"
            style={{
              // Using white at very low opacity
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.07) 1.5px, transparent 1.5px)`,
              backgroundSize: "32px 32px",
              // This mask creates the fade-out effect at the edges
              maskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            }}
          />
        </div>
      </div>

      {/* Scanline Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1))] bg-[length:100%_4px] opacity-10" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        {/* TOP STATUS BAR */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 flex w-full items-center justify-between border-b border-slate-850 pb-3 mx-auto lg:mx-0"
        >
          <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-emerald-400 font-medium">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
                  style={{ animationDuration: "2s" }}
                ></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              STATUS: AVAILABLE FOR CONTRACTS
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
            <span>WORKFLOW: ASYNC-FIRST</span>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
          {/* LEFT COLUMN */}
          <div className="max-w-3xl">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative mb-8 text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-7xl lg:text-8xl"
            >
              ENGINEERING <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-cyan-500 to-blue-600">
                SOLUTIONS
                <div className="absolute -inset-1 -z-10 block opacity-20 blur-xl bg-cyan-500/30" />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8 max-w-2xl"
            >
              <p className="mb-6 text-lg text-slate-300 sm:text-xl leading-relaxed">
                Replace infrastructure chaos with mathematical certainty. I
                solve complex scaling bottlenecks and engineer high-performance
                cloud systems designed to run without supervision.
              </p>
              <ul className="flex flex-col gap-x-8 gap-y-3 sm:flex-row sm:flex-wrap">
                {[
                  "Fixed-price assets",
                  "No hourly billing",
                  "No scope creep",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <IconCircleCheckFilled className="h-5 w-5 text-emerald-400 shrink-0 drop-shadow" />
                    <span className="text-base font-medium text-slate-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                className="group relative h-12 cursor-pointer overflow-hidden px-4 py-3 text-base transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#catalog")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-md font-medium">
                  View Catalog
                  <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                variant="outline"
                className="border-cyan-570 hover:border-cyan-590 h-12 cursor-pointer rounded-lg px-4 py-3 text-base transition-all duration-300 hover:text-white hover:shadow-lg hover:shadow-cyan-500/10"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="flex items-center justify-center gap-2 text-md">
                  Book Consultation
                  <IconUsers className="h-4 w-4" />
                </span>
              </Button>
            </motion.div>
            {/* SLA / Risk Reversal Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-slate-830 pt-3 lg:justify-start"
            >
              <div className="flex items-center gap-2.5 text-slate-500">
                <IconShield className="h-4 w-4" />
                <span className="text-xs font-mono uppercase tracking-widest">
                  100% IP Ownership
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-500">
                <IconLockOpen className="h-4 w-4" />
                <span className="text-xs font-mono uppercase tracking-widest">
                  No Vendor Lock-in
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-500">
                <IconFileText className="h-4 w-4" />
                <span className="text-xs font-mono uppercase tracking-widest">
                  Documented Handoff
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: TERMINAL */}
          <div className="hidden lg:block relative w-[480px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative z-10 w-full"
            >
              {/* Window Container */}
              <div className="relative z-10 rounded-lg border border-slate-800 bg-[#0c1327]/90 backdrop-blur-md shadow-sm overflow-hidden">
                {/* Window Buttons */}
                <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 px-4 py-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50 hover:bg-red-500 transition-colors"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50 hover:bg-yellow-500 transition-colors"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50 hover:bg-green-500 transition-colors"></div>
                  </div>
                  <div className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                    <IconCode className="h-3.5 w-3.5 text-slate-600" />
                    <span className="text-slate-500">admin@infra~</span>
                  </div>
                </div>

                {/* Terminal Content */}
                <div className="p-6 font-mono text-sm">
                  {/* Metrics Grid */}
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="group relative cursor-help rounded-sm border border-slate-800/50 bg-slate-900/50 p-3 transition-colors hover:border-emerald-500/20 hover:bg-slate-900/80">
                            {/* Hover Indicator */}
                            <IconClick
                              size={12}
                              className="absolute right-2 top-2 h-5 w-3 animate-pulse text-slate-500 opacity-75 group-hover:opacity-100"
                            />

                            <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                              <IconShieldCheck className="h-3 w-3" />{" "}
                              SECURITY_SCORE
                            </div>
                            <div className="text-2xl font-bold text-emerald-400">
                              A+
                            </div>
                            <div className="relative z-20 mt-2 text-[10px] font-mono text-slate-500">
                              // Security Hardening
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="border border-slate-800 bg-[#0c1327] text-xs text-slate-300">
                          <p>
                            Best security practices implemented.
                            <br /> Zero-trust architecture verified.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="group relative cursor-help rounded-sm border border-slate-800/50 bg-slate-900/50 p-3 transition-colors hover:border-cyan-500/20 hover:bg-slate-900/80">
                            {/* Hover Indicator */}
                            <IconClick
                              size={12}
                              className="absolute right-2 top-2 h-5 w-3 animate-pulse text-slate-500 opacity-75 group-hover:opacity-100"
                            />

                            <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-500">
                              <IconCurrencyDollar className="h-3 w-3" />{" "}
                              COST_REDUCTION
                            </div>
                            <div className="text-2xl font-bold text-cyan-400">
                              -85%
                            </div>
                            <div className="relative z-20 mt-2 text-[10px] font-mono">
                              <Link
                                href="/solutions/lambda-rust-migration"
                                className="text-slate-500 decoration-slate-700/50 hover:text-cyan-400 hover:underline hover:decoration-cyan-500/50 hover:underline-offset-2 transition-colors"
                              >
                                // Lambda Rust Migration
                              </Link>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="w-64 border border-slate-800 bg-[#0c1327] font-mono text-xs text-slate-300">
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between">
                              <span className="text-slate-500">
                                ARCHITECTURE:
                              </span>
                              <span>
                                x86 → ARM64{" "}
                                <span className="text-emerald-400">(-20%)</span>
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">MEMORY:</span>
                              <span>
                                512MB → 128MB{" "}
                                <span className="text-emerald-400">(-75%)</span>
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">RUNTIME:</span>
                              <span>
                                Python → Rust{" "}
                                <span className="text-emerald-400">
                                  (10x Speed)
                                </span>
                              </span>
                            </div>
                            <div className="mt-2 border-t border-slate-800 pt-2 text-right font-bold text-cyan-400">
                              TOTAL: -85%
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Activity Logs */}
                  <div className="relative mt-4 overflow-hidden border-t border-slate-800 pt-3">
                    {/* Container with fixed height for exactly 3 lines */}
                    <div className="relative h-[90px] flex flex-col justify-end gap-1">
                      <TimeProvider>
                        <TerminalLogs />
                      </TimeProvider>
                    </div>
                  </div>

                  {/* Traffic Graph */}
                  <div className="mt-5 pt-2 border-t border-slate-800/50">
                    <div className="mb-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      THROUGHPUT_BENCHMARK
                    </div>

                    <div className="flex items-end justify-between gap-4">
                      {/* Zone 1: STANDARD_CAPACITY (Weak/Struggling) */}
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="group flex flex-1 flex-col justify-end cursor-help">
                              <div className="flex h-12 items-end justify-between gap-1 border-b border-slate-800 pb-1 px-1">
                                {[20, 28, 15, 25, 18, 30, 22, 16].map(
                                  (h, i) => (
                                    <motion.div
                                      key={`std-${i}`}
                                      initial={{ height: 0 }}
                                      animate={{ height: `${h}%` }}
                                      transition={{
                                        duration: 0.5,
                                        delay: i * 0.05,
                                      }}
                                      // Added duration-300 for smooth transition
                                      className="w-2 rounded-sm bg-slate-700 transition-colors duration-300 group-hover:bg-slate-600"
                                    />
                                  )
                                )}
                              </div>
                              <div className="mt-2 text-center text-[10px] font-mono text-slate-500 uppercase transition-colors group-hover:text-slate-400">
                                BASELINE_ARCH
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="border border-slate-700 bg-[#0c1327] text-xs font-mono text-slate-300"
                          >
                            SATURATION POINT: ~500 REQ/S
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      {/* Divider */}
                      <div className="h-10 w-px bg-slate-800 self-end mb-6" />

                      {/* Zone 2: SCALABLE_CORE (Massive/Dominant) */}
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="group flex flex-1 flex-col justify-end cursor-help">
                              <div className="flex h-12 items-end justify-between gap-1 border-b border-cyan-900/30 pb-1 px-1">
                                {[95, 82, 100, 88, 92, 85, 98, 90].map(
                                  (h, i) => (
                                    <motion.div
                                      key={`core-${i}`}
                                      initial={{ height: 0 }}
                                      animate={{ height: `${h}%` }}
                                      transition={{
                                        duration: 0.5,
                                        delay: 0.4 + i * 0.05,
                                      }}
                                      className="w-2 rounded-sm bg-cyan-600 transition-colors duration-300 group-hover:bg-cyan-500"
                                    />
                                  )
                                )}
                              </div>
                              <div className="mt-2 text-center text-[10px] font-mono text-cyan-400 uppercase transition-colors group-hover:text-cyan-300">
                                OPTIMIZED_CORE
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="border border-cyan-900/50 bg-[#0c1327] text-xs font-mono text-cyan-400"
                          >
                            SATURATION POINT: ~50K REQ/S
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* --- TECH STACK FLOOR --- */}
      <div className="relative mt-17 left-0 w-full border-t border-white/5 bg-[#070d1f]/80 backdrop-blur-sm py-2">
        <div className="container mx-auto flex flex-wrap justify-center gap-8 md:gap-16 px-4">
          {["RUST", "KUBERNETES", "AWS", "TERRAFORM", "DOCKER", "LINUX"].map(
            (tech) => (
              <span
                key={tech}
                className="text-sm font-mono font-bold tracking-wider text-slate-600 hover:text-slate-400 transition-colors cursor-default opacity-50 hover:opacity-100"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
};
