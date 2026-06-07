# Introduction

## What is Arbitra?

Arbitra is the policy enforcement layer for AI agents on Sui blockchain. It sits between any AI agent and the economic actions it wants to take and enforces rules the agent cannot override.

**Tagline:** Give your agent a mandate. Not a leash.

## The Problem

AI agents are increasingly making financial decisions autonomously. But there is no guardrail layer:

- No budget enforcement — an agent can drain your entire wallet
- No audit trail — no way to know what the agent did and why
- No kill switch — stopping a rogue agent requires manual intervention

## The Solution

**1. On-chain Rules** — Your agent's policy lives as a PolicyObject on Sui. The agent cannot override these rules. Ever.

**2. Tamper-proof Audit Trail** — Every approved and rejected action is logged as a real Sui transaction. Immutable. Verifiable by anyone.

**3. Instant Revocation** — One transaction to pause or revoke any agent. Budget frozen. Actions blocked.

## Key Concepts

**PolicyObject** — A Move object on Sui storing your agent's rules: budget, risk ceiling, slippage guard, max single tx, scope, and expiry.

**validate_action** — The core enforcement function called before every agent action. If any check fails, the transaction aborts.

**ActivityLog** — An append-only on-chain log of every action the agent attempted. Cannot be modified or deleted.

**Wallet Balance Guard** — Before calling validate_action, Arbitra checks the agent's actual wallet balance via Sui RPC.

## Live Demo

- Workbench: https://arbitra-nine.vercel.app
- Trading Agent: https://arbitra-nine.vercel.app/dashboard/0xf546ab89f2764229ac9049d7afdbaa7542ff4ea20651eb0119546f9a4bacc307
