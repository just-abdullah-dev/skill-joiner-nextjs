import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
    {
        title: {type: String, required: true},
        desc: {type: String, required: true},
        photos: {type: [String]},
        videos: {type: [String]},
        docs: {type: [String]},
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        start: { type: Date, required: true },
        end: { type: Date, required: true }, 
    },
    {
        timestamps: true,
    }
)
  
  let Project;
  try {
    Project = mongoose.model('Project');
  } catch (e) {
    Project = mongoose.model('Project', projectSchema);
  }
  
  module.exports = Project;
  