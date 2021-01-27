const express = require("express");
const nRouter = require("./router/nRouter");
require("./db/mongoose");


const port = 3000;
const app = express();
app.use(express.json());
app.use(nRouter);

 app.listen(port, () => {
  console.log("Connection Successed");
});