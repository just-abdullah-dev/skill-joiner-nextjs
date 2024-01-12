import mongoose from 'mongoose';

const newsletterSchema = mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
    }
)


  let Newsletter;
  try {
    Newsletter = mongoose.model('Newsletter');
  } catch (e) {
    Newsletter = mongoose.model('Newsletter', newsletterSchema);
  }
  
  module.exports = Newsletter;
  