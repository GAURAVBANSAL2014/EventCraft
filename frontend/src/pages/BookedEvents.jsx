import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../../ApiBaseURL';
import Cookies from "js-cookie";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookedEventCard from '../components/BookedEventCard';

const BookedEvents = () => {
    const [userEvents, setUserEvents] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}auth/current-user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.statusCode === 200) {
                    setUserEvents(result.data.bookedEvents || []);
                }
            } catch (error) {
                console.error("Failed to fetch booked events", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="min-h-screen max-w-5xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6">My Booked Events</h1>
                <div className="space-y-6">
                    {userEvents.length > 0 ? (
                        userEvents.map((event, idx) => (
                            <BookedEventCard key={idx} event={event} />
                        ))
                    ) : (
                        <p>No events booked yet.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BookedEvents;
