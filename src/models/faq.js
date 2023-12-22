import mongoose from 'mongoose';

const faqSchema = mongoose.Schema(
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)
  
  let FAQ;
  try {
    FAQ = mongoose.model('FAQ');
  } catch (e) {
    FAQ = mongoose.model('FAQ', faqSchema);
  }
  
  module.exports = FAQ;
  