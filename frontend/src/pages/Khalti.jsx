import React, { useState } from "react";
import axios from "axios";

const KhaltiPayment = () => {
  const [orderId, setOrderId] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paymentUrl, setPaymentUrl] = useState(null);

  const handlePayment = async () => {
    if (!orderId || !totalAmount) {
      alert("Please provide valid order details.");
      return;
    }

    try {
      // Send request to backend to initiate Khalti payment
      const response = await axios.post("http://localhost:3000/api/khalti", {
        paymentMethod: "khalti",
        paymentStatus: "unpaid",
        pidx: null,
        orderId: orderId,
        totalAmount: Number(totalAmount),
      });

      const { data } = response;
      console.log(data)
      if (data.url) {
        setPaymentUrl(data.url);
        window.open(data.url, "_blank"); // Open Khalti payment page in a new tab
        alert("Payment initiated successfully! Redirecting to Khalti...");
      } else {
        alert("Failed to initiate payment.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Khalti Payment Integration</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>Order ID: </label>
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID"
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Total Amount: </label>
        <input
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          placeholder="Enter Total Amount"
        />
      </div>
      <button
        onClick={handlePayment}
        style={{
          padding: "10px",
          background: "#5cb85c",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Pay with Khalti
      </button>

      {paymentUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>Payment URL:</p>
          <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
            {paymentUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default KhaltiPayment;
