import mongoose from 'mongoose';

const reqSchema = mongoose.Schema(
    {
        title: {type: String, required: true},
        desc: {type: String, required: true},
        photos: {type: [String]},
        videos: {type: [String]},
        docs: {type: [String]},
        time: { type: String, required: true },
        budget: { type: String, required: true },
        isAccepted: { type: Boolean, default: false },
        isRejected: { type: Boolean, default: false },
        requestBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        requestTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
)
  
  let ServiceReq;
  try {
    ServiceReq = mongoose.model('ServiceReq');
  } catch (e) {
    ServiceReq = mongoose.model('ServiceReq', reqSchema);
  }
  
  module.exports = ServiceReq;
  