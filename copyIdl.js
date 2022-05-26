const fs = require("fs");
const counterIdl = require("./target/idl/mysolanaapp.json");
const twitterIdl = require("./target/idl/solana_twitter.json");

fs.writeFileSync("./app/src/counterIdl.json", JSON.stringify(counterIdl));
fs.writeFileSync("./app/src/twitterIdl.json", JSON.stringify(twitterIdl));
