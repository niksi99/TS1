import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import logging from "./library/logging";
import authorRoute from "./routes/Author";
import bookRoute from "./routes/Book";

const router = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    logging.info("connected to mongodb");
    startServer();
  })
  .catch((err) => {
    logging.info("unable to connect");
  });

const startServer = () => {
  router.use((req, res, next) => {
    logging.info(
      `Incoming -> Method: [${req.method}] - Url: [${req.url} - ip: [${req.socket.remoteAddress}]]`
    );

    res.on("finish", () => {
      logging.info(
        `Incoming -> Method: [${req.method}] - Url: [${req.url} - ip: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "Origin, X-Requested-With Content-Type Authorization"
    );

    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  router.use("/authors", authorRoute);
  router.use("/books", bookRoute);

  router.get("/ping", (req, res) => {
    res.status(200).json({ message: "Radi" });
  });

  router.use((req, res, next) => {
    const error = new Error("not found");
    logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      logging.info(`Server is running on port ${config.server.port}`)
    );
};
