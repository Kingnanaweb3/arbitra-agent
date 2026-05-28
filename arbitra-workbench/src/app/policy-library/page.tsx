"use client";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";

const TEMPLATES = [
  {
    id: "dca-balanced",
    name: "DCA Trading — Balanced",
    desc: "Dollar-cost averaging on Deepbook with balanced risk controls. Best for medium-frequency trading agents.",
    type: "trading",
    icon: "ti-trending-up",
    color: "#60a5fa",
    budget: 200,
    token: "USDC",
    riskCeiling: 75,
    maxTx: 50,
    scope: "deepbook",
    expiry: "24",
    slippageGuardBps: 250,
    tags: ["DCA", "Deepbook", "Balanced"],
    badge: "Popular",
    badgeColor: "#2563eb",
  },
  {
    id: "dca-conservative",
    name: "DCA Trading — Conservative",
    desc: "Low-risk DCA with tight slippage and small transaction limits. Ideal for cautious trading agents.",
    type: "trading",
    icon: "ti-trending-up",
    color: "#60a5fa",
    budget: 100,
    token: "USDC",
    riskCeiling: 50,
    maxTx: 20,
    scope: "deepbook",
    expiry: "24",
    slippageGuardBps: 100,
    tags: ["DCA", "Conservative"],
    badge: null,
    badgeColor: null,
  },
  {
    id: "dca-aggressive",
    name: "DCA Trading — Aggressive",
    desc: "High-frequency DCA with larger transaction limits. For confident trading strategies.",
    type: "trading",
    icon: "ti-trending-up",
    color: "#60a5fa",
    budget: 500,
    token: "USDC",
    riskCeiling: 90,
    maxTx: 100,
    scope: "deepbook",
    expiry: "24",
    slippageGuardBps: 500,
    tags: ["DCA", "Aggressive", "High Volume"],
    badge: "Advanced",
    badgeColor: "#ef4444",
  },
  {
    id: "ecommerce-standard",
    name: "E-Commerce Buyer — Standard",
    desc: "Autonomous purchasing agent with vendor controls and weekly budget reset.",
    type: "ecommerce",
    icon: "ti-shopping-cart",
    color: "#f59e0b",
    budget: 200,
    token: "USDC",
    riskCeiling: 60,
    maxTx: 50,
    scope: "custom",
    expiry: "168",
    slippageGuardBps: 0,
    tags: ["Purchasing", "Vendor-controlled"],
    badge: "Popular",
    badgeColor: "#2563eb",
  },
  {
    id: "ecommerce-micro",
    name: "E-Commerce Buyer — Micro",
    desc: "Small budget purchasing agent for low-value transactions and subscriptions.",
    type: "ecommerce",
    icon: "ti-shopping-cart",
    color: "#f59e0b",
    budget: 50,
    token: "USDC",
    riskCeiling: 40,
    maxTx: 10,
    scope: "custom",
    expiry: "168",
    slippageGuardBps: 0,
    tags: ["Micro", "Subscriptions"],
    badge: null,
    badgeColor: null,
  },
  {
    id: "dao-treasury",
    name: "DAO Treasury — Standard",
    desc: "Monthly grant distribution with DAO override and beneficiary controls.",
    type: "treasury",
    icon: "ti-building-bank",
    color: "#22c55e",
    budget: 1000,
    token: "USDC",
    riskCeiling: 30,
    maxTx: 200,
    scope: "custom",
    expiry: "720",
    slippageGuardBps: 0,
    tags: ["DAO", "Grants", "Treasury"],
    badge: "New",
    badgeColor: "#22c55e",
  },
  {
    id: "payments-standard",
    name: "Payment Processor — Standard",
    desc: "B2B payment agent with invoice controls and daily spend limits.",
    type: "payments",
    icon: "ti-credit-card",
    color: "#a78bfa",
    budget: 500,
    token: "USDC",
    riskCeiling: 50,
    maxTx: 100,
    scope: "custom",
    expiry: "24",
    slippageGuardBps: 0,
    tags: ["Payments", "B2B", "Invoicing"],
    badge: null,
    badgeColor: null,
  },
  {
    id: "gaming-standard",
    name: "Gaming Agent — Standard",
    desc: "In-game purchasing agent with per-item limits and daily budget caps.",
    type: "gaming",
    icon: "ti-device-gamepad-2",
    color: "#f472b6",
    budget: 100,
    token: "USDC",
    riskCeiling: 60,
    maxTx: 20,
    scope: "custom",
    expiry: "24",
    slippageGuardBps: 0,
    tags: ["Gaming", "In-game", "NFT"],
    badge: "New",
    badgeColor: "#22c55e",
  },
];

