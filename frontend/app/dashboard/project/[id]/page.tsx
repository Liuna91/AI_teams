"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft, Search, Code2, Rocket, Clock, CheckCircle2,
  Play, Loader2, FileText, GitBranch,
} from "lucide-react";
import Link from "next/link";
import ChatInterface from "@/components/ChatInterface";
import { getProject, researchProject, developProject, Project } from "@/lib/api";

export default function ProjectDetail() {
  const params = useParams();
  const projectId = Number(params.id);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    try {
      const data = await getProject(projectId);
      setProject(data);
    } catch (err) {
      console.error("Failed to load project", err);
    } finally {
      setLoading(false);
    }
  };

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString("zh-CN")}] ${msg}`]);
  };

  const handleResearch = async () => {
    setActionLoading("research");
    addLog("启动深度调研...");
    try {
      const res = await researchProject(projectId);
      addLog("调研完成！");
      addLog(JSON.stringify(res.result, null, 2).substring(0, 500));
      loadProject();
    } catch (err) {
      addLog("调研失败: " + String(err));
    } finally {
      setActionLoading(null);
    }
  };

  const handleDevelop = async () => {
    setActionLoading("develop");
    addLog("启动开发流程...");
    try {
      const res = await developProject(projectId);
      addLog("开发完成！");
      addLog(JSON.stringify(res.result, null, 2).substring(0, 500));
      loadProject();
    } catch (err) {
      addLog("开发失败: " + String(err));
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/50">项目不存在</p>
          <Link href="/dashboard" className="text-blue-400 hover:underline mt-2 inline-block">
            返回控制台
          </Link>
        </div>
      </div>
    );
  }

  const statusSteps = [
    { key: "pending", label: "待开始", icon: Clock },
    { key: "researching", label: "调研中", icon: Search },
    { key: "researched", label: "调研完成", icon: CheckCircle2 },
    { key: "developing", label: "开发中", icon: Code2 },
    { key: "developed", label: "开发完成", icon: CheckCircle2 },
  ];

  const currentStepIndex = statusSteps.findIndex((s) => s.key === project.status);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 pt-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="text-white/50 text-sm">{project.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Progress & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Progress */}
            <div className="glass p-6">
              <h2 className="text-lg font-semibold mb-4">项目进度</h2>
              <div className="flex items-center gap-2">
                {statusSteps.map((step, i) => {
                  const Icon = step.icon;
                  const isActive = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  return (
                    <div key={step.key} className="flex items-center flex-1">
                      <div className={`flex flex-col items-center ${isActive ? "text-blue-400" : "text-white/20"}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? "bg-blue-500/20" : "bg-white/5"} ${isCurrent ? "ring-2 ring-blue-400" : ""}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs mt-2">{step.label}</span>
                      </div>
                      {i < statusSteps.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-2 ${isActive && i < currentStepIndex ? "bg-blue-400" : "bg-white/10"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="glass p-6">
              <h2 className="text-lg font-semibold mb-4">执行操作</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleResearch}
                  disabled={actionLoading !== null || project.status !== "pending"}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Search className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">深度调研</p>
                    <p className="text-xs text-white/50">OpenManus 分析市场和竞品</p>
                  </div>
                  {actionLoading === "research" && <Loader2 className="w-5 h-5 animate-spin ml-auto" />}
                </button>

                <button
                  onClick={handleDevelop}
                  disabled={actionLoading !== null || project.status !== "researched"}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">开始开发</p>
                    <p className="text-xs text-white/50">MetaGPT 多角色协作开发</p>
                  </div>
                  {actionLoading === "develop" && <Loader2 className="w-5 h-5 animate-spin ml-auto" />}
                </button>

                <button className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 text-left opacity-50">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium">部署上线</p>
                    <p className="text-xs text-white/50">自动部署到云端</p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 text-left opacity-50">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium">导出代码</p>
                    <p className="text-xs text-white/50">同步到 GitHub</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Logs */}
            {logs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-6"
              >
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <GitBranch className="w-5 h-5" /> 执行日志
                </h2>
                <div className="bg-black/30 rounded-xl p-4 max-h-64 overflow-y-auto font-mono text-xs space-y-1">
                  {logs.map((log, i) => (
                    <div key={i} className="text-white/70">{log}</div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Chat */}
          <div className="lg:col-span-1">
            <ChatInterface projectId={projectId} />
          </div>
        </div>
      </div>
    </div>
  );
}
