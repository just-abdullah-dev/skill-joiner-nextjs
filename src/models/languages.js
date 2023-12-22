import mongoose from 'mongoose';

const langSchema = mongoose.Schema(
    {
        name: {type: String, required: true, unique:true},
        short: {type: String, required: true},
    },
    {
        timestamps: true,
    }
)
  
  let Language;
  try {
    Language = mongoose.model('Language');
  } catch (e) {
    Language = mongoose.model('Language', langSchema);
  }
  
  module.exports = Language;
  