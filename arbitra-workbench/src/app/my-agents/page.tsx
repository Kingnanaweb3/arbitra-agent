"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { getAgents, SavedAgent } from "@/lib/agentStore";

const AGENT_ICONS: Record<string, string> = {
  trading: "ti-trending-up",
  ecommerce: "ti-shopping-cart",
  treasury: "ti-building-bank",
  payments: "ti-credit-card",
  gaming: "ti-device-gamepad-2",
  custom: "ti-robot",
};

const AGENT_COLORS: Record<string, string> = {
  trading: "#60a5fa",
  ecommerce: "#f59e0b",
  treasury: "#22c55e",
  payments: "#a78bfa",
  gaming: "#f472b6",
  custom: "#94a3b8",
};

export default function MyAgentsPage() {
  const router = useRouter();
  const [agents, setAgents] = useState<SavedAgent[]>([]);
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = getAgents();
    setAgents(saved);

    // Fetch real on-chain status for each agent
    saved.forEach(async (agent) => {
      try {
        const res = await fetch(`/api/logs?policyId=${agent.policyId}&token=${agent.token}&statsOnly=true&budget=${agent.budget}`);
        const data = await res.json();
        if (data.stats) {
          setStatuses(prev => ({ ...prev, [agent.policyId]: "active" }));
        }
      } catch {
        setStatuses(prev => ({ ...prev, [agent.policyId]: "unknown" }));
      }
    });
  }, []);

  const truncate = (str: string) => str.length > 20 ? `${str.slice(0, 10)}...${str.slice(-6)}` : str;

  const copyToClipboard = (text: string) => {
    try { navigator.clipboard.writeText(text); }
    catch { const el = document.createElement("textarea"); el.value = text; document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el); }
  };

  return (
    <AppShell>
      <div style={{ padding: "32px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", margin: 0 }}>My Agents</h1>
            <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>{agents.length} agent{agents.length !== 1 ? "s" : ""} deployed on Sui testnet</p>
          </div>
          <button
            onClick={() => router.push("/new-agent")}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "#2563eb", border: "none", color: "#fff", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          >
            <i className="ti ti-plus" style={{ fontSize: 14 }} />
            Deploy New Agent
          </button>
        </div>

        {agents.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <i className="ti ti-robot" style={{ fontSize: 48, color: "#1e2d45", display: "block", marginBottom: 16 }} />
            <p style={{ fontSize: 16, color: "#475569", marginBottom: 8 }}>No agents deployed yet</p>
            <p style={{ fontSize: 13, color: "#334155", marginBottom: 24 }}>Deploy your first agent to get started</p>
            <button
              onClick={() => router.push("/new-agent")}
              style={{ background: "#2563eb", border: "none", color: "#fff", padding: "10px 24px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
            >
              Deploy Agent
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {agents.map((agent) => {
              const color = AGENT_COLORS[agent.agentType] ?? "#94a3b8";
              const icon = AGENT_ICONS[agent.agentType] ?? "ti-robot";
              const deployedDate = new Date(agent.deployedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

              return (
                <div key={agent.policyId} style={{ background: "#0e1623", border: "1px solid #1e2d45", borderRadius: 12, padding: 20, cursor: "pointer", transition: "border-color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#2563eb")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#1e2d45")}
                  onClick={() => router.push(`/dashboard/${agent.policyId}`)}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <i className={`ti ${icon}`} style={{ fontSize: 20, color }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9" }}>{agent.agentName}</div>
                        <div style={{ fontSize: 11, color: "#64748b", textTransform: "capitalize" }}>{agent.agentType} Agent</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                      <span style={{ fontSize: 11, color: "#22c55e" }}>Active</span>
                    </div>
                  </div>

                  <div style={{ background: "#080c14", borderRadius: 8, padding: "10px 12px", marginBottom: 12 }}>
                    <div style={{ fontSize: 10, color: "#475569", marginBottom: 4 }}>POLICY ID</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, color: "#60a5fa", fontFamily: "monospace", flex: 1 }}>{truncate(agent.policyId)}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); copyToClipboard(agent.policyId); }}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", padding: 0 }}
                      >
                        <i className="ti ti-copy" style={{ fontSize: 12 }} />
                      </button>
                      
                      <a                        href={`https://suiscan.xyz/testnet/object/${agent.policyId}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{ color: "#475569", fontSize: 11 }}
                      >
                        <i className="ti ti-arrow-up-right" style={{ fontSize: 12 }} />
                      </a>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                    <div style={{ background: "#080c14", borderRadius: 6, padding: "8px 10px" }}>
                      <div style={{ fontSize: 10, color: "#475569", marginBottom: 2 }}>BUDGET</div>
                      <div style={{ fontSize: 12, color: "#f1f5f9", fontWeight: 500 }}>{agent.budget} {agent.token}</div>
                    </div>
                    <div style={{ background: "#080c14", borderRadius: 6, padding: "8px 10px" }}>
                      <div style={{ fontSize: 10, color: "#475569", marginBottom: 2 }}>SCOPE</div>
                      <div style={{ fontSize: 12, color: "#f1f5f9", fontWeight: 500, textTransform: "capitalize" }}>{agent.scope}</div>
                    </div>
                    <div style={{ background: "#080c14", borderRadius: 6, padding: "8px 10px" }}>
                      <div style={{ fontSize: 10, color: "#475569", marginBottom: 2 }}>DEPLOYED</div>
                      <div style={{ fontSize: 12, color: "#f1f5f9", fontWeight: 500 }}>{deployedDate}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/${agent.policyId}`); }}
                      style={{ flex: 1, background: "#2563eb", border: "none", color: "#fff", padding: "8px 0", borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      View Dashboard
                    </button>
                    
                    <a                      href={`https://suiscan.xyz/testnet/object/${agent.policyId}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ display: "flex", alignItems: "center", gap: 4, background: "transparent", border: "1px solid #1e2d45", color: "#64748b", padding: "8px 12px", borderRadius: 7, fontSize: 12, cursor: "pointer", textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      <i className="ti ti-brand-sui" style={{ fontSize: 12 }} />
                      Explorer
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
