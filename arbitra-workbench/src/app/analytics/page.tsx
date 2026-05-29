"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { getAgents, SavedAgent } from "@/lib/agentStore";

interface AgentStats {
  agent: SavedAgent;
  approved: number;
  rejected: number;
  totalSpent: number;
  avgSize: number;
  budgetUsedPercent: number;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [agentStats, setAgentStats] = useState<AgentStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalApproved, setTotalApproved] = useState(0);
  const [totalRejected, setTotalRejected] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalAgents, setTotalAgents] = useState(0);

  useEffect(() => {
    const agents = getAgents();
    setTotalAgents(agents.length);

    if (agents.length === 0) {
      setLoading(false);
      return;
    }

    Promise.all(
      agents.map(async (agent) => {
        try {
          const res = await fetch(`/api/logs?policyId=${agent.policyId}&token=${agent.token}&budget=${agent.budget}&statsOnly=true`);
          const data = await res.json();
          const stats = data.stats;
          if (!stats) return null;
          return {
            agent,
            approved: stats.approved ?? 0,
            rejected: stats.rejected ?? 0,
            totalSpent: Number(stats.budgetUsed?.split(" ")[0] ?? 0),
            avgSize: Number(stats.avgSize?.split(" ")[0] ?? 0),
            budgetUsedPercent: stats.budgetUsedPercent ?? 0,
          };
        } catch {
          return null;
        }
      })
    ).then((results) => {
      const valid = results.filter(Boolean) as AgentStats[];
      setAgentStats(valid);
      setTotalApproved(valid.reduce((s, a) => s + a.approved, 0));
      setTotalRejected(valid.reduce((s, a) => s + a.rejected, 0));
      setTotalSpent(valid.reduce((s, a) => s + a.totalSpent, 0));
      setLoading(false);
    });
  }, []);

  const AGENT_COLORS: Record<string, string> = {
    trading: "#60a5fa",
    ecommerce: "#f59e0b",
    treasury: "#22c55e",
    payments: "#a78bfa",
    gaming: "#f472b6",
    custom: "#94a3b8",
  };

  const AGENT_ICONS: Record<string, string> = {
    trading: "ti-trending-up",
    ecommerce: "ti-shopping-cart",
    treasury: "ti-building-bank",
    payments: "ti-credit-card",
    gaming: "ti-device-gamepad-2",
    custom: "ti-robot",
  };

  return (
    <AppShell>
      <div style={{ padding: "32px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", margin: 0 }}>Analytics</h1>
          <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>Real on-chain activity across all your agents</p>
        </div>

        {/* Global stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Total Agents", value: totalAgents, icon: "ti-robot", color: "#60a5fa" },
            { label: "Total Approved", value: totalApproved, icon: "ti-circle-check", color: "#22c55e" },
            { label: "Total Rejected", value: totalRejected, icon: "ti-circle-x", color: "#ef4444" },
            { label: "Total Spent", value: `${totalSpent} USDC`, icon: "ti-coin", color: "#f59e0b" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#0e1623", border: "1px solid #1e2d45", borderRadius: 12, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `${stat.color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className={`ti ${stat.icon}`} style={{ fontSize: 18, color: stat.color }} />
                </div>
                <span style={{ fontSize: 12, color: "#64748b" }}>{stat.label}</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#f1f5f9" }}>{loading ? "—" : stat.value}</div>
            </div>
          ))}
        </div>

        {/* Per-agent breakdown */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#f1f5f9", marginBottom: 16 }}>Agent Breakdown</h2>
          {loading ? (
            <div style={{ textAlign: "center", padding: 40, color: "#475569" }}>Loading on-chain data...</div>
          ) : agentStats.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40 }}>
              <i className="ti ti-chart-bar" style={{ fontSize: 40, color: "#1e2d45", display: "block", marginBottom: 12 }} />
              <p style={{ color: "#475569" }}>No agent activity yet</p>
              <button onClick={() => router.push("/new-agent")} style={{ marginTop: 16, background: "#2563eb", border: "none", color: "#fff", padding: "8px 20px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Deploy an Agent</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
              {agentStats.map(({ agent, approved, rejected, totalSpent, avgSize, budgetUsedPercent }) => {
                const color = AGENT_COLORS[agent.agentType] ?? "#94a3b8";
                const icon = AGENT_ICONS[agent.agentType] ?? "ti-robot";
                const total = approved + rejected;
                const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0;

                return (
                  <div
                    key={agent.policyId}
                    onClick={() => router.push(`/dashboard/${agent.policyId}`)}
                    style={{ background: "#0e1623", border: "1px solid #1e2d45", borderRadius: 12, padding: 20, cursor: "pointer", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 2fr", gap: 16, alignItems: "center" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <i className={`ti ${icon}`} style={{ fontSize: 18, color }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>{agent.agentName}</div>
                        <div style={{ fontSize: 11, color: "#64748b", textTransform: "capitalize" }}>{agent.agentType}</div>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#475569", marginBottom: 2 }}>APPROVED</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "#22c55e" }}>{approved}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#475569", marginBottom: 2 }}>REJECTED</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "#ef4444" }}>{rejected}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#475569", marginBottom: 2 }}>AVG SIZE</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "#f1f5f9" }}>{avgSize} {agent.token}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#475569", marginBottom: 2 }}>APPROVAL RATE</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: approvalRate > 80 ? "#22c55e" : approvalRate > 50 ? "#f59e0b" : "#ef4444" }}>{approvalRate}%</div>
                    </div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 11, color: "#475569" }}>Budget Used</span>
                        <span style={{ fontSize: 11, color: "#94a3b8" }}>{totalSpent} / {agent.budget} {agent.token}</span>
                      </div>
                      <div style={{ height: 6, background: "#1e2d45", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${Math.min(budgetUsedPercent, 100)}%`, background: budgetUsedPercent > 80 ? "#ef4444" : budgetUsedPercent > 60 ? "#f59e0b" : "#22c55e", borderRadius: 3, transition: "width 0.3s" }} />
                      </div>
                      <div style={{ fontSize: 10, color: "#475569", marginTop: 2 }}>{budgetUsedPercent}% used</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Network stats */}
        <div style={{ background: "#0e1623", border: "1px solid #1e2d45", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9", marginBottom: 16 }}>Network</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { label: "Network", value: "Sui Testnet", icon: "ti-brand-sui", color: "#60a5fa" },
              { label: "Package", value: "0x8d2d74...e53c", icon: "ti-code", color: "#94a3b8" },
              { label: "Contract", value: "PolicyObject (Move)", icon: "ti-file-code", color: "#22c55e" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <i className={`ti ${item.icon}`} style={{ fontSize: 18, color: item.color }} />
                <div>
                  <div style={{ fontSize: 10, color: "#475569" }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: "#f1f5f9", fontWeight: 500 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
