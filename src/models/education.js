import mongoose from 'mongoose';

const eduSchema = mongoose.Schema(
    {
      degree: { type: String, required: true },
      field: { type: String, required: true },
      institute: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      desc: { type: String },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true,
    }
)
  
  let Education;
  try {
    Education = mongoose.model('Education');
  } catch (e) {
    Education = mongoose.model('Education', eduSchema);
  }
  
  module.exports = Education;
  