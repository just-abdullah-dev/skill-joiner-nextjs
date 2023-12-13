import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import mongoose from 'mongoose';

const superAdminSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        avatar: {type: String, default: ''},
        username:{type: String, unique: true, required: true},
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        verified: {type: Boolean, default: false},
        otpCode: {type: Number, default: 0},
    },
    {
        timestamps: true,
    }
)

superAdmin.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await hash(this.password, 10);
    }
    next();
  });
  
  superAdmin.methods.generateJWT = async function () {
    return sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '15d' });
  };
  
  superAdmin.methods.comparePassword = async function (enteredPassword) {
    return compare(enteredPassword, this.password);
  };
  
  // Create the User model
  let SuperAdmin;
  try {
    // Try to retrieve the model if it's already registered
    SuperAdmin = mongoose.model('SuperAdmin');
  } catch (e) {
    // If the model is not registered, create it
    SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);
  }
  
  module.exports = SuperAdmin;
  