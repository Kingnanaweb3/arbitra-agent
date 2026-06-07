# Contract Reference

## Package Information

| Field | Value |
|-------|-------|
| Package ID | 0x8d2d740caccc02db4643f6ebccada30e0b029fb6274fdb9ffed04fed3ad3e53c |
| Network | Sui Testnet |
| Language | Move |
| Modules | policy_object, activity_log, risk_params |

## Functions

### create_policy
Creates a new PolicyObject and returns a PolicyCap to the owner.

Parameters: agent_name, agent_type, budget, token, scope, custom_scope_address, expiry_ms, risk_ceiling, slippage_guard_bps, max_single_tx, beneficiary, dao_override, clock, ctx

### validate_action
Enforces policy on an agent action. Reverts if any check fails.

Parameters: policy, action_type, amount, scope_check, risk_score, slippage_bps, clock, ctx

### pause_policy
Pauses an active policy.

### resume_policy
Resumes a paused policy. Only owner or DAO override can call.

### revoke_policy
Permanently revokes a policy. Requires PolicyCap.

### update_risk_params
Updates risk ceiling, slippage guard, and max single tx without redeployment.

## Events

| Event | Emitted When |
|-------|-------------|
| ActionApproved | validate_action succeeds |
| ActionRejected | validate_action fails |
| PolicyDeployed | New policy created |
| PolicyPaused | pause_policy called |
| PolicyResumed | resume_policy called |
| PolicyRevoked | revoke_policy called |

## Scope Constants

| Constant | Value |
|----------|-------|
| SCOPE_DEEPBOOK | 1 |
| SCOPE_CUSTOM | 2 |

## Error Codes

| Code | Name |
|------|------|
| 1 | E_BUDGET_EXCEEDED |
| 2 | E_POLICY_EXPIRED |
| 3 | E_SCOPE_VIOLATION |
| 4 | E_RISK_CEILING_BREACHED |
| 5 | E_SLIPPAGE_EXCEEDED |
| 6 | E_TX_LIMIT_EXCEEDED |
| 7 | E_NOT_OWNER |
| 8 | E_POLICY_REVOKED |
