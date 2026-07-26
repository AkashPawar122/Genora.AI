import { PLANS } from "../config/plan.js";
import razorpay from "../config/razorpay.js";

export const billing = async (req, res) => {
  try {
    const { planType } = req.body;
    const userId = req.user._id;

    const plan = PLANS[planType];

    if (!plan || plan.price === 0) {
      return res.status(400).json({
        message: "Invalid paid plan",
      });
    }

    const options = {
      amount: plan.price * 100, // Razorpay amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,

      notes: {
        userId: userId.toString(),
        credits: plan.credits.toString(),
        plan: plan.plan,
      },
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,

      orderId: order.id,

      amount: order.amount,

      currency: order.currency,

      key: process.env.RAZORPAY_KEY_ID,

      plan: plan.plan,

      credits: plan.credits,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};