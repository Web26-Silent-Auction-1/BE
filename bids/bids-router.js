const router = require("express").Router();

const Bids = require("./bids-model.js");
const { requireBidder } = require("../auth/restricted-middleware.js");

router.get("/", (req, res) => {
  Bids.find()
    .then(bids => {
      res.status(200).json(bids);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Unable to retrieve list of bids." });
    });
});

router.get("/:id", (req, res) => {
  Bids.findBy(req.params.id)
    .then(bids => {
      if (bids.length > 0) {
        res.status(200).json(bids);
      } else {
        res.status(404).json({
          errorMessage: "The auction with the specified id has no bids."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Unable to retrieve list of bids." });
    });
});

router.post("/:id", requireBidder, (req, res) => {
  const bid = {
    ...req.body,
    user_id: req.decodedToken.user_id,
    auction_id: req.params.id
  };
  // console.log(req)
  if (!req.body.amount) {
    res.status(400).json({ errorMessage: "Please provide a bid amount." });
  } else {
    Bids.add(bid)
      .then(bid => {
        if (bid) {
          res.status(201).json(bid);
        } else {
          res.status(404).json({
            errorMessage: "The auction with the specified id does not exist."
          });
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ errorMessage: "Unable to add bid to the database." });
      });
  }
});

module.exports = router;
