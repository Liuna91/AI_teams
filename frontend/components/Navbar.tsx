"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">智源科技</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#team" className="hover:text-white transition-colors">AI 团队</a>
          <a href="#features" className="hover:text-white transition-colors">功能</a>
          <a href="#cases" className="hover:text-white transition-colors">案例</a>
          <Link href="/dashboard" className="hover:text-white transition-colors">控制台</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="hidden md:block px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            立即体验
          </Link>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/5 px-6 py-4"
        >
          <div className="flex flex-col gap-4 text-white/70">
            <a href="#team" onClick={() => setMobileOpen(false)}>AI 团队</a>
            <a href="#features" onClick={() => setMobileOpen(false)}>功能</a>
            <a href="#cases" onClick={() => setMobileOpen(false)}>案例</a>
            <Link href="/dashboard" onClick={() => setMobileOpen(false)}>控制台</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
