require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

//Routers
const { requireCredentials } = require("../auth/restricted-middleware.js");
const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/auth-router.js");
const auctionsRouter = require("../auctions/auctions-router.js");
const bidsRouter = require("../bids/bids-router.js");
const paymentRouter = require("../payments/payment-router.js");

const server = express();

//Middleware
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

//Routes
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/auctions", requireCredentials, auctionsRouter);
server.use("/api/bids", requireCredentials, bidsRouter);
server.use("/api/payments", paymentRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
