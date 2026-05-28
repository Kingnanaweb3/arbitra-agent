'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'How It Works', href: '#process' },
    { label: 'Agent Types', href: '#agents' },
    { label: 'SDK', href: '#sdk' },
    { label: 'Workbench', href: '/dashboard/0xf546ab89f2764229ac9049d7afdbaa7542ff4ea20651eb0119546f9a4bacc307' },
    { label: 'Docs', href: '/docs' },
    { label: 'GitHub', href: 'https://github.com/Kingnanaweb3/arbitra', external: true },
  ];

  const handleClick = (href: string) => {
    setOpen(false);
    if (href.startsWith('#')) {
      setTimeout(() => {
        const el = document.getElementById(href.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px', height: '64px',
        background: scrolled ? 'rgba(8,12,20,0.98)' : 'rgba(8,12,20,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        transition: 'background 0.3s',
      }}>
        <a href="/landing" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <Image src="/arbitra-logo.png" alt="Arbitra" width={32} height={32} style={{ borderRadius: '6px' }} />
          <span style={{ fontWeight: 700, fontSize: '17px', letterSpacing: '0.08em', color: '#f1f5f9' }}>ARBITRA</span>
        </a>

        {/* Desktop */}
        <div style={{ display: 'flex', gap: '32px' }} id="desktop-nav">
          {links.map(link => (
            <a
              key={link.label}
              href={link.external ? link.href : undefined}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={() => !link.external && handleClick(link.href)}
              style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f1f5f9')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
            >{link.label}</a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/new-agent" style={{
            border: '1px solid rgba(255,255,255,0.3)', color: '#f1f5f9',
            padding: '8px 20px', borderRadius: '8px', fontSize: '14px',
            textDecoration: 'none', fontWeight: 500,
          }} id="desktop-cta">Launch App</a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            id="hamburger-btn"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#f1f5f9', padding: '4px' }}
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 99,
          background: 'rgba(8,12,20,0.98)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #1e2d45',
          padding: '24px 32px',
          display: 'flex', flexDirection: 'column', gap: '20px',
        }}>
          {links.map(link => (
            <a
              key={link.label}
              href={link.external ? link.href : '#'}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={() => !link.external && handleClick(link.href)}
              style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '16px', fontWeight: 500, cursor: 'pointer' }}
            >{link.label}</a>
          ))}
          <a href="/new-agent" style={{
            background: '#2563eb', color: '#fff',
            padding: '12px 24px', borderRadius: '8px', fontSize: '15px',
            textDecoration: 'none', fontWeight: 600, textAlign: 'center',
          }}>Launch App</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          #desktop-nav { display: none !important; }
          #desktop-cta { display: none !important; }
          #hamburger-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
