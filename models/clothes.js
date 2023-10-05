const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clothesSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: true },
  price: {
    type: Number,
    get: (v) => v.toFixed(2),
    set: (v) => v.toFixed(2),
    required: true,
  },
  stock_number: { type: Number, required: true },
  image_path: {
    type: String,
    get: (v) => `../public/images/${v}`,
    set: (v) => `../public/images/${v}`,
    required: true,
  },
  type: { type: String, required: true },
});

clothesSchema.virtual("url").get(function () {
  if (clothesSchema.type === "men") {
    return `/shop/mens_clothing/${this._id}`;
  } else {
    return `/shop/womens_clothing/${this._id}`;
  }
});

module.exports = mongoose.model("Clothes", clothesSchema);
