import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    paymentMethod: {
      type: String,
      enum: ['khalti', 'esewa'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'unpaid'],
      default: 'unpaid',
    },
    pidx: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
