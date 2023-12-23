import mongoose from 'mongoose';
import Order from '@/models/order';


const deliverySchema = mongoose.Schema(
    {
        desc: {type: String},
        photos: {type: [String]},
        videos: {type: [String]},
        docs: {type: [String]},
        order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    },
    {
        timestamps: true,
    }
)
  
  let Delivery;
  try {
    Delivery = mongoose.model('Delivery');
  } catch (e) {
    Delivery = mongoose.model('Delivery', deliverySchema);
  }
  
  module.exports = Delivery;
  