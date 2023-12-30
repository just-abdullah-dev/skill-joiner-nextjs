import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
    {
        desc: {type: String, required: true},
        reviewBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reviewTo:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
        order:{ type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        rating: {type: Number, default: 0},
        parent: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Review",
          default: null,
        },
    },
    {
        timestamps: true,
    }
)
  
  let Review;
  try {
    Review = mongoose.model('Review');
  } catch (e) {
    Review = mongoose.model('Review', reviewSchema);
  }
  
  module.exports = Review;
  