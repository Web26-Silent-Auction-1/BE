require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require("body-parser");

//Routers
// const restricted = require('../auth/restricted-middleware.js')
const { requireCredentials } = require('../auth/restricted-middleware.js')
const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');
const auctionsRouter = require('../auctions/auctions-router.js');
const bidsRouter = require('../bids/bids-router.js');
const paymentRouter = require('../payments/payment-router.js');

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const server = express();

//Middleware
server.use(express.json())
server.use(cors());
server.use(helmet());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

//Routes
server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)
server.use('/api/auctions', requireCredentials, auctionsRouter)
server.use('/api/bids', requireCredentials, bidsRouter)
server.use('/api/payments', paymentRouter)

server.get('/', (req, res) => {
    res.json({api: 'up'})
})

// server.post("/payment", (req, res) => {
//     console.log("This is the body", req.body);
//     const body = {
//       source: req.body.token.id,
//       amount: req.body.amount,
//       currency: "usd"
//     };
  
//     stripe.charges.create(body, (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).send({ error: stripeErr });
//       } else {
//         res.status(200).send({ success: stripeRes });
//       }
//     });
//   });

module.exports = server;