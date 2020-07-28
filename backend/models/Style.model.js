const { Schema, model } = require("mongoose");

const styleSchema = new Schema({
  styles: Object,
  userID: Schema.Types.ObjectId,
});

module.exports = model("Style", styleSchema);
