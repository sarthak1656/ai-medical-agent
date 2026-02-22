"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { StethoscopeIcon, ShieldCheck, Zap, Smartphone, Terminal } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { BentoGrid } from "./_component/BentoGrid";

export default function Home() {
  const headline = "Your AI medical voice assistant, always listening";

  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      <Navbar />

      {/* Side lines decor */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-linear-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-linear-to-b from-transparent via-blue-500 to-transparent" />
      </div>

      <div className="px-4 py-10 md:py-20">
        {/* Hero Heading */}
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex justify-center lg:mb-8"
          >
            <div className="flex items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 p-3 shadow-lg shadow-emerald-500/20">
              <StethoscopeIcon className="h-8 w-8 text-white lg:h-12 lg:w-12" />
            </div>
          </motion.span>

          {headline.split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="mr-3 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Talk naturally with our AI-powered medical voice agent. Securely captures symptoms, schedules appointments, and supports healthcare teams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/dashboard">
            <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Start Consultation
            </button>
          </Link>
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Talk to Healthcare Team
          </button>
        </motion.div>

        {/* Dashboard Preview Image */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src={"/hero_image.png"}
              alt="AI medical voice assistant dashboard"
              className="aspect-video h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>

        {/* Bento Grid Section */}
          <BentoGrid />

        {/* Trust Line */}
        <p className="mt-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Secure conversations • Healthcare-ready • Voice-first AI
        </p>
      </div>
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="flex w-full items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-teal-600 p-2">
          <StethoscopeIcon className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-lg font-bold tracking-tight md:text-2xl">MediVox AI</h1>
      </Link>
      {!user ? (
        <Link href="/sign-in">
          <button className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Login
          </button>
        </Link>
      ) : (
        <div className="flex items-center gap-4">
          <UserButton />
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};