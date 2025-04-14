// import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SilverCertificate from "./pages/silver/SilverCertificate";
import GoldCertificate from "./pages/gold/GoldCertificate";
import PlatinumCertificate from "./pages/platinum/PlatinumCertificate";
import Feedback from "./pages/Feedback";
import ThankYou from "./pages/Thankyou";
import WelcomePopup from "./pages/WelcomePopup";
import CustomerForm from "./pages/gold/CustomerForm";
import CustomerForm2 from "./pages/platinum/CustomerForm2";
import CustomerForm3 from "./pages/silver/CustomerForm3";
import SubmissionConfirmation from "./pages/gold/SubmissionConfirmation";

import SubmissionConfirmation2 from "./pages/platinum/SubmissionConfirmation2";
import SubmissionConfirmation3 from "./pages/silver/SubmissionConfirmation3";
import TrackApplication from "./pages/gold/TrackApplication";

import TrackApplication2 from "./pages/platinum/TrackApplication2";
import TrackApplication3 from "./pages/silver/TrackApplication3";
import CheckStatus from "./pages/gold/TrackApplication";

import GoldPayment from "./pages/gold/GoldPayment";
import PlatinumPayment2 from "./pages/platinum/PlatinumPayment2";
import SilverPayment3 from "./pages/silver/SilverPayment3";

import PaymentSuccess from "./pages/gold/PaymentSuccess";
import PaymentSuccess2 from "./pages/platinum/PaymentSuccess2";

import ApplicationStatus from "./pages/gold/ApplicationStatus";
import ApplicationStatus2 from "./pages/platinum/ApplicationStatus2";
import CertificatesPage from "./pages/CertificatesPage";

import AttaquesPage from "./pages/AttaquesPage";
// import CartPage from "./pages/CartController";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/silver-certificate" element={<SilverCertificate />} />
      <Route path="/gold-certificate" element={<GoldCertificate />} />
      <Route path="/platinum-certificate" element={<PlatinumCertificate />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/thank-you" element={<ThankYou/>} />
      <Route path="/welcome-popup" element={<WelcomePopup/>} />
      <Route path="/customer-form" element={<CustomerForm/>} />
      <Route path="/customer-form2" element={<CustomerForm2/>} />
      <Route path="/customer-form3" element={<CustomerForm3/>} />
      <Route path="/submission-confirmation" element={<SubmissionConfirmation/>} />
      <Route path="/submission-confirmation2" element={<SubmissionConfirmation2/>} />
      <Route path="/submission-confirmation3" element={<SubmissionConfirmation3/>} />
      <Route path="/track-application" element={<TrackApplication/>} />
      <Route path="/track-application2" element={<TrackApplication2/>} />
      <Route path="/track-application3" element={<TrackApplication3/>} />
      <Route path="/check-status" element={<CheckStatus/>} />
      <Route path="/gold-payment" element={<GoldPayment/>} />
      <Route path="/platinum-payment2" element={<PlatinumPayment2/>} />
      <Route path="/silver-payment3" element={<SilverPayment3/>} />
      
      <Route path="/payment-success" element={<PaymentSuccess/>} />
      <Route path="/payment-success2" element={<PaymentSuccess2/>} />

      <Route path="/application-status" element={<ApplicationStatus/>} />
      <Route path="/application-status2" element={<ApplicationStatus2/>} />

      <Route path="/certificates-page" element={<CertificatesPage/>} />
     
      <Route path="/attaques-page" element={<AttaquesPage/>} />
    </Routes>
  );
}

export default App;
