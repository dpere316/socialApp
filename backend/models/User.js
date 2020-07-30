const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    email: { type: String },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    googleId: { type: String },
    imageUrl: { type: String },
    song: { type: String, default: null },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    bio: { type: String, default: null },
    status: { type: String, default: null },
    styles: [{ type: Schema.Types.ObjectId, ref: "Style" }],
    image: String,
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(PLM, {
  usernameField: "email",
  populateFields: ["friends", "styles"],
});

module.exports = model("User", userSchema);
