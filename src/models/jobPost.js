import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        title: {type: String},
        desc: {type: String},
        photos: {type: [String]},
        videos: {type: [String]},
        docs: {type: [String]},
        time: { type: String },
        budget: { type: String },
        isHired: { type: Boolean, default: false },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Profession" },
        skills: { type: [mongoose.Schema.Types.ObjectId], ref: "Skill" },
        biders: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
    },
    {
        timestamps: true,
    }
)
  
  let JobPost;
  try {
    // Try to retrieve the model if it's already registered
    JobPost = mongoose.model('JobPost');
  } catch (e) {
    // If the model is not registered, create it
    JobPost = mongoose.model('JobPost', postSchema);
  }
  
  module.exports = JobPost;
  