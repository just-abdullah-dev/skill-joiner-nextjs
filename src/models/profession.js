import mongoose from 'mongoose';

const professionSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        slug: {type: String, required: true, unique: true},
        possibleNames: {type: String},
    },
    {
        timestamps: true,
    }
)
  
  let Profession;
  try {
    Profession = mongoose.model('Profession');
  } catch (e) {
    Profession = mongoose.model('Profession', professionSchema);
  }
  
  module.exports = Profession;
  