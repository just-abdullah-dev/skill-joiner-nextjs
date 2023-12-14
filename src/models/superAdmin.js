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
        isVerified: {type: Boolean, default: false},
        otpCode: {type: Number, default: 0},
    },
    {
        timestamps: true,
    }
)

superAdminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await hash(this.password, 10);
    }
    next();
  });
  
  superAdminSchema.methods.generateJWT = async function () {
    return sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  };
  
  superAdminSchema.methods.comparePassword = async function (enteredPassword) {
    return compare(enteredPassword, this.password);
  };
  
  let SuperAdmin;
  try {
    SuperAdmin = mongoose.model('SuperAdmin');
  } catch (e) {
    SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);
  }
  
  module.exports = SuperAdmin;
  