"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Cpu, PenTool, Users, Globe, Code2, Megaphone, BarChart3,
} from "lucide-react";

const agents = [
  { name: "小研", role: "深度研究员", icon: Search, desc: "通过深度调研发现真实需求和市场机会", color: "from-amber-400 to-orange-500" },
  { name: "阿构", role: "系统架构师", icon: Cpu, desc: "设计系统蓝图，确保应用可扩展、高可用", color: "from-blue-400 to-cyan-500" },
  { name: "小产", role: "产品经理", icon: PenTool, desc: "将想法转化为清晰的产品定义和范围", color: "from-pink-400 to-rose-500" },
  { name: "老管", role: "团队负责人", icon: Users, desc: "端到端协调 AI 代理，把控进度并请求确认", color: "from-emerald-400 to-teal-500" },
  { name: "小优", role: "SEO 专家", icon: Globe, desc: "自动生成 SEO 页面，驱动自然流量增长", color: "from-violet-400 to-purple-500" },
  { name: "阿工", role: "全栈工程师", icon: Code2, desc: "构建生产级全栈应用，前后端一体化交付", color: "from-indigo-400 to-blue-500" },
  { name: "小广", role: "广告专员", icon: Megaphone, desc: "自动投放和优化广告，降低获客成本", color: "from-red-400 to-orange-500" },
  { name: "小数", role: "数据分析师", icon: BarChart3, desc: "分析海量数据，发现营销机会和洞察", color: "from-green-400 to-emerald-500" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function AgentTeam() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="team" className="py-24 px-6">
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
            你的 <span className="text-gradient">AI 团队</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            一支完整的 AI 团队，帮你以更低的成本更快上线。你来做决策，代理负责调研、规划、构建、测试和营销。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`glass p-6 transition-all duration-300 cursor-pointer ${
                hovered === i ? "bg-white/10 border-white/20 scale-[1.02] glow" : ""
              }`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4`}>
                <agent.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{agent.name}</h3>
              <p className="text-sm text-blue-400 mb-3">{agent.role}</p>
              <p className="text-sm text-white/50 leading-relaxed">{agent.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
