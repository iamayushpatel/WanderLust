const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,

  reviews: [
    {
      type: Schema.Types.ObjectId, // Store Obj Id of Review in listingSchema
      ref: "Review",
    },
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  geometry: {
    type: {
      type: String, // 'Point' for 2D coordinate data (latitude, longitude)
      // Don't do `{ location: { type: String } }`
      enum: ["Point"],
      // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number], // Array of numbers, where [longitude, latitude]
      required: true,
    },
  },

  category: {
    type: String,
    enum: [
      "Rooms",
      "Iconic cities",
      "Mountains",
      "Castles",
      "Amazing pools",
      "Camping",
      "Farms",
      "Arctic",
      "Domes",
      "Boats",
    ],
    required: true,
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } }); // Deletes Review When Listing Delete
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
