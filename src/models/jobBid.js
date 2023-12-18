import mongoose from 'mongoose';

const bidSchema = mongoose.Schema(
    {
        desc: {type: String, required: true},
        photos: {type: [String]},
        videos: {type: [String]},
        docs: {type: [String]},
        time: { type: String, required: true },
        budget: { type: String, required: true },
        isAccepted: { type: Boolean, default: false },
        jobPost: { type: mongoose.Schema.Types.ObjectId, ref: "JobPost" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
)
  
  let JobBid;
  try {
    JobBid = mongoose.model('JobBid');
  } catch (e) {
    JobBid = mongoose.model('JobBid', bidSchema);
  }
  
  module.exports = JobBid;
  