# Core Concepts

## PolicyObject

The PolicyObject is a shared Move object on Sui storing all rules for a single agent.

| Field | Type | Description |
|-------|------|-------------|
| budget_total | u64 | Total budget allocated |
| budget_remaining | u64 | Remaining budget — deducted on each approval |
| risk_ceiling | u64 | Maximum risk score allowed (0-100) |
| slippage_guard_bps | u64 | Maximum slippage in basis points |
| max_single_tx | u64 | Maximum amount per transaction |
| scope | u8 | 1=Deepbook, 2=Custom |
| expiry_ms | u64 | Unix timestamp when policy expires |
| status | u8 | 1=Active, 2=Paused, 3=Revoked |

## Action Enforcement

### Step 1 — Wallet Balance Check
Arbitra reads the agent's token balance from Sui. If balance < amount, blocked immediately.

### Step 2 — validate_action on Sui
The Move contract checks:
1. Is the policy active?
2. Has it expired?
3. Is the scope correct?
4. Is risk score below ceiling?
5. Is slippage within guard?
6. Is amount below max single tx?
7. Is budget remaining sufficient?

If any check fails, the contract aborts. Action rejected.

### Step 3 — Budget Deduction
budget_remaining is decremented on-chain. Cannot double-spend.

### Step 4 — Event Emission
ActionApproved or ActionRejected event emitted on Sui. Populates the activity log.

## Activity Log

Populated from real on-chain events:
- ActionApproved — validate_action succeeded
- ActionRejected — validate_action failed
- PolicyPaused — pause_policy called
- PolicyResumed — resume_policy called
- PolicyRevoked — revoke_policy called

Every entry is a real Sui transaction. Immutable. Tamper-proof.

## Wallet Balance Guard

The agent sends its wallet address with every action request:

    {
      "action": "PURCHASE",
      "amount": 15,
      "policyId": "0x...",
      "walletAddress": "0x75380bca...",
      "token": "USDC"
    }

Arbitra reads USDC balance from Sui and rejects if balance < amount.
