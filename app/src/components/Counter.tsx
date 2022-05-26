import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  SystemProgram,
} from "@solana/web3.js";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import idl from "../idl.json";
import { useState } from "react";

let baseAccount = Keypair.generate();
const programID = new web3.PublicKey(idl.metadata.address);
const network = clusterApiUrl("devnet");

const opts: web3.ConfirmOptions = {
  preflightCommitment: "processed",
};

const getProvider = (wallet: WalletContextState) => {
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

export const Counter = () => {
  const wallet = useWallet();
  const [counter, setCounter] = useState<string>();

  const handleCreateCounter = async () => {
    try {
      const provider = getProvider(wallet);
      if (!provider) return;
      const program = new Program<any>(idl as any, programID, provider);
      await program.rpc.create({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );
      setCounter(account.count.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrementCounter = async () => {
    const provider = getProvider(wallet);
    if (!provider) return;
    const program = new Program<any>(idl as any, programID, provider);
    await program.rpc.increment({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });
    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    setCounter(account.count.toString());
  };

  return (
    <div>
      {typeof counter === "undefined" ? (
        <button onClick={handleCreateCounter}>Create counter</button>
      ) : (
        <button onClick={handleIncrementCounter}>Increment counter</button>
      )}
      <div>{counter}</div>
    </div>
  );
};
