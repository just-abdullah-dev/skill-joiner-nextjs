import mongoose from 'mongoose';
import Delivery from '@/models/delivery';

const orderSchema = mongoose.Schema(
    {
        client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        serviceReq: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceReq" },
        jobPost: { type: mongoose.Schema.Types.ObjectId, ref: "JobPost" },
        service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        delivery: { type: mongoose.Schema.Types.ObjectId, ref: "Delivery" },
        isCompleted: {type: Boolean, default: false},
        isDelivered: {type: Boolean, default: false},
        isRevised: {type: Boolean, default: false},
        canceller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        isCancelled: {type: Boolean, default: false},
    },
    {
        timestamps: true,
    }
)
  
  let Order;
  try {
    Order = mongoose.model('Order');
  } catch (e) {
    Order = mongoose.model('Order', orderSchema);
  }
  
  module.exports = Order;
  