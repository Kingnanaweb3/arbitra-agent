# SDK Reference

## Installation

    npm install @arbitra/sdk

## createPolicy()

Creates a new PolicyObject on Sui.

    const policy = await Arbitra.createPolicy({
      type: "trading",
      budget: 200,
      token: "USDC",
      scope: "deepbook",
      expiry: "24h",
      riskCeiling: 75,
      slippageGuardBps: 250,
      maxTx: 50,
      beneficiary: "0x...",
      daoOverride: "0x...",
    });
    
    // Returns:
    // policy.policyId  — 0x...
    // policy.txDigest  — transaction hash

## checkAction()

Checks if an action is allowed by the policy.

    const result = await agent.checkAction({
      action: "BUY",
      amount: 12,
      riskScore: 38,
      slippageBps: 180,
      policyId: process.env.POLICY_ID,
      walletAddress: process.env.AGENT_WALLET,
      scope: "deepbook",
    });
    
    if (result.approved) {
      console.log("Approved — tx:", result.txDigest);
    } else {
      console.log("Rejected:", result.rejectionReason);
    }

## pausePolicy()

Pauses a policy on-chain.

    await Arbitra.pausePolicy({
      policyId: "0x...",
      riskScore: 95,
    });

## resumePolicy()

Resumes a paused policy. Only owner or DAO override can call.

    await Arbitra.resumePolicy({
      policyId: "0x...",
      riskScore: 20,
    });

## revokePolicy()

Permanently revokes a policy. Cannot be undone.

    await Arbitra.revokePolicy({
      policyId: "0x...",
      capId: "0x...",
    });

## updateRiskParams()

Updates risk parameters without redeploying.

    await Arbitra.updateRiskParams({
      policyId: "0x...",
      riskCeiling: 60,
      slippageGuardBps: 150,
      maxSingleTx: 30,
    });