const TYPE_FILTERS = ["All", "trading", "ecommerce", "treasury", "payments", "gaming"];

export default function PolicyLibraryPage() {
  const router = useRouter();
  const [filter, setFilter] = (typeof window !== "undefined" ? require("react") : { useState: (v: any) => [v, () => {}] }).useState("All");

  const filtered = filter === "All" ? TEMPLATES : TEMPLATES.filter(t => t.type === filter);

  const deploy = (template: typeof TEMPLATES[0]) => {
    const params = new URLSearchParams({
      template: template.id,
      type: template.type,
      budget: String(template.budget),
      token: template.token,
      riskCeiling: String(template.riskCeiling),
      maxTx: String(template.maxTx),
      scope: template.scope,
      expiry: template.expiry,
      slippageGuardBps: String(template.slippageGuardBps),
    });
    router.push(`/new-agent?${params.toString()}`);
  };

  return (
    <AppShell>
      <div style={{ padding: "32px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", margin: 0 }}>Policy Library</h1>
          <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>Pre-built policy templates. Deploy in one click with your agent endpoint.</p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" as const }}>
          {TYPE_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 16px", borderRadius: 20, fontSize: 12, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                background: filter === f ? "#2563eb" : "transparent",
                border: `1px solid ${filter === f ? "#2563eb" : "#1e2d45"}`,
                color: filter === f ? "#fff" : "#64748b",
              }}
            >
              {f === "All" ? "All Templates" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Templates grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {filtered.map(template => (
            <div
              key={template.id}
              style={{ background: "#0e1623", border: "1px solid #1e2d45", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column" as const, gap: 0 }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${template.color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <i className={`ti ${template.icon}`} style={{ fontSize: 20, color: template.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>{template.name}</div>
                    {template.badge && (
                      <span style={{ fontSize: 10, background: `${template.badgeColor}20`, color: template.badgeColor, border: `1px solid ${template.badgeColor}40`, borderRadius: 4, padding: "1px 6px" }}>
                        {template.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, marginBottom: 16 }}>{template.desc}</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                <div style={{ background: "#080c14", borderRadius: 6, padding: "8px 10px" }}>
                  <div style={{ fontSize: 10, color: "#475569", marginBottom: 2 }}>BUDGET</div>
                  <div style={{ fontSize: 12, color: "#f1f5f9", fontWeight: 500 }}>{template.budget} {template.token}</div>
                </div>
                <div style={{ background: "#080c14", borderRadius: 6, padding: "8px 10px" }}>
                  <div style={{ fontSize: 10, color: "#475569", marginBottom: 2 }}>RISK CEILING</div>
                  <div style={{ fontSize: 12, color: "#f1f5f9", fontWeight: 500 }}>{template.riskCeiling}/100</div>
                </div>
                <div style={{ background: "#080c14", borderRadius: 6, padding: "8px 10px" }}>
                  <div style={{ fontSize: 10, color: "#475569", marginBottom: 2 }}>MAX TX</div>
                  <div style={{ fontSize: 12, color: "#f1f5f9", fontWeight: 500 }}>{template.maxTx} {template.token}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, marginBottom: 16 }}>
                {template.tags.map(tag => (
                  <span key={tag} style={{ fontSize: 10, color: "#475569", background: "#0e1623", border: "1px solid #1e2d45", borderRadius: 4, padding: "2px 8px" }}>{tag}</span>
                ))}
              </div>

              <button
                onClick={() => deploy(template)}
                style={{ width: "100%", background: "#2563eb", border: "none", color: "#fff", padding: "10px 0", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", marginTop: "auto" }}
              >
                Deploy with this template →
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
