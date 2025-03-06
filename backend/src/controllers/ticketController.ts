import { Request, Response } from "express";
import Ticket, { ITicket } from "../models/Ticket";

export const createTicket = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const userId = (req as any).user.id;
  try {
    const ticket = new Ticket({ title, description, user: userId });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: "Error creating ticket", error });
  }
};

export const getTickets = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const role = (req as any).user.role;
  try {
    let tickets;
    if (role === "admin") {
      tickets = await Ticket.find().populate("user", "username");
    } else {
      tickets = await Ticket.find({ user: userId });
    }
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: "Error updating ticket", error });
  }
};
