const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");

const Promotions = require("../models/promotions");
const promoRouter = express.Router();

//---------Assignment 2----------------------
promoRouter
  .route("/")

  .get((req, res, next) => {
    Promotions.find({})
      .then(
        (promo) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post(authenticate.verifyUser, (req, res, next) => {
    Promotions.create(req.body)
      .then(
        (promo) => {
          console.log("Promotion added: ", promo);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on dishes");
  })

  .delete(authenticate.verifyUser, (req, res, next) => {
    Promotions.deleteMany({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

promoRouter
  .route("/:promoId")

  .get((req, res, next) => {
    Promotions.findById(req.params.promoId)
      .then(
        (promo) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /promotions/" + req.params.promoId
    );
  })

  .put(authenticate.verifyUser, (req, res, next) => {
    Promotions.findByIdAndUpdate(
      req.params.promoId,
      { $set: req.body },
      { new: true }
    )
      .then(
        (promo) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .delete(authenticate.verifyUser, (req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = promoRouter;

// promoRouter
//   .route("/")

//   .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain");
//     next();
//   })

//   .get((req, res, next) => {
//     req.statusCode = 200;
//     res.end("Will send all the promotion to you !");
//   })

//   .post((req, res, next) => {
//     res.end(
//       "Will add the promotion: " +
//         req.body.name +
//         " with details " +
//         req.body.description
//     );
//   })

//   .put((req, res, next) => {
//     res.statusCode = 403;
//     res.end("PUT operation not supported on dishes");
//   })

//   .delete((req, res, next) => {
//     res.end("Deleting all the promotions !");
//   });

// promoRouter
//   .route("/:promoId")

//   .get((req, res, next) => {
//     res.end(
//       "Will send detail of the promotion " + req.params.promoId + " to you !"
//     );
//   })

//   .post((req, res, next) => {
//     res.statusCode = 403;
//     res.end(
//       "POST operation not supported on /promotions/" + req.params.promoId
//     );
//   })

//   .put((req, res, next) => {
//     res.write("Updating the promotion: " + req.params.promoId);
//     res.end(
//       ", Will update the promotion " +
//         req.body.name +
//         " with details " +
//         req.body.description
//     );
//   })

//   .delete((req, res, next) => {
//     res.end("Deleting promotion " + req.params.promoId);
//   });
