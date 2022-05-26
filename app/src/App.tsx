import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { SendTransaction } from "./components/SendTransaction";
import { Counter } from "./components/Counter";
import { Twitter } from "./components/Twitter";

function App() {
  return (
    <div>
      <WalletMultiButton />
      <WalletDisconnectButton />
      {/* <Airdrop /> */}
      {/* <Counter /> */}
      <Twitter />
    </div>
  );
}

export default App;
