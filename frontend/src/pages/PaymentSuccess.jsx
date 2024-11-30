import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pidx = params.get("pidx");
    const transactionId = params.get("transaction_id");
    const status = params.get("status");

    if (status === "Completed") {
      verifyTransaction(pidx);
    } else {
      setError("Payment was not completed.");
    }
  }, []);

  const verifyTransaction = async (pidx) => {
    try {
      // Send the pidx to your backend for verification
      const response = await axios.post("http://localhost:3000/api/khalti/verify", {
        pidx: pidx,
      });

      if (response.data.message === "Payment verified successfully") {
        setPaymentStatus("Payment verified successfully");
      } else {
        setPaymentStatus("Payment verification failed");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setError("Something went wrong during payment verification.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Payment Verification</h2>
      {error ? (
        <div style={{ color: "red" }}>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <p>{paymentStatus ? paymentStatus : "Verifying payment..."}</p>
        </div>
      )}
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px",
          background: "#5cb85c",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
