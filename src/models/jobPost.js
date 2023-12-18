import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        title: {type: String, required: true},
        desc: {type: String, required: true},
        photos: {type: [String]},
        videos: {type: [String]},
        docs: {type: [String]},
        time: { type: String, required: true },
        budget: { type: String, required: true },
        isHired: { type: Boolean, default: false },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Profession" },
        skills: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
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
  