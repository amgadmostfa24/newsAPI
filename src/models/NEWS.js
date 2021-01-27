const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    tittle: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    auther: { type: String, required: true },
  },
  {
    time: {
      currentTime: () => {
        var nowTime = new Date();
        nowTime.setHours(nowTime.getHours() + 2);
        return nowTime;
      },
    },
  }
);

const news = mongoose.model("News", newsSchema);
module.exports = news;