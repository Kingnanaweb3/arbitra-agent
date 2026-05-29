"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { getAgents, clearAgents, DeployedAgent } from "@/lib/agentStore";

const PACKAGE_ID = "0x8d2d740caccc02db4643f6ebccada30e0b029fb6274fdb9ffed04fed3ad3e53c";
const API_ENDPOINT = "https://arbitra-nine.vercel.app/api/action";

export default function SettingsPage() {
  const router = useRouter();
  const [wallet, setWallet] = useState<string | null>(null);
  const [agentCount, setAgentCount] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const [notifications, setNotifications] = useState({
    rejectedActions: true,
    budgetWarnings: true,
    agentExpiry: true,
  });
  const [defaults, setDefaults] = useState({
    budget: 200,
    riskCeiling: 75,
    expiry: "24",
    token: "USDC",
  });
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const agents = getAgents();
    setAgentCount(agents.length);
    // Get connected wallet from localStorage
    const stored = localStorage.getItem("arbitra_wallet");
    if (stored) setWallet(stored);
  }, []);

  const copy = (text: string, label: string) => {
    try { navigator.clipboard.writeText(text); }
    catch { const el = document.createElement("textarea"); el.value = text; document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el); }
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const sectionStyle = { background: "#0e1623", border: "1px solid #1e2d45", borderRadius: 12, padding: 24, marginBottom: 16 };
  const labelStyle = { fontSize: 12, color: "#64748b", marginBottom: 4 };
  const valueStyle = { fontSize: 13, color: "#f1f5f9", fontWeight: 500 };
  const inputStyle = { background: "#080c14", border: "1px solid #1e2d45", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#f1f5f9", fontFamily: "'DM Sans', sans-serif", outline: "none", width: "100%", boxSizing: "border-box" as const };

  return (
    <AppShell>
      <div style={{ padding: "32px 40px", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", margin: 0 }}>Settings</h1>
          <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>Manage your Arbitra workspace</p>
        </div>

        {/* Wallet */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9", marginBottom: 16, marginTop: 0 }}>Wallet</h3>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={labelStyle}>Connected Wallet</div>
              <div style={{ ...valueStyle, fontFamily: "monospace", fontSize: 12, color: "#60a5fa" }}>
                {wallet ?? "Not connected"}
              </div>
            </div>
            <button
              onClick={() => router.push("/connect")}
              style={{ background: "transparent", border: "1px solid #1e2d45", color: "#64748b", padding: "6px 14px", borderRadius: 7, fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
            >
              {wallet ? "Switch Wallet" : "Connect Wallet"}
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={labelStyle}>Network</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                <span style={{ fontSize: 13, color: "#22c55e", fontWeight: 500 }}>Sui Testnet</span>
              </div>
            </div>
            <span style={{ fontSize: 11, color: "#475569", background: "#080c14", border: "1px solid #1e2d45", borderRadius: 4, padding: "3px 8px" }}>Mainnet coming soon</span>
          </div>
        </div>

        {/* Default Policy */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9", marginBottom: 16, marginTop: 0 }}>Default Policy Settings</h3>
          <p style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>These values pre-fill the wizard when you deploy a new agent.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <div style={labelStyle}>Default Budget</div>
              <input
                type="number"
                value={defaults.budget}
                onChange={e => setDefaults(p => ({ ...p, budget: Number(e.target.value) }))}
                style={inputStyle}
              />
            </div>
            <div>
              <div style={labelStyle}>Default Token</div>
              <select
                value={defaults.token}
                onChange={e => setDefaults(p => ({ ...p, token: e.target.value }))}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="USDC">USDC</option>
                <option value="SUI">SUI</option>
                <option value="USDT">USDT</option>
              </select>
            </div>
            <div>
              <div style={labelStyle}>Default Risk Ceiling</div>
              <input
                type="number"
                value={defaults.riskCeiling}
                onChange={e => setDefaults(p => ({ ...p, riskCeiling: Number(e.target.value) }))}
                style={inputStyle}
                min={1} max={100}
              />
            </div>
            <div>
              <div style={labelStyle}>Default Expiry</div>
              <select
                value={defaults.expiry}
                onChange={e => setDefaults(p => ({ ...p, expiry: e.target.value }))}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="1">1 hour</option>
                <option value="6">6 hours</option>
                <option value="12">12 hours</option>
                <option value="24">24 hours</option>
                <option value="168">7 days</option>
                <option value="0">Never</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => { localStorage.setItem("arbitra_defaults", JSON.stringify(defaults)); setCopied("saved"); setTimeout(() => setCopied(null), 2000); }}
            style={{ marginTop: 16, background: "#2563eb", border: "none", color: "#fff", padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          >
            {copied === "saved" ? "✓ Saved" : "Save Defaults"}
          </button>
        </div>

        {/* Notifications */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9", marginBottom: 16, marginTop: 0 }}>Notifications</h3>
          <p style={{ fontSize: 12, color: "#475569", marginBottom: 16 }}>Coming soon — email and webhook alerts.</p>
          {[
            { key: "rejectedActions", label: "Rejected action alerts", desc: "Notify when an agent action is rejected" },
            { key: "budgetWarnings", label: "Budget warnings", desc: "Notify when budget reaches 80%" },
            { key: "agentExpiry", label: "Agent expiry reminders", desc: "Notify 1 hour before policy expires" },
          ].map(item => (
            <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div style={valueStyle}>{item.label}</div>
                <div style={{ fontSize: 11, color: "#475569" }}>{item.desc}</div>
              </div>
              <div
                onClick={() => setNotifications(p => ({ ...p, [item.key]: !p[item.key as keyof typeof p] }))}
                style={{ width: 44, height: 24, borderRadius: 12, background: notifications[item.key as keyof typeof notifications] ? "#2563eb" : "#1e2d45", cursor: "pointer", position: "relative" as const, transition: "background 0.2s" }}
              >
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute" as const, top: 3, left: notifications[item.key as keyof typeof notifications] ? 23 : 3, transition: "left 0.2s" }} />
              </div>
            </div>
          ))}
        </div>

        {/* API & SDK */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9", marginBottom: 16, marginTop: 0 }}>API & SDK</h3>
          {[
            { label: "API Endpoint", value: API_ENDPOINT, key: "api" },
            { label: "Package ID", value: PACKAGE_ID, key: "pkg" },
          ].map(item => (
            <div key={item.key} style={{ marginBottom: 16 }}>
              <div style={labelStyle}>{item.label}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: "#60a5fa", fontFamily: "monospace", background: "#080c14", border: "1px solid #1e2d45", borderRadius: 6, padding: "6px 10px", flex: 1, wordBreak: "break-all" as const }}>{item.value}</span>
                <button onClick={() => copy(item.value, item.key)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", flexShrink: 0 }}>
                  {copied === item.key ? <i className="ti ti-check" style={{ fontSize: 14, color: "#22c55e" }} /> : <i className="ti ti-copy" style={{ fontSize: 14 }} />}
                </button>
              </div>
            </div>
          ))}
          <a href="https://github.com/Kingnanaweb3/arbitra" target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#60a5fa", textDecoration: "none" }}>
            <i className="ti ti-brand-github" style={{ fontSize: 14 }} />
            View SDK on GitHub
          </a>
        </div>

        {/* Danger Zone */}
        <div style={{ ...sectionStyle, border: "1px solid #3f1a1a" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#ef4444", marginBottom: 8, marginTop: 0 }}>Danger Zone</h3>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={valueStyle}>Clear all agents</div>
              <div style={{ fontSize: 11, color: "#475569" }}>Remove {agentCount} agent{agentCount !== 1 ? "s" : ""} from local storage. On-chain policies remain.</div>
            </div>
            {showClearConfirm ? (
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => { clearAgents(); setAgentCount(0); setShowClearConfirm(false); }} style={{ background: "#ef4444", border: "none", color: "#fff", padding: "6px 14px", borderRadius: 7, fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Confirm</button>
                <button onClick={() => setShowClearConfirm(false)} style={{ background: "transparent", border: "1px solid #1e2d45", color: "#64748b", padding: "6px 14px", borderRadius: 7, fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
              </div>
            ) : (
              <button onClick={() => setShowClearConfirm(true)} style={{ background: "transparent", border: "1px solid #3f1a1a", color: "#ef4444", padding: "6px 14px", borderRadius: 7, fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Clear All</button>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
