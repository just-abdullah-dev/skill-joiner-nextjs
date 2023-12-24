import mongoose from 'mongoose';

const pkgSchema = mongoose.Schema(
    {
        title: {type: String, required: true},
        desc: {type: String, required: true},
        price: {type: String, required: true},
        time: {type: String, required: true},
        service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    }
)
  
  let Package;
  try {
    Package = mongoose.model('Package');
  } catch (e) {
    Package = mongoose.model('Package', pkgSchema);
  }
  
  module.exports = Package;
  