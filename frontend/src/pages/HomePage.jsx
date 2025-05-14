import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import EventCarousel from '../components/EventCarousel';
import AddEventModal from '../components/AddEventModal';
import { FaFire, FaMusic, FaHeartbeat, FaFilm, FaChalkboardTeacher } from 'react-icons/fa';
import { IoBookmarksSharp, IoColorPalette } from "react-icons/io5";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BallTriangle } from 'react-loader-spinner';
import API_BASE_URL from '../../ApiBaseURL';
import Cookies from 'js-cookie';

function HomePage({ userData }) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);


    const [events, setEvents] = useState([]);


    const fetchEvents = async () => {
        setLoading(true);
        try {

            const response = await fetch(`${API_BASE_URL}events/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
                credentials: 'include',
            });
            const data = await response.json();
            console.log("Events fetched: ", data);
            if (data.statusCode === 200) {
                setEvents(data.data);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);


    const trendingEvents = useMemo(() => events, [events]);
    const featuredEvents = useMemo(
        () => events.filter(event => event.category === 'Workshop' || event.category === 'Health'),
        [events]
    );

    const { ref: navbarRef, inView: navbarInView } = useInView({ triggerOnce: true });
    const { ref: carouselRef, inView: carouselInView } = useInView({ triggerOnce: true });
    const { ref: trendingRef, inView: trendingInView } = useInView({ triggerOnce: true });
    const { ref: genreRef, inView: genreInView } = useInView({ triggerOnce: true });
    const { ref: featuredRef, inView: featuredInView } = useInView({ triggerOnce: true });
    const { ref: footerRef, inView: footerInView } = useInView({ triggerOnce: true });

    const genres = [
        { name: 'Music', icon: <FaMusic className="text-purple-600 text-4xl" /> },
        { name: 'Workshop', icon: <FaChalkboardTeacher className="text-teal-600 text-4xl" /> },
        { name: 'Festival', icon: <IoColorPalette className="text-orange-600 text-4xl" /> },
        { name: 'Health', icon: <FaHeartbeat className="text-red-600 text-4xl" /> },
        { name: 'Entertainment', icon: <FaFilm className="text-blue-600 text-4xl" /> },
    ];

    const navigate = useNavigate();

    const handleGenreClick = (genre) => {
        navigate('/events', { state: { genre } });
    };

    const handleViewDetails = (event) => {
        navigate('/details', { state: { event } });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleAddEvent = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalSubmit = async (formData, images) => {

        try {

            console.log(formData);
            console.log(images);
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('date', formData.date);
            formDataToSend.append('time', formData.time);
            formDataToSend.append('price', formData.price);

            images.forEach((file) => {
                formDataToSend.append('images', file);
            });

            await fetch(`${API_BASE_URL}events/`, {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                method: 'POST',
                body: formDataToSend,
                credentials: 'include',
            })
                .then(response => response.json())
                .then(data => {
                    if (data.statusCode === 201) {
                        alert('Event added successfully');
                        setIsModalOpen(false);
                        fetchEvents();
                    }
                    else {
                        console.error('Adding event failed:', data.message);
                        alert('Error Adding event');
                    }
                })
                .catch(error => console.error('Error adding event:', error));
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Error adding event');
        }

    };


    return (

        <div>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <BallTriangle
                        height={100}
                        width={100}
                        radius={5}
                        color="#4fa94d"
                        ariaLabel="ball-triangle-loading"
                        visible={true}
                        wrapperStyle={{}}
                    />
                </div>
            ) : (
                <div className="bg-gray-100 min-h-screen">
                    <motion.div
                        ref={navbarRef}
                        initial={{ opacity: 0, y: -50 }}
                        animate={navbarInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <Navbar />
                    </motion.div>

                    <motion.div
                        ref={carouselRef}
                        initial={{ opacity: 0, y: -50 }}
                        animate={carouselInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Carousel />
                    </motion.div>

                    <motion.div
                        ref={trendingRef}
                        initial={{ opacity: 0, y: -50 }}
                        animate={trendingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <EventCarousel
                            events={trendingEvents}
                            title={<div className='flex'><FaFire className="text-red-500 text-2xl mr-2 mt-1" /> Trending Events</div>}
                            handleViewDetails={handleViewDetails}
                            handleAddEvent={handleAddEvent}
                            userData={userData}
                        />
                    </motion.div>

                    <motion.div
                        ref={genreRef}
                        initial={{ opacity: 0, y: -50 }}
                        animate={genreInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="py-10"
                    >
                        <div className="flex items-center space-x-2 mb-8 ml-5">
                            <HiMiniSquares2X2 className="text-blue-500 text-2xl" />
                            <h2 className="text-2xl font-bold">Browse Events by Genre</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 px-8">
                            {genres.map((genre, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={genreInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    onClick={() => handleGenreClick(genre.name)}
                                    className="bg-white rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition-all"
                                >
                                    <div className="flex justify-center mb-4">{genre.icon}</div>
                                    <h3 className="text-md font-semibold text-gray-700">{genre.name}</h3>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        ref={featuredRef}
                        initial={{ opacity: 0, y: -50 }}
                        animate={featuredInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <EventCarousel
                            events={featuredEvents}
                            title={<div className='flex'><IoBookmarksSharp className="text-yellow-500 text-2xl mr-2 mt-1" /> Featured Events</div>}
                            handleViewDetails={handleViewDetails}
                            handleAddEvent={handleAddEvent}
                            userData={userData}
                        />
                    </motion.div>

                    <AddEventModal
                        isOpen={isModalOpen}
                        onClose={handleModalClose}
                        onSubmit={handleModalSubmit}
                    />

                    <motion.div
                        ref={footerRef}
                        initial={{ opacity: 0, y: -50 }}
                        animate={footerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <Footer />
                    </motion.div>
                </div>
            )}
        </div>

    );
}

export default HomePage;