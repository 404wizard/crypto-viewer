import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv/config";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

const app = express();
const port = 3000;
const API_KEY = process.env.API_KEY;
const address = "0x51b78aac1c8516C8ABA8fcB3593836b7623Dd5C5";
const chain = EvmChain.POLYGON;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// console.log("Blockchain Name: " + chain.name);
// console.log(chain.currency);

// console.log(API_KEY);
// console.log(MORALIS_API_KEY);

async function getDemoData() {
    // Get native balance
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
    address,
    chain,
    });

    // Format the native balance formatted in ether via the .ether getter
    const native = nativeBalance.result.balance.ether;

    return { native };
}

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/demo", async (req, res) => {
    await Moralis.start({
        apiKey: API_KEY,
    });
    
    try {
      // Get and return the crypto data
      const data = await getDemoData();
      res.status(200);
      res.json(data);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500);
      res.json({ error: error.message });
    }
  });

app.get("/search", async (req, res) => {
    console.log("Wallet Address: " + req.body.walletadd);

    try {
        await Moralis.start({
          apiKey: API_KEY
        });

        const response = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
            "chain": "0x89",
            "excludeSpam": true,
            "excludeUnverifiedContracts": true,
            "address": "0x51b78aac1c8516C8ABA8fcB3593836b7623Dd5C5"
        });

        console.log("Amount: " + response.result[0].balance_formatted + response.result[0].symbol);
    } catch (e) {
        console.error(e);
    }
});

// app.post("/api-url", async (req, res) => {
//     try {
//       const result = await axios.get(API_URL);
//       res.render("index.ejs", { content: result.data });
//     } catch (error) {
//       console.log(error.response.data);
//       res.status(500);
//     }
//   });

app.listen(port, () => {
    console.log("Listening on port " + port);
});