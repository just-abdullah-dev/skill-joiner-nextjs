import mongoose from 'mongoose';

const serviceSchema = mongoose.Schema(
    {
        title: {type: String, required: true},
        slug: {type: String, default: '', unique: true},
        desc: {type: String, required: true},
        publish: {type: Boolean, default: false},
        photos: {type: [String]},
        videos: {type: [String]},
        docs: {type: [String]},
        profession: { type: mongoose.Schema.Types.ObjectId, ref: "Profession" },
        skills: { type: [mongoose.Schema.Types.ObjectId], ref: "Skill" },
        packages: { type: [mongoose.Schema.Types.ObjectId], ref: "Package" },
        reviews: { type: [mongoose.Schema.Types.ObjectId], ref: "Review" },
        orders: { type: [mongoose.Schema.Types.ObjectId], ref: "Order" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
)
  
  let Service;
  try {
    Service = mongoose.model('Service');
  } catch (e) {
    Service = mongoose.model('Service', serviceSchema);
  }
  
  module.exports = Service;
  