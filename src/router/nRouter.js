const express = require("express");
const News = require("../models/NEWS");
const nRouter = new express.Router();

nRouter.get("/news", (req, res) => {
  News.find({})
    .then((allnews) => {
      res.status(200).send(allnews);
    })
    .catch((e) => {
      res.status(500).send("error");
    });
});

nRouter.get("/news/:id", (req, res) => {
  const _id = req.params.id;
  News.findById(_id)
    .then((report) => {
      if (!report) {
        res.status(400).send("there is no report with this ID");
      }
      res.status(200).send(report);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

nRouter.put("/news/:id", async (req, res) => {
  const updatesparam = Object.keys(req.body);
  const allowedupdates = ["tittle", "description", "auther"];
  const isvalid = updatesparam.every((updatename) =>
    allowedupdates.includes(updatename)
  );
  if (!isvalid) {
    return res.status(400).send("Cant be updated");
  }
  const _id = req.params.id;
  try {
    const article = await News.findById(_id);
    if (!article) {
      return res.send("there is no report with this ID");
    }
    updatesparam.forEach((update) => {
      article[update] = req.body[update];
    });
    await article.save();
    res.status(200).send(article);
  } catch (e) {
    console.log(e);
    res.status(400).send("Error has occurred");
  }
});

nRouter.delete("/news/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const article = await News.findByIdAndDelete(_id);
    if (!article) {
      return res.send("there is no report with this ID");
    }
    res.status(200).send(article);
  } catch (e) {
    res.status(400).send("Error has occurred");
  }
});

nRouter.post("/news/:id", (req, res) => {
  const newarticleparam = Object.keys(req.body);
  const allowedparams = ["tittle", "description", "auther"];
  const isvalid = newarticleparam.every((param) =>
    allowedparams.includes(param)
  );
  if (!isvalid) {
    return res.status(400).send("u should enter the right data ya beeeeeh");
  }

  const article = new News(req.body);
  article
    .save()
    .then(() => {
      res.status(200).send(article);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = nRouter;
