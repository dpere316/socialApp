const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    name:{type:String},
    email: {type:String},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    googleId: {type:String},
    imageUrl: {type:String},
    song:{type:String, default:null},
    friends:[{type:Schema.Types.ObjectId,ref:"User"}],
    bio:{type:String, default:null},
    role:{type:String, default:"Member"},
    styles: [{ type: Schema.Types.ObjectId, ref: "Style" }],
    image: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/768px-Circle-icons-profile.svg.png",
    },
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
