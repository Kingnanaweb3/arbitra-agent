'use client';

import React from 'react';
import Image from 'next/image';
import { Box, ShieldCheck, Power } from 'lucide-react';
import NavBar from './NavBar';
import './landing.css';

export default function LandingPage() {
  return (
    <div style={{
      background: '#080c14',
      color: '#f1f5f9',
      fontFamily: "'DM Sans', sans-serif",
      minHeight: '100vh',
      overflowX: 'hidden',
    }}>
      <NavBar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .nav-link { color: #94a3b8; text-decoration: none; font-size: 15px; transition: color 0.2s; }
        .nav-link:hover { color: #f1f5f9; }
        .mobile-nav { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: block !important; }
        }
      `}</style>

      

      <section className="dot-grid hero-section" style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '200px 24px 280px',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(15,50,120,0.7) 0%, rgba(10,30,80,0.3) 40%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -28%)',
          width: '1050px', height: '1050px',
          borderRadius: '50%',
          border: '2px solid rgba(200,225,255,0.85)',
          boxShadow: '0 0 8px 2px rgba(147,197,253,0.9), 0 0 20px 4px rgba(147,197,253,0.4), inset 0 0 8px 2px rgba(147,197,253,0.3)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 45%)',
          maskImage: 'linear-gradient(to bottom, black 20%, transparent 45%)',
          pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -28%)',
          width: '820px', height: '820px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 40%, rgba(37,99,235,0.13) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}>
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 400,
            lineHeight: 1.08, marginBottom: '6px', color: '#f1f5f9',
            letterSpacing: '-0.01em',
          }}>AI Agents That</h1>
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 400,
            lineHeight: 1.08, marginBottom: '32px', color: '#5b8cff',
            letterSpacing: '-0.01em',
          }}>{"Can't Go Rogue."}</h1>
          <p style={{
            fontSize: '15px', color: '#94a3b8', lineHeight: 1.75,
            maxWidth: '540px', margin: '0 auto 44px',
          }}>
            Arbitra gives your AI agent real economic autonomy — with on-chain rules it cannot override, an audit trail it cannot erase, and a kill switch you always control.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/new-agent" style={{
              background: '#2563eb', color: '#fff',
              padding: '14px 28px', borderRadius: '10px',
              textDecoration: 'none', fontWeight: 600, fontSize: '13px',
              boxShadow: '0 0 32px rgba(37,99,235,0.45)',
            }}>Launch Workbench</a>
            <a href="#how-it-works" style={{
              color: '#5b8cff', padding: '14px 28px',
              textDecoration: 'none', fontWeight: 500, fontSize: '13px',
            }}>See How It Works</a>
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: '40px', left: '50%',
          transform: 'translateX(-50%)',
          width: '100%', maxWidth: '1100px',
          padding: '0 48px', zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }} className="feature-cards-abs">
          {[
            { icon: 'cube', title: 'Trustless by Design', body: "Policy rules live on Sui's VM — not in a database, not in an API. The agent physically cannot violate them." },
            { icon: 'shield', title: 'Always Auditable', body: 'Every action, every risk trigger, every pause — written on-chain permanently. Nothing hidden.' },
            { icon: 'power', title: 'You Stay in Control', body: 'One click revokes everything. No delays. No confirmations. Instant.' },
          ].map((card) => (
            <div key={card.title} style={{
              background: 'rgba(13,17,23,0.85)',
              border: '1px solid #1e2d45',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex', flexDirection: 'column', gap: '14px',
              backdropFilter: 'blur(8px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #1e3a6e, #1a2744)', borderRadius: '12px',
                  width: '48px', height: '48px', boxShadow: '0 2px 12px rgba(37,99,235,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {card.icon === 'cube' && <Box size={22} color='#93c5fd' strokeWidth={1.5} />}{card.icon === 'shield' && <ShieldCheck size={22} color='#93c5fd' strokeWidth={1.5} />}{card.icon === 'power' && <Power size={22} color='#93c5fd' strokeWidth={1.5} />}
                </div>
                <span style={{ fontWeight: 600, fontSize: '17px', color: '#f1f5f9' }}>{card.title}</span>
              </div>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.7 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </section>


      {/* PROBLEM SECTION */}
      <section style={{
        padding: '100px 48px',
        background: '#080c14',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          position: 'absolute', inset: 0, zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginBottom: '32px', padding: '6px 18px', borderRadius: '100px',
            border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)',
            fontSize: '12px', color: '#fca5a5', fontWeight: 600, letterSpacing: '0.1em',
          }}>
            <span>⚠</span> THE PROBLEM
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 400, lineHeight: 1.15, marginBottom: '64px', color: '#f1f5f9' }}>
            AI agents are making<br/>financial decisions <span style={{ color: '#5b8cff' }}>without guardrails.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'left' }} className='grid-3'>
            <div style={{ background: '#0d1117', border: '1px solid #1e2d45', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(239,68,68,0.15)', border: '1.5px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#ef4444', flexShrink: 0 }}>x</div>
                <span style={{ fontWeight: 600, fontSize: '16px', color: '#f1f5f9' }}>No budget enforcement</span>
              </div>
              <svg viewBox="0 0 320 180" style={{ width: '100%', borderRadius: '8px', background: '#060a10' }}>
                <text x="12" y="28" fill="#4b5563" fontSize="11">300</text>
                <text x="12" y="78" fill="#4b5563" fontSize="11">200</text>
                <text x="12" y="128" fill="#4b5563" fontSize="11">100</text>
                <text x="12" y="168" fill="#4b5563" fontSize="11">0</text>
                <line x1="35" y1="20" x2="35" y2="170" stroke="#1e2d45" strokeWidth="1"/>
                <line x1="35" y1="170" x2="310" y2="170" stroke="#1e2d45" strokeWidth="1"/>
                <line x1="35" y1="75" x2="310" y2="75" stroke="#ef4444" strokeWidth="1" strokeDasharray="5,4" opacity="0.6"/>
                <text x="40" y="70" fill="#ef4444" fontSize="10">Budget Limit</text>
                <polyline points="40,145 80,130 120,115 160,100 200,85 230,65 260,45 290,20" fill="none" stroke="#ef4444" strokeWidth="2"/>
                <circle cx="290" cy="20" r="5" fill="#ef4444"/>
              </svg>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>Agents can spend beyond limits, draining funds with no enforcement.</p>
            </div>
            <div style={{ background: '#0d1117', border: '1px solid #1e2d45', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(239,68,68,0.15)', border: '1.5px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#ef4444', flexShrink: 0 }}>x</div>
                <span style={{ fontWeight: 600, fontSize: '16px', color: '#f1f5f9' }}>No audit trail</span>
              </div>
              <div style={{ background: '#060a10', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { time: '[09:14:02]', action: 'Agent executed trade', red: false },
                  { time: '[09:16:45]', action: 'Agent executed trade', red: false },
                  { time: '[09:18:11]', action: 'Agent executed trade', red: false },
                  { time: '[--:--:--]', action: 'Unknown action', red: true },
                  { time: '[--:--:--]', action: 'Unknown action', red: true },
                  { time: '[--:--:--]', action: 'Unknown action', red: true },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', padding: '4px 0', borderBottom: '1px solid #1e2d45' }}>
                    <span style={{ color: row.red ? '#ef4444' : '#6b7280', fontFamily: 'monospace' }}>{row.time}</span>
                    <span style={{ color: row.red ? '#ef4444' : '#94a3b8' }}>{row.action}</span>
                    <span style={{ color: '#374151', fontSize: '14px' }}>?</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>No verifiable logs. No transparency. You cannot prove what happened or when.</p>
            </div>
            <div style={{ background: '#0d1117', border: '1px solid #1e2d45', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(239,68,68,0.15)', border: '1.5px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#ef4444', flexShrink: 0 }}>x</div>
                <span style={{ fontWeight: 600, fontSize: '16px', color: '#f1f5f9' }}>No kill switch</span>
              </div>
              <svg viewBox="0 0 320 180" style={{ width: '100%', borderRadius: '8px', background: '#060a10' }}>
                <circle cx="160" cy="90" r="70" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="6,5" opacity="0.3"/>
                <circle cx="160" cy="90" r="50" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="6,5" opacity="0.5"/>
                <circle cx="160" cy="90" r="30" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="6,5" opacity="0.7"/>
                <circle cx="160" cy="90" r="12" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1"/>
                <polygon points="160,76 168,96 152,96" fill="#ef4444" opacity="0.9"/>
                <rect x="158" y="84" width="4" height="6" fill="#060a10"/>
                <rect x="158" y="92" width="4" height="3" fill="#060a10"/>
              </svg>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>No way to stop a rogue agent. Once it is running, you have lost control.</p>
            </div>
          </div>
        </div>
      </section>


      {/* SOLUTION SECTION */}
      <section style={{
        padding: '100px 48px',
        background: '#060a10',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          position: 'absolute', inset: 0, zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginBottom: '32px', padding: '6px 18px', borderRadius: '100px',
            border: '1px solid rgba(37,99,235,0.4)', background: 'rgba(37,99,235,0.08)',
            fontSize: '12px', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.1em',
          }}>
            ✦ THE SOLUTION
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 500, lineHeight: 1.15, marginBottom: '24px', color: '#f1f5f9' }}>
            Arbitra is the <span style={{ color: '#5b8cff' }}>policy</span><br/>
            <span style={{ color: '#5b8cff' }}>enforcement layer</span> for AI agents.
          </h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 64px' }}>
            Every action your agent wants to take goes through Arbitra first.<br/>
            If it violates the policy — it is blocked. On-chain. Automatically.<br/>
            No human required.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', textAlign: 'left' }} className='grid-4'>
            {[
              {
                num: 1,
                title: 'On-chain Rules',
                body: "Your agent's rules live as a Move object on Sui. Not in a database. Not in a config file. On-chain. The agent cannot override them — ever.",
                icon: (<svg viewBox="0 0 48 48" fill="none" width="32" height="32"><rect x="14" y="22" width="20" height="16" rx="3" stroke="#60a5fa" strokeWidth="2"/><path d="M17 22v-5a7 7 0 0114 0v5" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/><circle cx="24" cy="30" r="2" fill="#60a5fa"/></svg>)
              },
              {
                num: 2,
                title: 'Tamper-proof Audit Trail',
                body: 'Every approved and rejected action is logged as a real Sui transaction. Immutable. Append-only. Verifiable by anyone.',
                icon: (<svg viewBox="0 0 48 48" fill="none" width="32" height="32"><rect x="12" y="8" width="20" height="26" rx="3" stroke="#60a5fa" strokeWidth="2"/><path d="M16 16h12M16 21h8" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/><circle cx="32" cy="34" r="8" fill="#060a10" stroke="#60a5fa" strokeWidth="2"/><path d="M28.5 34l2 2 4-4" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>)
              },
              {
                num: 3,
                title: 'Instant Revocation',
                body: 'One transaction to pause or revoke any agent. Budget frozen. Actions blocked. No waiting. No intermediary.',
                icon: (<svg viewBox="0 0 48 48" fill="none" width="32" height="32"><path d="M24 10l8 5v8c0 6-8 12-8 12S16 29 16 23v-8l8-5z" stroke="#60a5fa" strokeWidth="2" strokeLinejoin="round"/><path d="M18 18l12 12M30 18L18 30" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/></svg>)
              },
              {
                num: 4,
                title: 'Wallet Balance Guard',
                body: "Arbitra checks your agent's actual wallet balance before approving any transfer. Policy budget and wallet balance — both enforced.",
                icon: (<svg viewBox="0 0 48 48" fill="none" width="32" height="32"><rect x="8" y="16" width="32" height="22" rx="3" stroke="#60a5fa" strokeWidth="2"/><path d="M8 22h32" stroke="#60a5fa" strokeWidth="2"/><path d="M6 16l4-8h28l4 8" stroke="#60a5fa" strokeWidth="2" strokeLinejoin="round"/><rect x="30" y="26" width="8" height="6" rx="2" fill="rgba(96,165,250,0.2)" stroke="#60a5fa" strokeWidth="1.5"/></svg>)
              },
            ].map((card) => (
              <div key={card.num} style={{
                background: '#0d1117',
                border: '1px solid #1e2d45',
                borderRadius: '16px',
                padding: '28px 24px',
                display: 'flex', flexDirection: 'column', gap: '20px',
              }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(37,99,235,0.05) 70%)',
                  border: '1px solid rgba(96,165,250,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(37,99,235,0.2)',
                }}>
                  {card.icon}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '6px',
                    background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontWeight: 700, color: '#60a5fa', flexShrink: 0,
                  }}>{card.num}</div>
                  <span style={{ fontWeight: 600, fontSize: '16px', color: '#f1f5f9' }}>{card.title}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.7 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* PROCESS SECTION */}
      <section id='process' className='section-pad' style={{
        padding: '100px 48px',
        background: '#080c14',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          position: 'absolute', inset: 0, zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginBottom: '32px', padding: '6px 18px', borderRadius: '100px',
            border: '1px solid rgba(37,99,235,0.4)', background: 'rgba(37,99,235,0.08)',
            fontSize: '12px', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.1em',
          }}>
            ✦ THE PROCESS
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 500, lineHeight: 1.15, marginBottom: '16px', color: '#f1f5f9' }}>
            Three steps to a <span style={{ color: '#5b8cff' }}>compliant AI agent.</span>
          </h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '64px' }}>
            From zero to on-chain policy enforcement in under 3 minutes.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: '0', alignItems: 'start' }} className="process-grid">

            {/* Card 1 */}
            <div style={{ background: '#0d1117', border: '1px solid #1e2d45', borderRadius: '16px', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, rgba(37,99,235,0.05) 70%)',
                border: '1px solid rgba(96,165,250,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 24px rgba(37,99,235,0.25)',
              }}>
                <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
                  <rect x="12" y="8" width="22" height="28" rx="3" stroke="#60a5fa" strokeWidth="2"/>
                  <path d="M16 16h14M16 21h10" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="32" cy="34" r="8" fill="#0d1117" stroke="#60a5fa" strokeWidth="2"/>
                  <path d="M32 30v4h4" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M29 34h6M32 31v6" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '6px',
                  background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700, color: '#60a5fa',
                }}>1</div>
                <span style={{ fontWeight: 700, fontSize: '17px', color: '#f1f5f9' }}>Deploy a Policy</span>
              </div>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8 }}>
                Set your agent's rules through the Arbitra Workbench or SDK. Budget ceiling, risk threshold, <strong style={{ color: '#f1f5f9' }}>approved scope, expiry.</strong> One transaction writes it permanently to Sui as a <span style={{ color: '#60a5fa' }}>PolicyObject</span>.
              </p>
            </div>

            {/* Arrow */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px', marginTop: '80px' }}>
              <span style={{ color: '#4b5563', fontSize: '24px' }} className='process-arrow'>→</span>
            </div>

            {/* Card 2 */}
            <div style={{ background: '#0d1117', border: '1px solid #1e2d45', borderRadius: '16px', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.05) 70%)',
                border: '1px solid rgba(167,139,250,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 24px rgba(139,92,246,0.25)',
              }}>
                <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
                  <path d="M20 10h8v12l-4 4-4-4V10z" stroke="#a78bfa" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M16 22h16" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M18 26v6a6 6 0 0012 0v-6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M24 32v6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '6px',
                  background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700, color: '#a78bfa',
                }}>2</div>
                <span style={{ fontWeight: 700, fontSize: '17px', color: '#f1f5f9' }}>Connect Your Agent</span>
              </div>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8 }}>
                Point your AI agent at the Arbitra enforcement endpoint. Any agent — GPT-4, Claude, custom model. <strong style={{ color: '#f1f5f9' }}>One API call</strong> before every action. No SDK required for basic integration.
              </p>
            </div>

            {/* Arrow */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px', marginTop: '80px' }}>
              <span style={{ color: '#4b5563', fontSize: '24px' }} className='process-arrow'>→</span>
            </div>

            {/* Card 3 */}
            <div style={{ background: '#0d1117', border: '1px solid #1e2d45', borderRadius: '16px', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(34,197,94,0.25) 0%, rgba(34,197,94,0.05) 70%)',
                border: '1px solid rgba(74,222,128,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 24px rgba(34,197,94,0.25)',
              }}>
                <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
                  <path d="M24 10l10 5v10c0 7-10 14-10 14S14 32 14 25V15l10-5z" stroke="#4ade80" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M19 24l3 3 7-7" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '6px',
                  background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700, color: '#4ade80',
                }}>3</div>
                <span style={{ fontWeight: 700, fontSize: '17px', color: '#f1f5f9' }}>Every Action Enforced</span>
              </div>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8 }}>
                Your agent sends an action request. Arbitra reads the policy from Sui, checks wallet balance, evaluates risk. Approved actions fire a real on-chain transaction. Rejected actions are blocked and logged.
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            marginTop: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0',
            background: 'rgba(255,255,255,0.03)', border: '1px solid #1e2d45',
            borderRadius: '100px', padding: '14px 32px',
          }} className="bottom-bar">
            {[
              { icon: '🛡', text: 'No code changes to your agent.' },
              { text: 'No trust assumptions.' },
              { text: 'No intermediaries.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                {i > 0 && <span style={{ color: '#1e2d45', fontSize: '20px', margin: '0 16px' }}>|</span>}
                <span style={{ fontSize: '13px', color: '#60a5fa', fontWeight: 500 }}>
                  {item.icon && <span style={{ marginRight: '8px' }}>{item.icon}</span>}
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* AGENT TYPES SECTION */}
      <section id='agents' className='section-pad' style={{
        padding: '100px 48px',
        background: '#060a10',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          position: 'absolute', inset: 0, zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginBottom: '32px', padding: '6px 18px', borderRadius: '100px',
            border: '1px solid rgba(37,99,235,0.4)', background: 'rgba(37,99,235,0.08)',
            fontSize: '12px', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.1em',
          }}>
            ✦ AGENT TYPES
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 500, lineHeight: 1.15, marginBottom: '16px', color: '#f1f5f9' }}>
            Built for every kind of <span style={{ color: '#5b8cff' }}>AI agent.</span>
          </h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '64px' }}>
            One protocol. Any agent. Any use case.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'left' }} className='grid-3'>
            {[
              {
                icon: (<svg viewBox="0 0 48 48" fill="none" width="28" height="28"><path d="M8 34l10-12 8 6 8-14 6 8" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 38h32" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/></svg>),
                color: '#60a5fa', bg: 'rgba(37,99,235,0.1)', border: 'rgba(37,99,235,0.25)',
                title: 'Trading',
                desc: 'Automated token swaps and DeFi strategies with hard budget ceilings and risk thresholds.',
              },
              {
                icon: (<svg viewBox="0 0 48 48" fill="none" width="28" height="28"><path d="M10 14h28l-3 16H13L10 14z" stroke="#a78bfa" strokeWidth="2" strokeLinejoin="round"/><path d="M10 14l-2-6H4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/><circle cx="18" cy="36" r="2" fill="#a78bfa"/><circle cx="32" cy="36" r="2" fill="#a78bfa"/></svg>),
                color: '#a78bfa', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)',
                title: 'E-Commerce',
                desc: 'Automated purchases and inventory payments scoped to approved vendors and spend limits.',
              },
              {
                icon: (<svg viewBox="0 0 48 48" fill="none" width="28" height="28"><rect x="10" y="18" width="28" height="20" rx="3" stroke="#4ade80" strokeWidth="2"/><path d="M10 24h28" stroke="#4ade80" strokeWidth="2"/><path d="M8 18l4-8h24l4 8" stroke="#4ade80" strokeWidth="2" strokeLinejoin="round"/><path d="M24 28v6" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/></svg>),
                color: '#4ade80', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)',
                title: 'DAO Treasury',
                desc: 'Governed fund allocation and proposal execution with multi-sig policy enforcement.',
              },
              {
                icon: (<svg viewBox="0 0 48 48" fill="none" width="28" height="28"><rect x="8" y="14" width="32" height="20" rx="4" stroke="#f59e0b" strokeWidth="2"/><path d="M8 22h32" stroke="#f59e0b" strokeWidth="2"/><rect x="28" y="26" width="8" height="4" rx="1" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth="1.5"/></svg>),
                color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)',
                title: 'Payments',
                desc: 'Recurring transfers and payroll automation with per-transaction and daily spend caps.',
              },
              {
                icon: (<svg viewBox="0 0 48 48" fill="none" width="28" height="28"><rect x="8" y="10" width="32" height="28" rx="4" stroke="#f472b6" strokeWidth="2"/><path d="M20 22l4-4 4 4-4 8-4-8z" stroke="#f472b6" strokeWidth="1.5" strokeLinejoin="round"/><path d="M16 34h16" stroke="#f472b6" strokeWidth="2" strokeLinecap="round"/></svg>),
                color: '#f472b6', bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.25)',
                title: 'Gaming',
                desc: 'In-game asset purchases and reward distribution with scoped wallet access per session.',
              },
              {
                icon: (<svg viewBox="0 0 48 48" fill="none" width="28" height="28"><path d="M16 12h16v8l4 4-4 4v8H16v-8l-4-4 4-4V12z" stroke="#67e8f9" strokeWidth="2" strokeLinejoin="round"/><path d="M20 24h8M24 20v8" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round"/></svg>),
                color: '#67e8f9', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.25)',
                title: 'Custom',
                desc: 'Define your own scope, token whitelist, action types, and risk rules for any use case.',
              },
            ].map((agent) => (
              <div key={agent.title} style={{
                background: '#0d1117',
                border: '1px solid #1e2d45',
                borderRadius: '16px',
                padding: '28px 24px',
                display: 'flex', flexDirection: 'column', gap: '16px',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = agent.border; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#1e2d45'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '12px',
                  background: agent.bg, border: `1px solid ${agent.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {agent.icon}
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: '17px', color: '#f1f5f9', marginBottom: '8px' }}>{agent.title}</h3>
                  <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.7 }}>{agent.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SDK SECTION */}
      <section id='sdk' className='section-pad' style={{
        padding: '100px 48px',
        background: '#080c14',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          position: 'absolute', inset: 0, zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginBottom: '32px', padding: '6px 18px', borderRadius: '100px',
            border: '1px solid rgba(37,99,235,0.4)', background: 'rgba(37,99,235,0.08)',
            fontSize: '12px', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.1em',
          }}>
            ✦ THE SDK
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 500, lineHeight: 1.15, marginBottom: '16px', color: '#f1f5f9' }}>
            Integrate in <span style={{ color: '#5b8cff' }}>minutes.</span>
          </h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '48px' }}>
            One function call gates every economic action your agent takes.
          </p>

          {/* Code block */}
          <div style={{
            background: '#060a10',
            border: '1px solid #1e2d45',
            borderRadius: '16px',
            overflow: 'hidden',
            textAlign: 'left',
          }}>
            {/* Terminal bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 20px',
              borderBottom: '1px solid #1e2d45',
              background: '#0a0f1a',
            }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', opacity: 0.7 }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b', opacity: 0.7 }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e', opacity: 0.7 }} />
              <span style={{ marginLeft: '12px', fontSize: '12px', color: '#4b5563', fontFamily: 'monospace' }}>arbitra-integration.ts</span>
            </div>

            {/* Code */}
            <div style={{ padding: '28px 32px', fontFamily: 'monospace', fontSize: '14px', lineHeight: 2, overflowX: 'auto' }}>
              <div><span style={{ color: '#6b7280' }}>// 1. Import the SDK</span></div>
              <div>
                <span style={{ color: '#60a5fa' }}>import</span>
                <span style={{ color: '#f1f5f9' }}> {'{ Arbitra }'} </span>
                <span style={{ color: '#60a5fa' }}>from</span>
                <span style={{ color: '#4ade80' }}> '@arbitra/sdk'</span>
                <span style={{ color: '#f1f5f9' }}>;</span>
              </div>
              <br/>
              <div><span style={{ color: '#6b7280' }}>// 2. Deploy a policy on Sui</span></div>
              <div>
                <span style={{ color: '#60a5fa' }}>const</span>
                <span style={{ color: '#f1f5f9' }}> policy </span>
                <span style={{ color: '#60a5fa' }}>=</span>
                <span style={{ color: '#60a5fa' }}> await </span>
                <span style={{ color: '#f1f5f9' }}>Arbitra.</span>
                <span style={{ color: '#fbbf24' }}>createPolicy</span>
                <span style={{ color: '#f1f5f9' }}>({"{"}</span>
              </div>
              <div style={{ paddingLeft: '24px' }}>
                <span style={{ color: '#f472b6' }}>token</span>
                <span style={{ color: '#f1f5f9' }}>: </span>
                <span style={{ color: '#4ade80' }}>'USDC'</span>
                <span style={{ color: '#f1f5f9' }}>,</span>
              </div>
              <div style={{ paddingLeft: '24px' }}>
                <span style={{ color: '#f472b6' }}>budget</span>
                <span style={{ color: '#f1f5f9' }}>: </span>
                <span style={{ color: '#fb923c' }}>200</span>
                <span style={{ color: '#f1f5f9' }}>,</span>
              </div>
              <div style={{ paddingLeft: '24px' }}>
                <span style={{ color: '#f472b6' }}>maxPerTx</span>
                <span style={{ color: '#f1f5f9' }}>: </span>
                <span style={{ color: '#fb923c' }}>50</span>
                <span style={{ color: '#f1f5f9' }}>,</span>
              </div>
              <div style={{ paddingLeft: '24px' }}>
                <span style={{ color: '#f472b6' }}>allowedActions</span>
                <span style={{ color: '#f1f5f9' }}>: [</span>
                <span style={{ color: '#4ade80' }}>'swap'</span>
                <span style={{ color: '#f1f5f9' }}>, </span>
                <span style={{ color: '#4ade80' }}>'transfer'</span>
                <span style={{ color: '#f1f5f9' }}>],</span>
              </div>
              <div><span style={{ color: '#f1f5f9' }}>{"})"}</span><span style={{ color: '#f1f5f9' }}>;</span></div>
              <br/>
              <div><span style={{ color: '#6b7280' }}>// 3. Gate every agent action</span></div>
              <div>
                <span style={{ color: '#60a5fa' }}>const</span>
                <span style={{ color: '#f1f5f9' }}> result </span>
                <span style={{ color: '#60a5fa' }}>=</span>
                <span style={{ color: '#60a5fa' }}> await </span>
                <span style={{ color: '#f1f5f9' }}>agent.</span>
                <span style={{ color: '#fbbf24' }}>checkAction</span>
                <span style={{ color: '#f1f5f9' }}>({"{"}</span>
              </div>
              <div style={{ paddingLeft: '24px' }}>
                <span style={{ color: '#f472b6' }}>type</span>
                <span style={{ color: '#f1f5f9' }}>: </span>
                <span style={{ color: '#4ade80' }}>'swap'</span>
                <span style={{ color: '#f1f5f9' }}>,</span>
              </div>
              <div style={{ paddingLeft: '24px' }}>
                <span style={{ color: '#f472b6' }}>amount</span>
                <span style={{ color: '#f1f5f9' }}>: </span>
                <span style={{ color: '#fb923c' }}>45</span>
                <span style={{ color: '#f1f5f9' }}>,</span>
              </div>
              <div style={{ paddingLeft: '24px' }}>
                <span style={{ color: '#f472b6' }}>policyId</span>
                <span style={{ color: '#f1f5f9' }}>: policy.id,</span>
              </div>
              <div><span style={{ color: '#f1f5f9' }}>{"})"}</span><span style={{ color: '#f1f5f9' }}>;</span></div>
              <br/>
              <div>
                <span style={{ color: '#6b7280' }}>// result.approved === true  → execute on-chain</span>
              </div>
              <div>
                <span style={{ color: '#6b7280' }}>// result.approved === false → blocked + logged on Sui</span>
              </div>
            </div>
          </div>

          {/* Pills */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '28px', flexWrap: 'wrap' }}>
            {[
              { label: 'TypeScript', color: '#60a5fa', bg: 'rgba(37,99,235,0.1)', border: 'rgba(37,99,235,0.3)' },
              { label: 'Python — coming soon', color: '#94a3b8', bg: 'rgba(255,255,255,0.03)', border: '#1e2d45' },
              { label: 'REST API', color: '#4ade80', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)' },
            ].map(pill => (
              <div key={pill.label} style={{
                padding: '6px 16px', borderRadius: '100px',
                background: pill.bg, border: `1px solid ${pill.border}`,
                fontSize: '12px', color: pill.color, fontWeight: 500,
              }}>{pill.label}</div>
            ))}
          </div>
        </div>
      </section>


      {/* ARCHITECTURE SECTION */}
      <section style={{
        padding: '100px 48px',
        background: '#060a10',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          position: 'absolute', inset: 0, zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginBottom: '32px', padding: '6px 18px', borderRadius: '100px',
            border: '1px solid rgba(37,99,235,0.4)', background: 'rgba(37,99,235,0.08)',
            fontSize: '12px', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.1em',
          }}>
            ✦ ARCHITECTURE
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 500, lineHeight: 1.15, marginBottom: '16px', color: '#f1f5f9' }}>
            Arbitra sits between your <span style={{ color: '#5b8cff' }}>agent and Sui.</span>
          </h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '72px' }}>
            Every action passes through the policy layer before touching the chain.
          </p>

          {/* Flow diagram */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', flexWrap: 'nowrap' }} className='arch-flow'>

            {/* Node 1 - AI Agent */}
            <div style={{
              background: '#0d1117', border: '1px solid #1e2d45',
              borderRadius: '16px', padding: '28px 24px', minWidth: '180px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)', border: '1px solid #1e2d45',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg viewBox="0 0 48 48" fill="none" width="28" height="28">
                  <rect x="10" y="12" width="28" height="24" rx="4" stroke="#94a3b8" strokeWidth="2"/>
                  <path d="M18 20h12M18 26h8" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 36l-4 4M32 36l4 4" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: '15px', color: '#f1f5f9', marginBottom: '4px' }}>AI Agent</div>
                <div style={{ fontSize: '12px', color: '#4b5563' }}>Your logic</div>
              </div>
            </div>

            {/* Arrow 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 8px', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: '#4b5563', fontFamily: 'monospace' }}>action request</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, #1e2d45, #2563eb)' }} />
                <span style={{ color: '#2563eb', fontSize: '16px' }}>›</span>
              </div>
            </div>

            {/* Node 2 - Arbitra (highlighted) */}
            <div style={{
              background: 'rgba(37,99,235,0.1)',
              border: '1.5px solid #2563eb',
              borderRadius: '16px', padding: '28px 24px', minWidth: '200px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
              boxShadow: '0 0 40px rgba(37,99,235,0.2)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                background: '#2563eb', borderRadius: '100px', padding: '3px 12px',
                fontSize: '10px', fontWeight: 700, color: '#fff', letterSpacing: '0.08em',
              }}>POLICY LAYER</div>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(96,165,250,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(37,99,235,0.3)',
              }}>
                <svg viewBox="0 0 48 48" fill="none" width="28" height="28">
                  <path d="M24 8l12 6v12c0 8-12 16-12 16S12 34 12 26V14l12-6z" stroke="#60a5fa" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M19 24l3 3 7-7" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '15px', color: '#60a5fa', marginBottom: '4px' }}>Arbitra</div>
                <div style={{ fontSize: '12px', color: '#4b5563' }}>Enforce policy</div>
              </div>
            </div>

            {/* Arrow 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 8px', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: '#4b5563', fontFamily: 'monospace' }}>if approved</span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, #2563eb, #22c55e)' }} />
                <span style={{ color: '#22c55e', fontSize: '16px' }}>›</span>
              </div>
            </div>

            {/* Node 3 - Sui VM */}
            <div style={{
              background: '#0d1117', border: '1px solid #1e2d45',
              borderRadius: '16px', padding: '28px 24px', minWidth: '180px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)', border: '1px solid #1e2d45',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg viewBox="0 0 48 48" fill="none" width="28" height="28">
                  <circle cx="24" cy="24" r="14" stroke="#94a3b8" strokeWidth="2"/>
                  <path d="M24 10v4M24 34v4M10 24h4M34 24h4" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="4" fill="#94a3b8" opacity="0.4"/>
                </svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: '15px', color: '#f1f5f9', marginBottom: '4px' }}>Sui VM</div>
                <div style={{ fontSize: '12px', color: '#4b5563' }}>Execution layer</div>
              </div>
            </div>

            {/* Arrow 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 8px', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: '#4b5563', fontFamily: 'monospace' }}>routes to</span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, #1e2d45, #1e2d45)' }} />
                <span style={{ color: '#4b5563', fontSize: '16px' }}>›</span>
              </div>
            </div>

            {/* Node 4 - Deepbook */}
            <div style={{
              background: '#0d1117', border: '1px solid #1e2d45',
              borderRadius: '16px', padding: '28px 24px', minWidth: '180px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)', border: '1px solid #1e2d45',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg viewBox="0 0 48 48" fill="none" width="28" height="28">
                  <path d="M8 34l10-12 8 6 8-14 6 8" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 38h32" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="38" cy="14" r="4" stroke="#94a3b8" strokeWidth="2"/>
                </svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: '15px', color: '#f1f5f9', marginBottom: '4px' }}>Deepbook / Custom</div>
                <div style={{ fontSize: '12px', color: '#4b5563' }}>Protocols</div>
              </div>
            </div>

          </div>

          {/* Rejected path note */}
          <div style={{
            marginTop: '40px',
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: '100px', padding: '10px 24px',
            fontSize: '13px', color: '#fca5a5',
          }}>
            <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
              <circle cx="10" cy="10" r="8" stroke="#ef4444" strokeWidth="1.5"/>
              <path d="M7 7l6 6M13 7l-6 6" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            If rejected — action is blocked and logged as a Sui transaction. No execution. No funds moved.
          </div>
        </div>
      </section>


      {/* SUI INTEGRATION SECTION */}
      <section style={{
        padding: '100px 48px',
        background: '#080c14',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          position: 'absolute', inset: 0, zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginBottom: '32px', padding: '6px 18px', borderRadius: '100px',
            border: '1px solid rgba(37,99,235,0.4)', background: 'rgba(37,99,235,0.08)',
            fontSize: '12px', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.1em',
          }}>
            ✦ BUILT ON SUI
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 500, lineHeight: 1.15, marginBottom: '16px', color: '#f1f5f9' }}>
            Native to Sui. <span style={{ color: '#5b8cff' }}>Powered by its ecosystem.</span>
          </h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '64px' }}>
            Arbitra leverages the best of Sui's infrastructure stack.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'left' }} className='grid-3'>

            {/* Deepbook */}
            <div style={{
              background: '#0d1117', border: '1px solid #1e2d45',
              borderRadius: '16px', padding: '32px 28px',
              display: 'flex', flexDirection: 'column', gap: '20px',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor='rgba(37,99,235,0.4)'; (e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor='#1e2d45'; (e.currentTarget as HTMLDivElement).style.transform='translateY(0)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg viewBox="0 0 48 48" fill="none" width="26" height="26">
                    <path d="M8 34l10-12 8 6 8-14 6 8" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 38h32" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="18" cy="22" r="3" fill="rgba(96,165,250,0.2)" stroke="#60a5fa" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '2px' }}>DEEPBOOK</div>
                  <div style={{ fontSize: '17px', fontWeight: 600, color: '#f1f5f9' }}>Native DEX Trading</div>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.75 }}>
                Arbitra enforces trading policies directly against Deepbook order execution. Budget ceilings, token whitelists, and slippage limits — all checked before any swap fires.
              </p>
              <a href="https://deepbook.tech" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: '#60a5fa', textDecoration: 'none', fontWeight: 500 }}>
                Learn more →
              </a>
            </div>

            {/* Walrus */}
            <div style={{
              background: '#0d1117', border: '1px solid #1e2d45',
              borderRadius: '16px', padding: '32px 28px',
              display: 'flex', flexDirection: 'column', gap: '20px',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor='rgba(139,92,246,0.4)'; (e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor='#1e2d45'; (e.currentTarget as HTMLDivElement).style.transform='translateY(0)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg viewBox="0 0 48 48" fill="none" width="26" height="26">
                    <ellipse cx="24" cy="20" rx="14" ry="10" stroke="#a78bfa" strokeWidth="2"/>
                    <path d="M10 20v8c0 5.5 6.3 10 14 10s14-4.5 14-10v-8" stroke="#a78bfa" strokeWidth="2"/>
                    <path d="M10 24c0 5.5 6.3 10 14 10s14-4.5 14-10" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="3,3"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#a78bfa', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '2px' }}>WALRUS</div>
                  <div style={{ fontSize: '17px', fontWeight: 600, color: '#f1f5f9' }}>Decentralized Memory</div>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.75 }}>
                Every agent decision context is stored on Walrus — Sui's decentralized storage layer. Immutable. Retrievable. Your agent's full history, always verifiable.
              </p>
              <a href="https://walrus.xyz" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: '#a78bfa', textDecoration: 'none', fontWeight: 500 }}>
                Learn more →
              </a>
            </div>

            {/* zkLogin */}
            <div style={{
              background: '#0d1117', border: '1px solid #1e2d45',
              borderRadius: '16px', padding: '32px 28px',
              display: 'flex', flexDirection: 'column', gap: '20px',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor='rgba(34,197,94,0.4)'; (e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor='#1e2d45'; (e.currentTarget as HTMLDivElement).style.transform='translateY(0)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg viewBox="0 0 48 48" fill="none" width="26" height="26">
                    <circle cx="24" cy="18" r="8" stroke="#4ade80" strokeWidth="2"/>
                    <path d="M10 40c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M30 28l2 2 6-6" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#4ade80', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '2px' }}>ZKLOGIN</div>
                  <div style={{ fontSize: '17px', fontWeight: 600, color: '#f1f5f9' }}>Wallet-free Onboarding</div>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.75 }}>
                Onboard via Google or email — no seed phrase, no wallet setup. zkLogin generates a Sui wallet silently. Your users never touch crypto, but the agent is fully on-chain.
              </p>
              <a href="https://docs.sui.io/concepts/cryptography/zklogin" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: '#4ade80', textDecoration: 'none', fontWeight: 500 }}>
                Learn more →
              </a>
            </div>

          </div>
        </div>
      </section>


      {/* FINAL CTA */}
      <section style={{
        padding: '120px 48px',
        background: '#060a10',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          position: 'absolute', inset: 0, zIndex: 0,
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 500, lineHeight: 1.15, marginBottom: '20px', color: '#f1f5f9' }}>
            Deploy your first agent<br />in <span style={{ color: '#5b8cff' }}>3 minutes.</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '48px' }}>
            Give your agent a mandate. Not a leash.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/new-agent" style={{
              background: '#2563eb', color: '#fff',
              padding: '16px 40px', borderRadius: '12px',
              textDecoration: 'none', fontWeight: 600, fontSize: '16px',
              boxShadow: '0 0 40px rgba(37,99,235,0.4)',
            }}>Get Started</a>
            <a href="https://github.com/Kingnanaweb3/arbitra" target="_blank" rel="noopener noreferrer" style={{
              background: 'transparent', color: '#94a3b8',
              padding: '16px 40px', borderRadius: '12px',
              textDecoration: 'none', fontWeight: 500, fontSize: '16px',
              border: '1px solid #1e2d45',
            }}>View on GitHub</a>
          </div>
          <p style={{ marginTop: '40px', fontSize: '13px', color: '#4b5563' }}>
            No wallet required to start · Built on Sui · Open source
          </p>
        </div>
      </section>


      {/* FOOTER */}
      <footer style={{
        background: '#040810',
        borderTop: '1px solid #1e2d45',
        padding: '60px 48px 32px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px', flexWrap: 'wrap', gap: '32px' }} className="footer-top">
            
            {/* Logo + tagline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/arbitra-logo.png" alt="Arbitra" style={{ width: '32px', height: '32px', borderRadius: '6px' }} />
                <span style={{ fontWeight: 700, fontSize: '17px', letterSpacing: '0.08em', color: '#f1f5f9' }}>ARBITRA</span>
              </div>
              <p style={{ fontSize: '13px', color: '#4b5563', maxWidth: '240px', lineHeight: 1.6 }}>
                The policy enforcement layer for AI agents on Sui.
              </p>
            </div>

            {/* Nav links */}
            <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }} className="footer-links">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Product</span>
                <a href="/new-agent" style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>Deploy Agent</a>
                <a href="/dashboard/0xf546ab89f2764229ac9049d7afdbaa7542ff4ea20651eb0119546f9a4bacc307" style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>Workbench</a>
                <a href="/policy-library" style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>Policy Library</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Developers</span>
                <a href="/docs" style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>Docs</a>
                <a href="https://github.com/Kingnanaweb3/arbitra" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>GitHub</a>
                <a href="/docs" style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>SDK Reference</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Community</span>
                <a href="https://x.com/almond_env" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>X / Twitter</a>
                <a href="https://github.com/Kingnanaweb3/arbitra" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}>GitHub</a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid #1e2d45',
            paddingTop: '24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '12px',
          }}>
            <span style={{ fontSize: '13px', color: '#4b5563' }}>© 2026 Arbitra. Built on Sui. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="https://x.com/almond_env" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: '#4b5563', textDecoration: 'none' }}>@almond_env</a>
              <a href="https://github.com/Kingnanaweb3/arbitra" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: '#4b5563', textDecoration: 'none' }}>GitHub</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
