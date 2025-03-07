export type TicketStatus = "Open" | "In Progress" | "Closed";
export type TicketPriority = "Low" | "Medium" | "High";

export interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  user?: { username: string };
}

export interface TicketResponse {
  tickets: Ticket[];
  totalPages: number;
  currentPage: number;
  totalTickets: number;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
}

export interface FilterState {
  status: string;
  priority: string;
  search: string;
}

export interface FormState {
  title: string;
  description: string;
  priority: TicketPriority;
}

export interface ErrorState {
  title: string;
  description: string;
  form: string;
}
