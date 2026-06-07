# Agent Types

## Trading Agent
For AI agents that execute trades on Deepbook or other DEXs.

Scope: Deepbook
Actions: BUY, SELL, SKIP, SWAP
Key parameters: slippage_guard_bps, risk_ceiling, max_single_tx

## E-Commerce Agent
For AI agents that make purchases from approved vendors.

Scope: Custom (vendor address)
Actions: PURCHASE, SUBSCRIBE, SKIP
Key parameters: custom_scope_address, max_single_tx, budget_remaining

## DAO Treasury Agent
For AI agents that distribute grants from a DAO treasury.

Scope: Custom
Actions: GRANT, PAY, TRANSFER
Key parameters: dao_override (DAO multisig), budget_remaining, max_single_tx

## Payments Agent
For AI agents that process B2B payments and invoices.

Scope: Custom
Actions: PAY, INVOICE, TRANSFER, SUBSCRIBE

## Gaming Agent
For AI agents that make in-game purchases and NFT bids.

Scope: Custom
Actions: BID, MINT, PURCHASE, STAKE

## Custom Agent
For any agent type not covered above. Full control over all parameters.
