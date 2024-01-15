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


  let Blacklist;
  try {
    Blacklist = mongoose.model('Blacklist');
  } catch (e) {
    Blacklist = mongoose.model('Blacklist', blacklistSchema);
  }
  
  module.exports = Blacklist;
  