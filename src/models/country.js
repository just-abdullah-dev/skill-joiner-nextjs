import mongoose from 'mongoose';

const countrySchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        slug: {type: String, required: true, unique: true},
        possibleNames: {type: String},
    },
    {
        timestamps: true,
    }
)
  
  let Country;
  try {
    Country = mongoose.model('Country');
  } catch (e) {
    Country = mongoose.model('Country', countrySchema);
  }
  
  module.exports = Country;
  