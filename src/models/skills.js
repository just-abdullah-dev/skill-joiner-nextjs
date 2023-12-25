import mongoose from 'mongoose';

const skillSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        slug: {type: String, required: true, unique: true},
        possibleNames: {type: String},
    },
    {
        timestamps: true,
    }
)
  
  let Skill;
  try {
    // Try to retrieve the model if it's already registered
    Skill = mongoose.model('Skill');
  } catch (e) {
    // If the model is not registered, create it
    Skill = mongoose.model('Skill', skillSchema);
  }
  
  module.exports = Skill;
  