import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { SendTransaction } from "./components/SendTransaction";
import { Counter } from "./components/Counter";

function App() {
  return (
    <div>
      <WalletMultiButton />
      <WalletDisconnectButton />
      {/* <Airdrop /> */}
      <Counter />
    </div>
  );
}

export default App;
