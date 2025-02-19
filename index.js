import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv/config";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

const app = express();
const port = 3000;
const API_KEY = process.env.API_KEY;

// API URL to get Wallet information
const walletBalanceURL = "https://deep-index.moralis.io/api/v2.2/wallets/:address/tokens"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/search", async (req, res) => {
    if (req.body.walletadd) {
        try {
            const response = await axios.get(walletBalanceURL, {
                headers: {
                    "x-api-key" : API_KEY,
                },
                params : {
                    "chain" : "0x89", // Polygon blockchain
                    "exclude_spam": true, // Auto filter out spam coins
                    "exclude_unverified_contracts": true, // Auto filter out potential spam coins
                    "address" : req.body.walletadd,
                }
            });
            res.render("index.ejs", { content: response.data });
        } catch (e) {
            console.error(e);
            res.render("index.ejs", { error: e.message })
        };        
    } else { // If the wallet address field is empty return message.
        res.render("index.ejs", { error: "You forgot to enter your wallet address. Try again!" });
    }
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});