# Quick Start

## Deploy Your First Agent in 3 Minutes

### Option A — No-code Workbench

1. Go to https://arbitra-nine.vercel.app
2. Connect your Sui wallet
3. Click New Agent
4. Choose your agent type
5. Enter your agent name and endpoint URL
6. Set policy parameters — budget, risk ceiling, max tx, expiry
7. Click Deploy Agent

Your PolicyObject is created on Sui testnet in one transaction. Copy the policy ID and add it to your agent server as POLICY_ID.

### Option B — SDK

    const policy = await Arbitra.createPolicy({
      type: "trading",
      budget: 200,
      token: "USDC",
      scope: "deepbook",
      expiry: "24h",
      riskCeiling: 75,
      maxTx: 50,
    });
    
    console.log("Policy ID:", policy.policyId);

### Connecting Your Agent

Before every economic action, your agent calls the Arbitra API:

    const response = await fetch("https://arbitra-nine.vercel.app/api/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "BUY",
        amount: 12,
        riskScore: 38,
        slippageBps: 180,
        policyId: process.env.POLICY_ID,
        walletAddress: process.env.AGENT_WALLET,
        scope: "deepbook",
      }),
    });
    
    const { approved, rejectionReason } = await response.json();
    
    if (approved) {
      // Execute the action
    } else {
      console.log("Blocked:", rejectionReason);
    }

## Troubleshooting

**Budget exceeded** — The on-chain budget_remaining is depleted. Deploy a new policy.

**Policy check failed** — Your policy ID may be invalid or expired. Check suiscan.xyz.

**txDigest is null after approval** — Your agent wallet has insufficient tokens. Top up the wallet.

**Insufficient wallet balance** — Arbitra checked your wallet and found insufficient funds.

**Render agent not sending policyId** — Make sure POLICY_ID is set in Render environment variables.
