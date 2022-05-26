import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import twitterIdl from "../twitterIdl.json";
import counterIdl from "../counterIdl.json";

// export const network = "http://127.0.0.1:8899";
export const network = clusterApiUrl("devnet");

const opts: web3.ConfirmOptions = {
  preflightCommitment: "processed",
};

export const getProvider = (wallet: WalletContextState) => {
  if (
    !wallet?.publicKey ||
    !wallet?.signAllTransactions ||
    !wallet?.signTransaction
  )
    return;
  const connection = new Connection(network, opts.preflightCommitment);
  return new AnchorProvider(
    connection,
    {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    },
    opts
  );
};

const twitterProgramID = new web3.PublicKey(twitterIdl.metadata.address);
export const getTwitterProgram = (provider?: AnchorProvider) => {
  if (!provider) return;
  return new Program<any>(twitterIdl as any, twitterProgramID, provider);
};

const counterProgramID = new web3.PublicKey(counterIdl.metadata.address);
export const getCounterProgram = (provider?: AnchorProvider) => {
  if (!provider) return;
  return new Program<any>(counterIdl as any, counterProgramID, provider);
};
