const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true, maxLength: 20 },
  description: { type: String, required: true, maxLength: 50 },
  clothes: [{ type: Schema.Types.ObjectId, ref: "Clothes" }],
});

categorySchema.virtual("url").get(function () {
  return `/shop/${this.name}`;
});

module.exports = mongoose.model("Category", categorySchema);
