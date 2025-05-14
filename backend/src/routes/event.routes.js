import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/Event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const eventRouter = Router();

eventRouter.route("/")
  .post(verifyJWT, authorizeRoles("Admin", "Event Organizer"), upload.array("images", 5), createEvent)
  .get(verifyJWT, authorizeRoles("Admin", "User", "Event Organizer"), getAllEvents);

eventRouter.route("/:eventId")
  .get(verifyJWT, authorizeRoles("Admin", "User", "Event Organizer"), getEventById)
  .put(verifyJWT, authorizeRoles("Admin", "Event Organizer"), upload.array("images", 5), updateEvent)
  .delete(verifyJWT, authorizeRoles("Admin", "Event Organizer"), deleteEvent);

export default eventRouter;
