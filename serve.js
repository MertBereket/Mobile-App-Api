const express = require("express");
const app = express();
const routers = require("./routers");
const HttpStatusCode = require("http-status-codes");

app.get("/", function (req, res) {
  res.json("Mobile App Api");
});


app.use(routers.authRouter);
app.use(routers.userRouter);
app.use(routers.masalarRouter);
app.use(routers.menuRouter);

app.use((req, res, next) => {
  res.status(HttpStatusCode.NOT_FOUND).send("404 NOT FOUND");
});

module.exports = app;
