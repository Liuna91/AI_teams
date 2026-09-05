"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              将想法转化为
              <br />
              <span className="text-gradient">可销售的产品</span>
            </h2>
            <p className="text-white/50 mb-10 text-lg">
              加入 10,000+ 创作者，用 AI 团队加速你的产品上线。
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              免费开始构建 <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold">智源科技</span>
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white/70 transition-colors">文档</a>
            <a href="#" className="hover:text-white/70 transition-colors">GitHub</a>
            <a href="#" className="hover:text-white/70 transition-colors">联系我们</a>
          </div>
          <p className="text-sm text-white/30"> 智源科技. 保留所有权利。</p>
        </div>
      </footer>
    </>
  );
}
