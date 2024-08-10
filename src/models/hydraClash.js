const mongoose = require("mongoose");
const { Schema } = mongoose;

const opponentSchema = new Schema(
  {
    clanName: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    keysPlayed: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const hydraClashSchema = new Schema(
  {
    startDate: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    endDate: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    opponents: {
      type: [opponentSchema],
      required: true,
      validate: {
        validator: function (value) {
          return value.length === 5;
        },
        message: "A team must have exactly 5 opponents",
      },
    },
  },
  { timestamps: true }
);

const HydraClash = mongoose.model("HydraClash", hydraClashSchema);


module.exports = HydraClash;
