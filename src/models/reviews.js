import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
    {
        desc: {type: String, required: true},
        reviewBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reviewTo:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
        project:{ type: mongoose.Schema.Types.ObjectId, ref: "Project" },
        rating: {type: Number, default: 0},
    },
    {
        timestamps: true,
    }
)
  
  let Review;
  try {
    // Try to retrieve the model if it's already registered
    Review = mongoose.model('Review');
  } catch (e) {
    // If the model is not registered, create it
    Review = mongoose.model('Review', reviewSchema);
  }
  
  module.exports = Review;
  