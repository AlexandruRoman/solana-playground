import { useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram } from "@solana/web3.js";
import { useState } from "react";
import { getTwitterProgram, getProvider } from "./utils";

let baseAccount = Keypair.generate();

export const Counter = () => {
  const wallet = useWallet();
  const [counter, setCounter] = useState<string>();

  const handleCreateCounter = async () => {
    try {
      const provider = getProvider(wallet);
      const program = getTwitterProgram(provider);
      if (!program || !provider) return;
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
    const program = getTwitterProgram(provider);
    if (!program || !provider) return;
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
