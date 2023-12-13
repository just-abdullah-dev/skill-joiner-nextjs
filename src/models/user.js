import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        avatar: {type: String, default: ''},
        username:{type: String, unique: true, required: true},
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        profession: {type: String, default: ''},
        student: {type: Boolean, default: false},
        country: {type: String, default: ''},
        languages: {type: [String]},
        about: {type: String, default:''},
        bio: {type: String, default: ''},
        verified: {type: Boolean, default: false},
        otpCode: {type: Number, default: 0},
        skills: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
        education: { type: mongoose.Schema.Types.ObjectId, ref: "Education" },
    },
    {
        timestamps: true,
    }
)

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await hash(this.password, 10);
    }
    next();
  });
  
  userSchema.methods.generateJWT = async function () {
    return sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '15d' });
  };
  
  userSchema.methods.comparePassword = async function (enteredPassword) {
    return compare(enteredPassword, this.password);
  };
  
  // Create the User model
  let User;
  try {
    // Try to retrieve the model if it's already registered
    User = mongoose.model('User');
  } catch (e) {
    // If the model is not registered, create it
    User = mongoose.model('User', userSchema);
  }
  
  module.exports = User;
  