"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const logos = ["OpenAI", "NVIDIA", "Google", "Amazon", "Microsoft", "Stanford", "MIT", "Tesla"];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-8"
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
          全球已有 10,000+ 创作者使用智源科技
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          将想法转化为
          <br />
          <span className="text-gradient">可销售的产品</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10"
        >
          AI 员工帮你验证想法、构建产品、获取客户。几分钟内完成，无需编写代码。
          集成 MetaGPT + OpenManus 的多智能体开发平台。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            免费开始 <ArrowRight className="w-4 h-4" />
          </Link>
          <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
            <Play className="w-4 h-4" /> 观看演示
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <p className="text-xs text-white/30 uppercase tracking-widest mb-6">深受以下团队信赖</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-40">
            {logos.map((logo) => (
              <span key={logo} className="text-lg font-semibold text-white/60">{logo}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
