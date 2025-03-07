import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  Ticket,
  TicketResponse,
  PaginationState,
  FilterState,
} from "../types/ticket";

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
  });
  const [filters, setFilters] = useState<FilterState>({
    status: "",
    priority: "",
    search: "",
  });

  console.log(filters);

  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get<TicketResponse>("/api/tickets", {
        params: {
          page: pagination.currentPage,
          limit: 10,
          status: filters.status || undefined,
          priority: filters.priority || undefined,
          search: filters.search || undefined,
        },
      });
      setTickets(response.data.tickets);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.currentPage, filters]);

  const updateTicket = useCallback(
    async (id: string, status: Ticket["status"]) => {
      setIsLoading(true);
      try {
        await axiosInstance.put(`/api/tickets/${id}`, { status });
        fetchTickets();
      } catch (error) {
        console.error("Failed to update ticket", error);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchTickets]
  );

  const createTicket = useCallback(
    async (data: Omit<Ticket, "_id" | "user">) => {
      setIsLoading(true);
      try {
        await axiosInstance.post("/api/tickets", data);
        setPagination((prev) => ({ ...prev, currentPage: 1 }));
        fetchTickets();
      } catch (error) {
        console.error("Failed to create ticket", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchTickets]
  );

  useEffect(() => {
    fetchTickets();
  }, [pagination.currentPage, filters, fetchTickets]);

  return {
    tickets,
    isLoading,
    pagination,
    filters,
    setPagination,
    setFilters,
    fetchTickets,
    updateTicket,
    createTicket,
  };
};
