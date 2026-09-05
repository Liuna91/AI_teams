"use client";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: string;
  idea?: string;
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  status: string;
  capabilities: string[];
  icon: string;
}

export interface ChatMessage {
  role: "user" | "agent" | "system";
  content: string;
  agent_name?: string;
  timestamp?: string;
}

// Projects API
export async function createProject(data: { name: string; description?: string; idea: string }): Promise<Project> {
  const res = await fetch(`${API_BASE}/api/v1/projects/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/api/v1/projects/`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function getProject(id: number): Promise<Project> {
  const res = await fetch(`${API_BASE}/api/v1/projects/${id}`);
  if (!res.ok) throw new Error("Failed to fetch project");
  return res.json();
}

export async function researchProject(id: number) {
  const res = await fetch(`${API_BASE}/api/v1/projects/${id}/research`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to start research");
  return res.json();
}

export async function developProject(id: number) {
  const res = await fetch(`${API_BASE}/api/v1/projects/${id}/develop`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to start development");
  return res.json();
}

// Agents API
export async function getAgents(): Promise<Agent[]> {
  const res = await fetch(`${API_BASE}/api/v1/agents/`);
  if (!res.ok) throw new Error("Failed to fetch agents");
  return res.json();
}

// Chat API
export async function sendMessage(message: string, projectId?: number): Promise<{ response: string; agent_name?: string }> {
  const res = await fetch(`${API_BASE}/api/v1/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, project_id: projectId }),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}

// WebSocket Chat
export function createChatSocket(clientId: string): WebSocket {
  return new WebSocket(`${API_BASE.replace("http", "ws")}/api/v1/chat/ws/${clientId}`);
}
