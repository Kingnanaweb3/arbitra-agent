# FAQ

## What is Arbitra?

Arbitra is a policy enforcement protocol for AI agents on Sui. It enforces budget limits, risk controls, and scope restrictions at the Move VM level — rules the agent cannot override.

## How is Arbitra different from a smart contract wallet?

A smart contract wallet controls who can spend funds. Arbitra controls what an AI agent can do with those funds — per action, in real time, with on-chain audit trail.

## Does Arbitra custody my funds?

No. Arbitra never holds your funds. It only enforces policy checks. The agent's wallet holds the tokens. Arbitra just decides whether each action is allowed.

## What happens when a policy expires?

The PolicyObject's status becomes expired. All subsequent validate_action calls will revert with E_POLICY_EXPIRED. Deploy a new policy to continue.

## Can I update a policy after deployment?

Partially. You can update risk_ceiling, slippage_guard_bps, and max_single_tx without redeployment using update_risk_params. Budget and scope cannot be changed — they require a new policy deployment.

## What is the PolicyCap?

The PolicyCap is a capability object returned when you create a policy. It proves ownership and is required for revocation. Keep it safe — losing it means you cannot revoke the policy.

## What is the DAO override address?

A secondary wallet address that can resume a paused policy. Useful for DAO-controlled agents where a multisig needs to intervene.

## Is Arbitra audited?

The contracts are deployed on Sui testnet. A mainnet audit is planned before production launch.

## What tokens does Arbitra support?

Any Sui token. The policy stores the token type as a string. The wallet balance check uses the USDC coin type by default but can be configured for any token.

## How do I get testnet USDC?

Use the Sui wallet app (Slush or Sui Wallet) on testnet mode and request tokens from the built-in faucet.

## Where can I see my agent's transactions?

All transactions are visible on suiscan.xyz/testnet. Search by policy ID, transaction hash, or wallet address.

## How do I report a bug?

Open an issue on GitHub: https://github.com/Kingnanaweb3/arbitra
