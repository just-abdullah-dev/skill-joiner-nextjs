import mongoose from 'mongoose';

const regNumSchema = mongoose.Schema(
    {
        name: {type: String, default:''},
        number: {type: String, required: true, unique: true},
    },
    {
        timestamps: true,
    }
)
  // Create the User model
  let RegNum;
  try {
    // Try to retrieve the model if it's already registered
    RegNum = mongoose.model('RegNum');
  } catch (e) {
    // If the model is not registered, create it
    RegNum = mongoose.model('RegNum', regNumSchema);
  }
  
  module.exports = RegNum;
  