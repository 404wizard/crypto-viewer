import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv/config";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

const app = express();
const port = 3000;
const API_KEY = process.env.API_KEY;
const walletBalanceURL = "https://deep-index.moralis.io/api/v2.2/wallets/:address/tokens"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/search", async (req, res) => {
    try {
        const response = await axios.get(walletBalanceURL, {
            headers: {
                "x-api-key" : API_KEY,
            },
            params : {
                "chain" : "0x89",
                "exclude_spam": true,
                "exclude_unverified_contracts": true,
                "address" : req.body.walletadd,
            }
        });
        
        res.render("index.ejs", { content: response.data })
      } catch (e) {
            console.error(e);
      };
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});