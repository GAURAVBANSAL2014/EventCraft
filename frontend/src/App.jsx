import React, { useState, useEffect } from 'react';
import EventListPage from './pages/EventListPage';
import HomePage from './pages/HomePage';
import Account from './pages/Account';
import EventDetailPage from './pages/EventDetailPage';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import Contact from './pages/Contact';
import Payment from './pages/Payment';
import { Routes, Route, useNavigate } from 'react-router-dom';


function App() {

  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUserData(userData);
    navigate('/home');
  }

  return (

    <div>
      <Routes>
      <Route path="/" element={<Account onLogin={handleLogin} />} />
        <Route path="/home" element={<HomePage userData={userData}/>} />
        <Route path="/events" element={<EventListPage />} />
        <Route path="/details" element={<EventDetailPage userData={userData}/>} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<RefundPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>

  );
}

export default App;
