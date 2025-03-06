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
  const { page = 1, limit = 10, status, search } = req.query;
  const pageNumber = parseInt(page as string);
  const limitNumber = parseInt(limit as string);
  const skip = (pageNumber - 1) * limitNumber;

  try {
    let query: any = {};

    // Add status filter if provided
    if (
      status &&
      ["Open", "In Progress", "Closed"].includes(status as string)
    ) {
      query.status = status;
    }

    // Add search filter if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Add user filter for non-admin users
    if (role !== "admin") {
      query.user = userId;
    }

    // Get total count for pagination
    const total = await Ticket.countDocuments(query);

    // Get paginated tickets
    let tickets = await Ticket.find(query)
      .populate("user", "username")
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limitNumber);

    res.json({
      tickets,
      totalPages: Math.ceil(total / limitNumber),
      currentPage: pageNumber,
      totalTickets: total,
    });
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
