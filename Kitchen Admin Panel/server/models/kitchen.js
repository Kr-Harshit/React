const mongoose = require("mongoose");

const kitchenSchema = mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
  "kitchen name": String,
  Owner: String,
  address: String,
  Phone: Number,
  price:Number,
  email: String,
  FSSAI: Number,
  available: Boolean,
  rating: {
    type:Number,
    default:3
  },
  "prep time": Number,
  place: {
    "North Eastern": {
      type: Boolean,
      default: false,
    },
    Bengali: {
      type: Boolean,
      default: false,
    },
    Kashmiri: {
      type: Boolean,
      default: false,
    },
    "South Indian": {
      type: Boolean,
      default: false,
    },
    Punjabi: {
      type: Boolean,
      default: false,
    },
    Mahrastrian: {
      type: Boolean,
      default: false,
    },
    Bihari: {
      type: Boolean,
      default: false,
    },
    Gujarati: {
      type: Boolean,
      default: false,
    },
    Rajasthani: {
      type: Boolean,
      default: false,
    },
  },
  Order: {
    breakfast: {
      from: {
        type: String,
        default: "06:30",
      },
      to: {
        type: String,
        default: "08:30",
      },
    },
    lunch: {
      from: {
        type: String,
        default: "12:30",
      },
      to: {
        type: String,
        default: "02:30",
      },
    },
    hightea: {
      from: {
        type: String,
        default: "04:00",
      },
      to: {
        type: String,
        default: "05:00",
      },
    },
    dinner: {
      from: {
        type: String,
        default: "06:30",
      },
      to: {
        type: String,
        default: "08:30",
      },
    },
  },
});

module.exports = mongoose.model("Kitchen", kitchenSchema);

