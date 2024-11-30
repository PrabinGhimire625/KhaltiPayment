import axios from "axios";
import Payment from "../models/khaltiModel.js";

//add khalti
export const addKhalti = async (req, res) => {
    const { paymentMethod, paymentStatus, pidx, orderId, totalAmount } = req.body;
    if (!paymentMethod) {
        return res.status(400).json({ message: "Please provide the payment method" });
    }
    try {
        const payment = await Payment.create({ paymentMethod, paymentStatus, pidx });

        if (paymentMethod === "khalti") {
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
                        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`, // Replace with your Khalti secret key
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


// Verify transaction pidx (without userId)
export const verifyTransaction = async (req, res) => {
    const { pidx } = req.body; // Only accept pidx in the body

    if (!pidx) {
        return res.status(400).json({
            message: 'Please provide pidx'
        });
    }

    try {
        // Call Khalti API to verify payment with pidx
        const response = await axios.post('https://a.khalti.com/api/v2/epayment/lookup/', { pidx }, {
            headers: { 'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}` }
        });

        const data = response.data;
        console.log('Khalti Response:', data); // Log the response for debugging
        console.log(data.status )
        if (data.status === 'Completed') {
            // Update the payment record based on pidx
            const payment = await Payment.findOneAndUpdate(
                { pidx: pidx }, // Find the payment by pidx
                { paymentStatus: 'paid' }, // Set the payment status to 'paid'
                { new: true } // Return the updated document
            );

            console.log('Payment found:', payment); // Log the payment object after update

            if (payment) {
                return res.status(200).json({ message: 'Payment verified successfully', payment });
            } else {
                return res.status(404).json({ message: 'Payment not found for the given pidx' });
            }
        } else {
            return res.status(200).json({ message: 'Payment not verified', status: data.status });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};
