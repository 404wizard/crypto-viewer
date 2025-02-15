import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv/config";

const app = express();
const port = 3000;
const API_KEY = process.env.API_KEY;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

// app.post("/api-url", async (req, res) => {
//     try {
//       const result = await axios.get(API_URL, config);
//       res.render("index.ejs", { content: result.data });
//     } catch (error) {
//       console.log(error.response.data);
//       res.status(500);
//     }
//   });

app.listen(port, () => {
    console.log("Listening on port " + port);
});