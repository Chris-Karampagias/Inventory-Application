const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clothesSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: true },
  price: {
    type: Number,
    get: (v) => {
      if (typeof v !== "number") {
        return;
      }
      v.toFixed(2);
    },
    set: (v) => {
      if (typeof v !== "number") {
        return;
      }
      v.toFixed(2);
    },
    required: true,
  },
  stock_number: { type: Number, required: true },
  type: { type: String, required: true },
});

clothesSchema.virtual("url").get(function () {
  if (this.type === "men") {
    return `/shop/mens_clothing/${this._id}`;
  } else {
    return `/shop/womens_clothing/${this._id}`;
  }
});

module.exports = mongoose.model("Clothes", clothesSchema);
