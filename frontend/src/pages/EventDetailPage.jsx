import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../ApiBaseURL';
import Cookies from "js-cookie";

const EventDetailPage = ({ userData }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const event = location.state?.event;

    console.log(event);

    const [isEditing, setIsEditing] = useState(false);
    const [editedEvent, setEditedEvent] = useState({ ...event });
    const [selectedImage, setSelectedImage] = useState(event.images[0]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleInputChange = (field, value) => {
        setEditedEvent((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleImageDelete = () => {
        const updatedImages = editedEvent.images.filter((img) => img !== selectedImage);
        setEditedEvent((prev) => ({
            ...prev,
            images: updatedImages,
        }));
        if (updatedImages.length > 0) setSelectedImage(updatedImages[0]);
    };

    const handleAddImage = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setEditedEvent((prev) => ({
                ...prev,
                images: [...prev.images, reader.result],
            }));
        };

        reader.readAsDataURL(file);
    };

    const handleSaveEdit = async () => {

        console.log(editedEvent);
        try {
            const response = await fetch(`${API_BASE_URL}events/${event._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
                body: JSON.stringify(editedEvent),
                credentials: 'include',
            });

            if (response.ok) {
                const updatedEvent = await response.json();
                setIsEditing(false);
                console.log('Event updated:', updatedEvent);
            } else {
                console.error('Failed to update event');
            }
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedEvent({ ...event });
    };

    const handleDeleteEvent = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}events/${event._id}`, {
                headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Event deleted successfully');
                alert('Event deleted successfully');
                navigate('/home');
            } else {
                console.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const renderImageGrid = () => {
        const rows = [];
        const imagesPerRow = 5;
        for (let i = 0; i < editedEvent.images.length; i += imagesPerRow) {
            rows.push(editedEvent.images.slice(i, i + imagesPerRow));
        }
        return rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2 mb-2">
                {row.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Event Image ${index + 1}`}
                        className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedImage(image)}
                    />
                ))}
            </div>
        ));
    };

    return (
        <div className="bg-gray-100 min-h-screen text-white">
            <Navbar />
            <div className="p-10 flex flex-col lg:flex-row gap-5">
                <div className="flex-1">
                    <div className="relative mb-4">
                        <img
                            src={selectedImage}
                            alt="Selected Event"
                            className={`w-full max-w-lg mx-auto rounded-lg shadow-lg ${isEditing ? 'opacity-75' : ''
                                }`}
                        />
                        {isEditing && (
                            <button
                                className="absolute top-0 right-10 text-2xl rounded-full hover:scale-110"
                                onClick={handleImageDelete}
                            >
                                ❎
                            </button>
                        )}
                    </div>
                    {renderImageGrid()}
                    {isEditing && (
                        <div className="mt-4 text-center">
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg inline-block"
                            >
                                + Add Image
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAddImage}
                            />
                        </div>
                    )}
                </div>

                <div className="flex-1 bg-gray-900 p-6 rounded-lg shadow-lg">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={editedEvent.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="text-4xl font-bold mb-4 bg-gray-800 text-white p-2 rounded w-full"
                            />
                            <p className="text-lg text-gray-300 mb-6">Organised by: {editedEvent.organizerId.email}</p>
                            <textarea
                                value={editedEvent.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="text-lg text-gray-300 mb-6 bg-gray-800 text-white p-2 rounded w-full"
                                rows={4}
                            />
                        </>
                    ) : (
                        <>
                            <h1 className="text-4xl font-bold mb-4">{editedEvent.name}</h1>
                            <p className="text-lg text-gray-300 mb-6">Organised by: {editedEvent.organizerId.email}</p>
                            <p className="text-lg text-gray-300 mb-6">{editedEvent.description}</p>
                        </>
                    )}

                    <hr className="border-gray-700 mb-6" />

                    <div className="space-y-4 text-lg">
                        {['category', 'location', 'date', 'time'].map(
                            (field, index) => (
                                <p className="flex items-center" key={index}>
                                    <span className="mr-2">🔹</span>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}:{' '}
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedEvent[field]}
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                            className="ml-2 bg-gray-800 text-white p-1 rounded"
                                        />
                                    ) : (
                                        editedEvent[field]
                                    )}
                                </p>
                            )
                        )}
                        <p className="text-2xl font-bold mt-4">
                            ₹
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editedEvent.price}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                    className="ml-2 bg-gray-800 text-white p-1 rounded"
                                />
                            ) : (
                                editedEvent.price.toLocaleString()
                            )}{' '}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-6 pb-10">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSaveEdit}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        {userData.email === editedEvent.organizerId.email || userData.email === 'admin@gmail.com' ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirmation(true)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Delete
                                </button>
                            </>
                        ) : null}

                    </>
                )}
            </div>

            {showDeleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
                        <p className="mb-4">Do you want to delete this event?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDeleteEvent}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirmation(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default EventDetailPage;