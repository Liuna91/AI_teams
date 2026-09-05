"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Sparkles, LayoutDashboard, MessageSquare, Settings } from "lucide-react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import ChatInterface from "@/components/ChatInterface";
import { getProjects, createProject, Project } from "@/lib/api";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "", idea: "" });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newProject.name.trim() || !newProject.idea.trim()) return;
    setCreating(true);
    try {
      await createProject(newProject);
      setShowCreate(false);
      setNewProject({ name: "", description: "", idea: "" });
      loadProjects();
    } catch (err) {
      alert("创建失败，请重试");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white/[0.02] border-r border-white/5 pt-16 hidden lg:block">
        <div className="p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white">
            <LayoutDashboard className="w-5 h-5" />
            <span>项目管理</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span>团队对话</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            <span>设置</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">项目管理</h1>
              <p className="text-white/50 text-sm mt-1">管理你的 AI 团队项目</p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" /> 新建项目
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-12 text-center"
            >
              <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">还没有项目</h3>
              <p className="text-white/50 mb-6">创建你的第一个 AI 团队项目，将想法转化为现实</p>
              <button
                onClick={() => setShowCreate(true)}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                立即创建
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          )}

          {/* Global Chat */}
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">与 AI 团队对话</h2>
            <ChatInterface />
          </div>
        </div>
      </main>

      {/* Create Modal */}
      {showCreate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass w-full max-w-lg p-6"
          >
            <h2 className="text-xl font-bold mb-4">新建项目</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/70 mb-1 block">项目名称</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="例如：智能客服系统"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <div>
                <label className="text-sm text-white/70 mb-1 block">项目描述</label>
                <input
                  type="text"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="简短描述项目目标"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <div>
                <label className="text-sm text-white/70 mb-1 block">核心想法 *</label>
                <textarea
                  value={newProject.idea}
                  onChange={(e) => setNewProject({ ...newProject, idea: e.target.value })}
                  placeholder="详细描述你的产品想法，AI 团队会基于此进行分析和开发..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500/50 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreate(false)}
                className="px-5 py-2.5 rounded-xl text-white/70 hover:bg-white/5 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleCreate}
                disabled={creating || !newProject.name.trim() || !newProject.idea.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {creating ? "创建中..." : "创建项目"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
