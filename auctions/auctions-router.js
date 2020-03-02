const router = require("express").Router();

const Auctions = require("./auctions-model.js");
const { requireSeller } = require("../auth/restricted-middleware.js");

const checkFields = (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.image ||
    !req.body.description ||
    !req.body.starting_price ||
    !req.body.deadline
  ) {
    res.status(400).json({ errorMessage: "Please fill out all fields." });
  } else {
    next();
  }
};

router.get("/", (req, res) => {
  Auctions.find()
    .then(auctions => {
      res.status(200).json(auctions);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Unable to retrieve list of auctions" });
    });
});

router.get("/:id", (req, res) => {
  Auctions.findById(req.params.id)
    .then(auction => {
      if (auction) {
        res.status(200).json(auction);
      } else {
        res.status(404).json({
          errorMessage: "The auction with the specified id does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Failed to retrieve auction." });
    });
});

router.post("/", requireSeller, checkFields, (req, res) => {
  const auction = { ...req.body, user_id: req.decodedToken.user_id };

  Auctions.add(auction)
    .then(auction => {
      res.status(201).json(auction);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Unable to create new auction." });
    });
});

router.put("/:id", requireSeller, checkFields, (req, res) => {
  Auctions.update(req.params.id, req.body)
    .then(auction => {
      if (auction) {
        res.status(200).json(auction);
      } else {
        res.status(404).json({
          errorMessage: "The auction with the specified id does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Unable to update auction." });
    });
});

router.delete("/:id", requireSeller, (req, res) => {
  Auctions.remove(req.params.id)
    .then(removed => {
      if (removed) {
        res.status(200).json(removed);
      } else {
        res.status(404).json({
          errorMessage: "The auction with the specified id does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Unable to delete auction." });
    });
});

module.exports = router;
