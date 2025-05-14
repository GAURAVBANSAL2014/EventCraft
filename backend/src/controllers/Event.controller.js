import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Event } from "../models/event.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import fs from "fs";


const handleImageUploads = async (files) => {
  const imageUrls = [];
  for (const file of files) {
    const response = await uploadOnCloudinary(file.path);
    if (response?.url) imageUrls.push(response.url);
  }
  return imageUrls;
};


const createEvent = asyncHandler(async (req, res) => {

  const { name, description, category, location, date, time, price } = req.body;

  if (!name || !category || !location || !date || !time || !price) {
    throw new ApiError(400, "All required fields must be provided.");
  }

  if (!["Admin", "Event Organizer"].includes(req.user.role)) {
    return res.status(403).json(new ApiResponse(403, {}, "You are not authorized to create events."));
  }
  
  const imageUrls = await handleImageUploads(req.files);

  const event = await Event.create({
    name,
    description,
    images: imageUrls,
    category,
    location,
    date,
    time,
    price,
    organizerId: req.user._id,
  });

  const savedEvent = await event.save();

  res.status(201).json(new ApiResponse(201, savedEvent, "Event created successfully."));
});


const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().populate("organizerId", "name email role");
  res.status(200).json(new ApiResponse(200, events, "Events fetched successfully."));
});


const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.eventId).populate("organizerId", "name email role");
  if (!event) {
    return res
    .status(404)
    .json(new ApiResponse(404, {}, "Event not found!"));
  }
  res.status(200).json(new ApiResponse(200, event, "Event fetched successfully."));
});


const updateEvent = asyncHandler(async (req, res) => {
  const { name, description, category, location, date, time, price } = req.body;

  const event = await Event.findById(req.params.eventId);
  if (!event) {
    return res
    .status(404)
    .json(new ApiResponse(404, {}, "Event not found!"));
  }

  if (req.user.role !== "Admin" && event.organizerId.toString() !== req.user._id.toString()) {
    return res
    .status(403)
    .json(new ApiResponse(403, {}, "You can only update your own events."));
  }

  let updatedImages = event.images;
  if (req.files && req.files.length > 0) {
    updatedImages = await handleImageUploads(req.files);
  }

  const updatedItem = await Event.findByIdAndUpdate(req.params.eventId, req.body, updatedImages, { new: true });

  res.status(200).json(new ApiResponse(200, updatedItem, "Event updated successfully."));
});


const deleteEvent = asyncHandler(async (req, res) => {

  const {eventId} = req.params;
  const event = await Event.findById(eventId);
  if (!event) {
    return res
    .status(404)
    .json(new ApiResponse(404, {}, "Event not found!"));
  }

  if (req.user.role !== "Admin" && event.organizerId.toString() !== req.user._id.toString()) {
    return res
    .status(403)
    .json(new ApiResponse(403, {}, "You can only delete your own events."));
  }

  await Event.findByIdAndDelete(eventId);

  res.status(200).json(new ApiResponse(200, {}, "Event deleted successfully."));
});

export { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };
