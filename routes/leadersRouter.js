const express = require("express");
const bodyParser = require("body-parser");
const Leaders = require("../models/leaders");

const leadersRouter = express.Router();

//------------- Assignment 2 ---------------------

leadersRouter
  .route("/")

  .get((req, res, next) => {
    Leaders.find({})
      .then(
        (leader) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leader);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post((req, res, next) => {
    Leaders.create(req.body)
      .then(
        (leader) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leader);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on leaders");
  })

  .delete((req, res, next) => {
    Leaders.deleteMany({})
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

leadersRouter
  .route("/:leaderId")

  .get((req, res, next) => {
    Leaders.findById(req.params.leaderId)
      .then(
        (leader) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leader);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /leaders/" + req.params.leaderId);
  })

  .put((req, res, next) => {
    Leaders.findByIdAndUpdate(
      req.params.leaderId,
      { $set: req.body },
      { new: true }
    )
      .then(
        (leader) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leader);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .delete((req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
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

module.exports = leadersRouter;

// leadersRouter
//   .route("/")

//   .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain");
//     next();
//   })

//   .get((req, res, next) => {
//     req.statusCode = 200;
//     res.end("Will send all the leaders to you !");
//   })

//   .post((req, res, next) => {
//     res.end(
//       "Will add the leader: " +
//         req.body.name +
//         " with details " +
//         req.body.description
//     );
//   })

//   .put((req, res, next) => {
//     res.statusCode = 403;
//     res.end("PUT operation not supported on leaders");
//   })

//   .delete((req, res, next) => {
//     res.end("Deleting all the leaders !");
//   });

// leadersRouter
//   .route("/:leaderId")

//   .get((req, res, next) => {
//     res.end(
//       "Will send detail of the leader " + req.params.leaderId + " to you !"
//     );
//   })

//   .post((req, res, next) => {
//     res.statusCode = 403;
//     res.end("POST operation not supported on /leaders/" + req.params.leaderId);
//   })

//   .put((req, res, next) => {
//     res.write("Updating the leader: " + req.params.leaderId);
//     res.end(
//       ", Will update the leader " +
//         req.body.name +
//         " with details " +
//         req.body.description
//     );
//   })

//   .delete((req, res, next) => {
//     res.end("Deleting leader " + req.params.leaderId);
//   });
