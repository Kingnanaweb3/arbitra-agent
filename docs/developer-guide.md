# Developer Guide

## Building Your Own Agent

Any AI agent can integrate with Arbitra. The only requirement is calling the Arbitra API before every economic action.

### Step 1 — Deploy a Policy

Go to https://arbitra-nine.vercel.app/new-agent or use the SDK. You will receive a policyId.

### Step 2 — Set Environment Variables

    ARBITRA_ENDPOINT=https://arbitra-nine.vercel.app/api/action
    POLICY_ID=0xf546ab89...
    DEPLOYER_PRIVATE_KEY=hkAEYy...
    VENDOR_ADDRESS=0x7190887d...

Every agent that uses Arbitra must have a POLICY_ID. Without it, Arbitra cannot enforce any rules.

### Step 3 — Call Arbitra Before Every Action

    async function checkWithArbitra(action, amount, riskScore) {
      const response = await axios.post(process.env.ARBITRA_ENDPOINT, {
        action,
        amount,
        riskScore,
        slippageBps: 200,
        policyId: process.env.POLICY_ID,
        walletAddress: "0x75380bca...",
        scope: "deepbook",
        token: "USDC",
      });
      return response.data;
    }
    
    const decision = await checkWithArbitra("BUY", 12, 38);
    
    if (decision.approved) {
      await executeSwap(12);
    } else {
      console.log("Blocked:", decision.rejectionReason);
    }

### Step 4 — Execute Real Transfers

After Arbitra approves, execute the real token transfer using @mysten/sui.js:

    const { SuiClient, getFullnodeUrl } = require("@mysten/sui.js/client");
    const { Ed25519Keypair } = require("@mysten/sui.js/keypairs/ed25519");
    const { TransactionBlock } = require("@mysten/sui.js/transactions");
    const { fromB64 } = require("@mysten/sui.js/utils");
    
    async function transferUSDC(amount, vendorAddress) {
      const client = new SuiClient({ url: getFullnodeUrl("testnet") });
      const keypair = Ed25519Keypair.fromSecretKey(fromB64(process.env.DEPLOYER_PRIVATE_KEY));
    
      const coins = await client.getCoins({
        owner: keypair.getPublicKey().toSuiAddress(),
        coinType: "0xa1ec7fc00a6f40db9693ad1415d0c193ad3906494428cf252621037bd7117e29::usdc::USDC",
      });
    
      const validCoin = coins.data.find(c => Number(c.balance) >= amount * 1_000_000);
      if (!validCoin) throw new Error("Insufficient USDC balance");
    
      const tx = new TransactionBlock();
      if (coins.data.length > 1) {
        tx.mergeCoins(
          tx.object(coins.data[0].coinObjectId),
          coins.data.slice(1).map(c => tx.object(c.coinObjectId))
        );
      }
      const [coin] = tx.splitCoins(
        tx.object(coins.data[0].coinObjectId),
        [tx.pure(amount * 1_000_000, "u64")]
      );
      tx.transferObjects([coin], tx.pure(vendorAddress, "address"));
    
      const result = await client.signAndExecuteTransactionBlock({
        transactionBlock: tx,
        signer: keypair,
        options: { showEffects: true },
      });
    
      await new Promise(r => setTimeout(r, 10000)); // Wait for confirmation
      return result.digest;
    }

## Wallet Balance

Arbitra checks the agent wallet balance before approving. The agent wallet is separate from the policy budget:

- Policy budget — tracked on-chain in the PolicyObject
- Wallet balance — actual tokens in the agent's wallet

Both must be sufficient for a transfer to succeed.

## Troubleshooting

**Budget exceeded** — PolicyObject budget_remaining is 0. Deploy a new policy.

**Insufficient wallet balance** — Agent wallet is empty. Send tokens to the wallet.

**Transaction needs to be rebuilt** — Coin object version changed. Add a 10 second delay between transfers.

**ArityMismatch in command 0** — Wrong number of arguments passed to Move function. Check function signature.

**UnusedValueWithoutDrop** — A Move function returned a value that was not handled. Transfer or drop the return value.
