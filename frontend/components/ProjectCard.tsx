"use client";

import { motion } from "framer-motion";
import { Clock, Search, Code2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Project {
  id: number;
  name: string;
  description?: string;
  status: string;
  created_at: string;
}

const statusConfig: Record<string, { icon: any; color: string; label: string }> = {
  pending: { icon: Clock, color: "text-yellow-400", label: "待开始" },
  researching: { icon: Search, color: "text-blue-400", label: "调研中" },
  researched: { icon: CheckCircle2, color: "text-blue-400", label: "调研完成" },
  developing: { icon: Code2, color: "text-purple-400", label: "开发中" },
  developed: { icon: CheckCircle2, color: "text-emerald-400", label: "开发完成" },
  failed: { icon: AlertCircle, color: "text-red-400", label: "失败" },
};

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const status = statusConfig[project.status] || statusConfig.pending;
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/dashboard/project/${project.id}`}>
        <div className="glass p-6 hover:bg-white/[0.08] transition-all cursor-pointer group">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-white/50 mt-1 line-clamp-2">{project.description || "暂无描述"}</p>
            </div>
            <StatusIcon className={`w-5 h-5 ${status.color}`} />
          </div>
          <div className="flex items-center justify-between text-xs text-white/30">
            <span className={`${status.color}`}>{status.label}</span>
            <span>{new Date(project.created_at).toLocaleDateString("zh-CN")}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
