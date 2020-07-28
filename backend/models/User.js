const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    email: String,
    name: 
    { 
      firstname:String,
      lastname:String,
    },
    googleId: String,
    imageUrl: String,
    song:String,
    friends:[String],
    bio:String,

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(PLM, { usernameField: "email" });

module.exports = model("User", userSchema);
