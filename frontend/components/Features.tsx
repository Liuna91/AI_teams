"use client";

import { motion } from "framer-motion";
import {
  Sparkles, Database, Zap, Shield, Globe, Megaphone,
  CheckCircle2, ArrowRight,
} from "lucide-react";

const featureList = [
  { icon: Sparkles, title: "可视化编辑器", desc: "精确调整布局和组件，所见即所得" },
  { icon: Database, title: "智源云后端", desc: "内置用户登录、数据库、支付集成和弹性托管" },
  { icon: Zap, title: "竞速模式", desc: "同时运行多个模型，瞬间获得最佳版本" },
  { icon: Shield, title: "AI 集成", desc: "零配置接入 Gemini、GPT 等主流大模型" },
  { icon: Globe, title: "SEO 代理", desc: "自动优化站点结构，提升搜索引擎排名" },
  { icon: Megaphone, title: "广告专家", desc: "自动化广告投放、追踪和优化" },
];

const highlights = [
  { title: "分钟级上线", desc: "告诉智源你的想法，几分钟内即可获得可使用的应用。通过对话获取完整的功能页面、流程和特性。" },
  { title: "真实应用，非演示", desc: "构建可上线、可增长、可扩展的真实产品。内置用户登录、数据存储、Stripe 支付等全栈能力。" },
  { title: "商业工具集", desc: "在一个地方运行完整工作流。市场调研、全栈开发、部署、SEO 优化、集成和结果追踪，全部自动化。" },
  { title: "获取付费客户", desc: "将想法转化为人们愿意付费的产品。智源负责发布、托管和日常运营，让你更快获得收入。" },
  { title: "完全可控", desc: "随时导出代码并同步到 GitHub。随着业务增长，你对项目拥有完全控制权。" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Features() {
  return (
    <>
      {/* Highlights */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              研究、设计、开发、<span className="text-gradient">营销</span> 一体化
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={i}
                className="glass p-8"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              构建、发布、增长所需的<span className="text-gradient">一切</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureList.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={i}
                className="glass p-6 hover:bg-white/[0.08] transition-colors group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <feature.icon className="w-8 h-8 text-blue-400" />
                  <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/60 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
