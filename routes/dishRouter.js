const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Dishes = require("../models/dishes");
const { application } = require("express");

const dishRouter = express.Router();

dishRouter
  .route("/")

  .get((req, res, next) => {
    Dishes.find({})
      .then(
        (dish) => {
          res.statusCode = 200;
          res.setHeader("Conten-Type", "application/json");
          res.json(dish);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post((req, res, next) => {
    Dishes.create(req.body)
      .then(
        (dish) => {
          console.log("Dish Created ", dish);
          res.statusCode = 200;
          res.setHeader("Conten-Type", "application/json");
          res.json(dish);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on dishes");
  })

  .delete((req, res, next) => {
    Dishes.deleteMany({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Conten-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

dishRouter
  .route("/:dishId")
  .get((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(
        (dish) => {
          res.statusCode = 200;
          res.setHeader("Conten-Type", "application/json");
          res.json(dish);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId);
  })

  .put((req, res, next) => {
    Dishes.findByIdAndUpdate(
      req.params.dishId,
      { $set: req.body },
      { new: true }
    )
      .then(
        (dish) => {
          res.statusCode = 200;
          res.setHeader("Conten-Type", "application/json");
          res.json(dish);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Conten-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = dishRouter;

// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// const Dishes = require("../models/dishes");

// const dishRouter = express.Router();

// dishRouter
//   .route("/")

//   .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain");
//     next();
//   })

//   .get((req, res, next) => {
//     req.statusCode = 200;
//     res.end("Will send all the dishes to you !");
//   })

//   .post((req, res, next) => {
//     res.end(
//       "Will add the dish: " +
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
//     res.end("Deleting all the dishes !");
//   });

// dishRouter
//   .route("/:dishId")

//   .get((req, res, next) => {
//     res.end("Will send detail of the dish " + req.params.dishId + " to you !");
//   })

//   .post((req, res, next) => {
//     res.statusCode = 403;
//     res.end("POST operation not supported on /dishes/" + req.params.dishId);
//   })

//   .put((req, res, next) => {
//     res.write("Updating the dish: " + req.params.dishId);
//     res.end(
//       ", Will update the dish " +
//         req.body.name +
//         " with details " +
//         req.body.description
//     );
//   })

//   .delete((req, res, next) => {
//     res.end("Deleting dish " + req.params.dishId);
//   });

// module.exports = dishRouter;
