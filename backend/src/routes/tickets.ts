import express from "express";
import {
  createTicket,
  getTickets,
  updateTicket,
} from "../controllers/ticketController";
import { authenticate, authorizeAdmin } from "../middleware/auth";

const router = express.Router();

router.post("/", authenticate, createTicket);
router.get("/", authenticate, getTickets);
router.put("/:id", authenticate, authorizeAdmin, updateTicket);

export default router;
