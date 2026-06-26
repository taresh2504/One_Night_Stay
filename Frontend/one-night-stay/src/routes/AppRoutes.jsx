import { Routes, Route } from "react-router-dom";

import Layout from "../layouts/Layout";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import Properties from "../pages/Properties";
import Propertydetails from "../pages/Propertydetails";
import Booking from "../pages/Booking";
import Payment from "../pages/Payment";
import UserProfile from "../pages/UserProfile";

import Login from "../pages/Login";
import Register from "../pages/Register";
import SubscriptionPlans from "../pages/SubscriptionPlans";
import PaymentSuccess from "../pages/PaymentSuccess";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Pages with Navbar + Footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/propertydetails" element={<Propertydetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>

      {/* Pages without Navbar + Footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/subscription" element={<SubscriptionPlans />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />

    </Routes>
  );
};

export default AppRoutes;