import axios from "axios";
import Payment from "../models/khaltiModel.js";

export const addKhalti = async (req, res) => {
    const { paymentMethod, paymentStatus, pidx, orderId, totalAmount } = req.body;

    if (!paymentMethod) {
        return res.status(400).json({ message: "Please provide the payment method" });
    }

    try {
        // Create payment record
        const payment = await Payment.create({ paymentMethod, paymentStatus, pidx });

        if (paymentMethod === "khalti") {
            // Khalti integration
            const data = {
                return_url: "http://localhost:5173/success/", // Replace with your frontend success URL
                purchase_order_id: orderId, // Pass the order ID
                amount: totalAmount * 100, // Amount in paisa
                website_url: "http://localhost:5173/", // Your website URL
                purchase_order_name: "orderName_" + orderId, // Custom order name
            };

            // Send request to Khalti's payment initiation API
            const response = await axios.post(
                "https://a.khalti.com/api/v2/epayment/initiate/",
                data,
                {
                    headers: {
                        Authorization: "Key c8635732e06a45e0a3b251ac44326e14", // Replace with your Khalti secret key
                    },
                }
            );

            const khaltiResponse = response.data;

            // Update the payment record with the `pidx` from Khalti's response
            payment.pidx = khaltiResponse.pidx;
            await payment.save();

            // Log and return the payment URL
            console.log("Khalti Payment URL:", khaltiResponse.payment_url);
            return res.status(200).json({
                message: "Payment placed successfully",
                url: khaltiResponse.payment_url,
                data: khaltiResponse,
            });
        } else {
            return res.status(400).json({ message: "Invalid payment method" });
        }
    } catch (error) {
        console.error("Error processing payment:", error);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
