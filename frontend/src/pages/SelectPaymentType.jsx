import React from 'react';
import { Link } from 'react-router-dom';

const SelectPaymentType = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold mb-4 text-center">Select Payment Method</h1>

      {/* Payment Methods */}
      <div className="space-y-4">
        {/* eSewa */}
        <div className="border rounded-md p-4 flex items-center justify-center space-x-4">
          <img
            src="https://cdn.esewa.com.np/ui/images/logos/esewa-icon-large.png"
            alt="eSewa"
            className="h-10 w-20 object-contain"
          />
          <p className="font-medium">eSewa</p>
        </div>

        {/* Khalti */}
        <Link to="khalti">
          <div className="border rounded-md p-4 flex items-center justify-center space-x-4 mt-2">
            <img
              src="https://play-lh.googleusercontent.com/Xh_OlrdkF1UnGCnMN__4z-yXffBAEl0eUDeVDPr4UthOERV4Fll9S-TozSfnlXDFzw"
              alt="Khalti"
              className="h-10 w-20 object-contain"
            />
            <p className="font-medium">Khalti</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SelectPaymentType;
