import React, { useState } from "react";

const EnhancedPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [fullName, setFullName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();

    if (
      fullName &&
      billingAddress &&
      ((paymentMethod === "creditCard" && cardNumber && expirationDate && cvv) ||
        (paymentMethod === "paypal" && paypalEmail) ||
        (paymentMethod === "bankTransfer" && bankDetails))
    ) {
      setPaymentStatus("✅ Payment Successful! Thank you for purchasing the Silver Certificate.");
    } else {
      setPaymentStatus("❌ Error: Please fill in all required fields.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d1d1d1] via-[#b0b0b0] to-[#a1a1a1] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-11/12 max-w-lg border-[3px] border-[#b0b0b0]">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8c8c8c] to-[#a1a1a1] mb-8">
          Silver Certificate Payment
        </h1>

        <form onSubmit={handlePayment} className="space-y-6">
          {/* Nom complet */}
          <div>
            <label className="block text-[#8c8c8c] font-semibold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#b0b0b0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d1d1d1] placeholder-gray-400"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Adresse de facturation */}
          <div>
            <label className="block text-[#8c8c8c] font-semibold mb-2" htmlFor="billingAddress">
              Billing Address
            </label>
            <input
              type="text"
              id="billingAddress"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#b0b0b0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d1d1d1] placeholder-gray-400"
              placeholder="1234 Silver Avenue, Luxury City"
              required
            />
          </div>

          {/* Sélection du mode de paiement */}
          <div>
            <label className="block text-[#8c8c8c] font-semibold mb-2" htmlFor="paymentMethod">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#b0b0b0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d1d1d1] bg-white text-gray-700"
              required
            >
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bankTransfer">Bank Transfer</option>
            </select>
          </div>

          {/* Détails dynamiques basés sur le mode de paiement */}
          {paymentMethod === "creditCard" && (
            <>
              <div>
                <label className="block text-[#8c8c8c] font-semibold mb-2" htmlFor="cardNumber">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#b0b0b0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d1d1d1] placeholder-gray-400"
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[#8c8c8c] font-semibold mb-2" htmlFor="expirationDate">
                    Expiration Date (MM/YY)
                  </label>
                  <input
                    type="text"
                    id="expirationDate"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#b0b0b0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d1d1d1] placeholder-gray-400"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[#8c8c8c] font-semibold mb-2" htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    type="password"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#b0b0b0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d1d1d1] placeholder-gray-400"
                    placeholder="123"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {paymentMethod === "paypal" && (
            <div>
              <label className="block text-[#8c8c8c] font-semibold mb-2" htmlFor="paypalEmail">
                PayPal Email
              </label>
              <input
                type="email"
                id="paypalEmail"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#b0b0b0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d1d1d1] placeholder-gray-400"
                placeholder="yourname@example.com"
                required
              />
            </div>
          )}

          {paymentMethod === "bankTransfer" && (
            <div>
              <label className="block text-[#8c8c8c] font-semibold mb-2" htmlFor="bankDetails">
                Bank Transfer Details
              </label>
              <textarea
                id="bankDetails"
                value={bankDetails}
                onChange={(e) => setBankDetails(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#b0b0b0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d1d1d1] placeholder-gray-400"
                placeholder="Bank Name, IBAN, etc."
                rows={3}
                required
              />
            </div>
          )}

          {/* Bouton de paiement */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#b0b0b0] to-[#a1a1a1] text-white font-bold text-lg px-4 py-3 rounded-lg shadow-lg hover:from-[#a1a1a1] hover:to-[#8c8c8c] transition duration-300"
          >
            Confirm and Pay
          </button>
        </form>

        {/* Message de statut */}
        {paymentStatus && (
          <div
            className={`mt-6 p-4 text-center rounded-lg ${
              paymentStatus.includes("Error")
                ? "bg-red-100 text-red-800 border border-red-300"
                : "bg-green-100 text-green-800 border border-green-300"
            }`}
          >
            {paymentStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedPayment;
