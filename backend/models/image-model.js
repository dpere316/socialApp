const { Schema, model } = require("mongoose");

const thingSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = model(thingSchema);
