import mongoose from 'mongoose';

const blacklistSchema = mongoose.Schema(
    {
        name: {type: String, default:''},
        email: {type: String, required: true, unique: true},
        student: {type: Boolean, default: false},
    },
    {
        timestamps: true,
    }
)
  // Create the User model
  let Blacklist;
  try {
    // Try to retrieve the model if it's already registered
    Blacklist = mongoose.model('Blacklist');
  } catch (e) {
    // If the model is not registered, create it
    Blacklist = mongoose.model('Blacklist', blacklistSchema);
  }
  
  module.exports = Blacklist;
  