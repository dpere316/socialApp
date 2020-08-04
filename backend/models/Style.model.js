const { Schema, model } = require("mongoose");

const styleSchema = new Schema({
  styles: {
    type: Object,
    default: {
      header: {
        background: "",
        fontSize: "",
      },

      body: {
        background: "white",
        color: "",
        fontSize: "",
      },
      section: {
        background: "",
        color: "",
        fontSize: "",
      },
    },
  },
  userID: Schema.Types.ObjectId,
});

module.exports = model("Style", styleSchema);
