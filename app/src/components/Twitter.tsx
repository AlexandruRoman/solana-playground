import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { getTwitterProgram, getProvider } from "./utils";
import Card from "@mui/material/Card";
import {
  Button,
  CardContent,
  CardHeader,
  Chip,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { web3 } from "@project-serum/anchor";

type Tweet = {
  author: string;
  topic: string;
  content: string;
};

const fetchTweets = async (wallet: WalletContextState): Promise<Tweet[]> => {
  const provider = getProvider(wallet);
  const program = getTwitterProgram(provider);
  if (!program || !provider) return [];
  const tweetAccounts = await program.account.tweet.all();
  return tweetAccounts.map(
    (tweetAccount): Tweet => ({
      author: tweetAccount.account.author.toBase58(),
      topic: tweetAccount.account.topic.toString(),
      content: tweetAccount.account.content.toString(),
    })
  );
};

export const sendTweet = async (
  wallet: WalletContextState,
  topic: string,
  content: string
) => {
  const provider = getProvider(wallet);
  const program = getTwitterProgram(provider);
  if (!program || !provider) return [];
  const tweet = web3.Keypair.generate();

  await program.rpc.sendTweet(topic, content, {
    accounts: {
      author: provider.wallet.publicKey,
      tweet: tweet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    },
    signers: [tweet],
  });

  // const tweetAccount = await program.account.tweet.fetch(tweet.publicKey)
};

export function Twitter() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const wallet = useWallet();

  useEffect(() => {
    fetchTweets(wallet).then((ts) => {
      console.log(ts);
      setTweets(ts);
    });
  }, [setTweets, wallet]);

  return (
    <div style={{ marginTop: 150 }}>
      <Typography variant="h5">Add new tweet</Typography>
      <TextField
        sx={{ marginY: 2 }}
        label="topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <br></br>
      <TextField
        sx={{ marginY: 2 }}
        label="content"
        multiline
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br></br>
      <Button
        variant="contained"
        sx={{ marginY: 2 }}
        onClick={() => {
          sendTweet(wallet, topic, content).then(() => {
            fetchTweets(wallet).then((ts) => {
              console.log(ts);
              setTweets(ts);
            });
          });
        }}
      >
        Post Tweet
      </Button>
      <hr></hr>
      {tweets.map((tweet, index) => (
        <Card sx={{ marginY: 2 }} key={index}>
          <CardHeader title={`${tweet.topic}`} />
          {tweet.author && <Chip color="info" label={tweet.author} />}
          <CardContent>{tweet.content}</CardContent>
        </Card>
      ))}
    </div>
  );
}
