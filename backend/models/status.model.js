const { Schema, model } = require("mongoose");

const statusSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    firstname: { type: String },
    lastname: { type: String },
    content: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("status", statusSchema);
