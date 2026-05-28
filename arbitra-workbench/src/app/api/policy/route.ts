import { NextRequest, NextResponse } from "next/server";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { fromB64 } from "@mysten/sui.js/utils";

const suiClient = new SuiClient({ url: getFullnodeUrl("testnet") });
const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID ?? "0x8d2d740caccc02db4643f6ebccada30e0b029fb6274fdb9ffed04fed3ad3e53c";
const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY ?? "";
const CLOCK_ID = "0x6";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, policyId, riskScore } = body;

    if (!PRIVATE_KEY) {
      return NextResponse.json({ success: false, error: "Deployer key not configured" }, { status: 500 });
    }

    const keypair = Ed25519Keypair.fromSecretKey(fromB64(PRIVATE_KEY));
    const tx = new TransactionBlock();

    if (action === "pause") {
      tx.moveCall({
        target: `${PACKAGE_ID}::policy_object::pause_policy`,
        arguments: [
          tx.object(policyId),
          tx.pure(riskScore ?? 95, "u64"),
          tx.object(CLOCK_ID),
        ],
      });
    } else if (action === "resume") {
      tx.moveCall({
        target: `${PACKAGE_ID}::policy_object::resume_policy`,
        arguments: [
          tx.object(policyId),
          tx.pure(riskScore ?? 0, "u64"),
          tx.object(CLOCK_ID),
        ],
      });
    } else if (action === "revoke") {
      const { capId } = body;
      if (!capId) {
        return NextResponse.json({ success: false, error: "capId required for revoke" }, { status: 400 });
      }
      tx.moveCall({
        target: `${PACKAGE_ID}::policy_object::revoke_policy`,
        arguments: [
          tx.object(policyId),
          tx.object(capId),
          tx.object(CLOCK_ID),
        ],
      });
    } else {
      return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 });
    }

    const result = await suiClient.signAndExecuteTransactionBlock({
      transactionBlock: tx,
      signer: keypair,
      options: { showEffects: true },
    });

    const success = result.effects?.status?.status === "success";
    console.log(`[Policy API] ${action} | policyId: ${policyId} | tx: ${result.digest}`);

    return NextResponse.json({
      success,
      action,
      txDigest: result.digest,
      timestamp: Date.now(),
    });

  } catch (error: any) {
    console.error("[Policy API] Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
