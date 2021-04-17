const express = require("express");
const app = express();
const routers = require("./routers");
const HttpStatusCode = require("http-status-codes");

app.get("/", function (req, res) {
  res.json("Headline Serve Project");
});

app.use(routers.lyricsRouter);
app.use(routers.authRouter);
app.use(routers.userRouter);
app.use(routers.competitionRouter);
app.use(routers.resultListRouter);
app.use(routers.categoryRouter);

app.use((req, res, next) => {
  res.status(HttpStatusCode.NOT_FOUND).send("404 NOT FOUND");
});

module.exports = app;
