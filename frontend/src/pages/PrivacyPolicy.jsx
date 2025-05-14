import React, {useEffect} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    return (
        <div className="bg-gray-100 min-h-screen text-white">
            <Navbar />
            <div className="p-6 max-w-4xl mx-auto text-gray-800">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p className="mb-4">
                    At EventCraft, we value your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
                    <br/><br/>
                    Please read this policy carefully to understand EventCraft's policies and practices regarding your information and how EventCraft will treat it. By accessing or using its Services and/or registering for an account with EventCraft, you agree to this privacy policy and you are consenting to EventCraft's collection, use, disclosure, retention, and protection of your personal information as described here. If you do not provide the information EventCraft requires, EventCraft may not be able to provide all of its Services to you.
                </p>

                <h2 className="text-xl font-bold mt-4 mb-4">Information We Collect</h2>
                <ul className="list-disc pl-6 mb-4">
                    <li>Name, email, and contact details during sign-up</li>
                    <li>Payment details for event bookings</li>
                    <li>Usage data to improve platform functionality</li>
                </ul>

                <h2 className="text-xl font-bold mt-4 mb-4">How We Use Your Information</h2>
                <ul className="list-disc pl-6 mb-4">
                    <li>To process event bookings and payments</li>
                    <li>To send updates or confirmations</li>
                    <li>To improve our platform and services</li>
                </ul>

                <h2 className="text-xl font-bold mt-4 mb-4">Data Protection</h2>
                <p className="mb-4">
                    We use industry-standard encryption and security practices to protect your data. We do not sell or share your personal information with third parties.
                </p>

                <h2 className="text-xl font-bold mt-4 mb-4">Contact Us</h2>
                <p>
                    For any questions or concerns, please contact us at <a href="mailto:gbgauravbansal007@gmail.com" className="text-blue-600">gbgauravbansal007@gmail.com</a>.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;