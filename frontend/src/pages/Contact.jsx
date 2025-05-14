import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      
    const [formData, setFormData] = useState({
        category: '',
        name: '',
        email: '',
        mobile: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('We will reach out to you shortly! Thanks.')
        console.log('Form submitted:', formData);
    };

    return (
        <div className="bg-gray-100 min-h-screen text-black">
            <Navbar />
            <div className="max-w-5xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mb-6">How can we help you?</h1>
                <div className="grid md:grid-cols-2 gap-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded"
                        >
                            <option value="">Events / Account / Other</option>
                            <option value="events">Events</option>
                            <option value="account">Account</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full name *"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address *"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border rounded"
                        />
                        <input
                            type="tel"
                            name="mobile"
                            placeholder="Mobile number *"
                            required
                            value={formData.mobile}
                            onChange={handleChange}
                            className="w-full p-3 border rounded"
                        />
                        <textarea
                            name="message"
                            placeholder="Briefly describe your issue here *"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full p-3 border rounded"
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-gray-600 text-white px-6 py-3 rounded disabled:opacity-50"
                            disabled={!formData.name || !formData.email || !formData.mobile || !formData.message}
                        >
                            Submit
                        </button>
                    </form>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Issue with your booking?</h2>
                        <p>
                            You can also reach out to us via email at{' '}
                            <a href="mailto:gbgauravbansal007@gmail.com" className="text-blue-600 underline">
                                gbgauravbansal007@gmail.com
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;