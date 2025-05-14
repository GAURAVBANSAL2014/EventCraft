import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API_BASE_URL from '../../ApiBaseURL';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';

const Payment = () => {
    const { state } = useLocation();
    const { event } = state || {};
    const { name: eventName, category, price } = event || {};

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCurrentUser = async () => {
        setLoading(true);
        try {

            fetch(`${API_BASE_URL}auth/current-user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
                credentials: 'include',
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("User fetched: ", data);
                    if (data.statusCode === 200) {
                        setUser(data.data);
                    }
                })
        } catch (error) {
            console.error('Error fetching current user:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [ticketCount, setTicketCount] = useState(1);
    const [address, setAddress] = useState('');
    const [agreed, setAgreed] = useState(false);

    const totalPrice = price * ticketCount;

    const handleIncrease = () => setTicketCount((prev) => prev + 1);
    const handleDecrease = () => {
        if (ticketCount > 1) setTicketCount((prev) => prev - 1);
    };

    const handlePayment = (e) => {

        e.preventDefault();

        fetch(`${API_BASE_URL}pay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
            body: JSON.stringify({ amount: totalPrice, email: user.email, name: user.name, contact: user.contact, address: address }),
            credentials: 'include',
        })
            .then(response => response.json())
            .then((data) => {

                console.log('Payment Response:', data);

                const options = {
                    key: 'rzp_test_2ZOB2omND8O3XS',
                    amount: data.data.amount * 100,
                    currency: data.data.currency,
                    name: 'Payment Gateway',
                    description: `Payment for ${eventName}`,
                    payment_id: data.data.paymentId,
                    handler: function (response) {
                        alert('Payment successful!');
                        console.log('Razorpay response:', response);
                    },
                    prefill: {
                        name: user.name,
                        email: user.email,
                        contact: user.contact
                    },
                    notes: {
                        address: address,
                    },
                    theme: {
                        color: '#3399cc',
                    },
                };

                console.log(options);

                const rzp = new window.Razorpay(options);
                rzp.open();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Payment initiation failed');
            });

    }

    if (!event) return <p>Event not found.</p>;

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />

            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <BallTriangle
                        height={100}
                        width={100}
                        radius={5}
                        color="#FF5733"
                        ariaLabel="ball-triangle-loading"
                        wrapperStyle={{}}
                        visible={true}
                    />
                </div>
            ) : (
                <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-8">
                    <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                    <div className="bg-gray-50 p-4 rounded mb-6">
                        <p className="text-lg font-semibold">{eventName}</p>
                        <p className="text-sm text-gray-600">{category}</p>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={handleDecrease}
                                    className="px-3 py-1 bg-gray-200 rounded text-lg"
                                >
                                    −
                                </button>
                                <span className="text-lg">{ticketCount} ticket{ticketCount > 1 ? 's' : ''}</span>
                                <button
                                    onClick={handleIncrease}
                                    className="px-3 py-1 bg-gray-200 rounded text-lg"
                                >
                                    +
                                </button>
                            </div>
                            <div className="text-right font-bold text-lg text-blue-600">
                                ₹{totalPrice}
                            </div>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mb-4">Billing Details</h2>
                    <form>
                        <div className="grid gap-4 mb-4">
                            <input
                                value={user.name}
                                disabled
                                className="p-2 border rounded bg-gray-100"
                            />
                            <input
                                value={user.contact}
                                disabled
                                className="p-2 border rounded bg-gray-100"
                            />
                            <input
                                value={user.email}
                                disabled
                                className="p-2 border rounded bg-gray-100"
                            />
                            <input
                                type="text"
                                placeholder="Full address*"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="p-2 border rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={() => setAgreed(!agreed)}
                                    className="mr-2"
                                />
                                <pre>I have read and accepted the </pre> {' '}
                                <Link to="/terms"><pre><a className="text-blue-500 underline cursor-pointer">terms and conditions</a></pre></Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={!agreed || !address}
                            className={`w-full py-2 rounded ${agreed && address
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            onClick={handlePayment}
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Payment;