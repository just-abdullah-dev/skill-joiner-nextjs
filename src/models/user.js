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
        student: {type: Boolean, default: false},
        about: {type: String, default:''},
        bio: {type: String, default: ''},
        isVerified: {type: Boolean, default: false},
        otpCode: {type: Number, default: 0},
        cv: {type: String, default: ''},
        country: {type: String, default: ''},
        languages: {type: [mongoose.Schema.Types.ObjectId], ref: "Language" },
        profession: {type: mongoose.Schema.Types.ObjectId, ref: "Profession" },
        reviews: {type: [mongoose.Schema.Types.ObjectId], ref: "Review" },
        skills: { type: [mongoose.Schema.Types.ObjectId], ref: "Skill" },
        education: { type: [mongoose.Schema.Types.ObjectId], ref: "Education" },
        services: { type: [mongoose.Schema.Types.ObjectId], ref: "Service" },
        portfolio: { type: [mongoose.Schema.Types.ObjectId], ref: "Project" },
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
  
  let User;
  try {
    User = mongoose.model('User');
  } catch (e) {
    User = mongoose.model('User', userSchema);
  }
  
  module.exports = User;
  