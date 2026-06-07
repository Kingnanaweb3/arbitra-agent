# API Reference

Base URL: https://arbitra-nine.vercel.app

## POST /api/action

Enforces policy on an agent action.

Request:

    {
      "action": "BUY",
      "amount": 12,
      "riskScore": 38,
      "slippageBps": 180,
      "policyId": "0xf546ab89...",
      "walletAddress": "0x75380bca...",
      "scope": "deepbook",
      "token": "USDC"
    }

Response — Approved:

    {
      "approved": true,
      "txDigest": "8fomaqM2...",
      "policyVersion": "v1.0",
      "onChainPolicy": true
    }

Response — Rejected:

    {
      "approved": false,
      "rejectionReason": "Risk score 85 exceeds ceiling 75"
    }

Rejection reasons: Budget exceeded, Risk ceiling breached, Slippage exceeded, Max transaction limit exceeded, Scope violation, Policy expired, Policy is paused, Policy has been revoked, Insufficient wallet balance.

## POST /api/deploy

Deploys a new PolicyObject on Sui testnet.

Request:

    {
      "agentName": "My Trading Agent",
      "agentType": "trading",
      "budget": 200,
      "token": "USDC",
      "scope": "deepbook",
      "expiry": "24",
      "riskCeiling": 75,
      "slippageGuardBps": 250,
      "maxSingleTx": 50
    }

Response:

    {
      "success": true,
      "policyId": "0xf546ab89...",
      "txDigest": "4CaVJc5fd6..."
    }

## GET /api/logs

Fetches on-chain activity log for a policy.

Query params: policyId (required), token, budget, statsOnly

Response:

    {
      "logs": [
        {
          "time": "12:34:01",
          "action": "BUY",
          "amount": 12,
          "token": "USDC",
          "status": "approved",
          "txHash": "8fomaqM2..."
        }
      ]
    }

## POST /api/policy

Executes policy management actions on-chain.

Pause:

    { "action": "pause", "policyId": "0x...", "riskScore": 95 }

Resume:

    { "action": "resume", "policyId": "0x...", "riskScore": 20 }

Revoke:

    { "action": "revoke", "policyId": "0x...", "capId": "0x..." }

Response:

    { "success": true, "txDigest": "9NaFHWrbb1..." }
