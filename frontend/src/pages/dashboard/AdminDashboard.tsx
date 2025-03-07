import { useCallback, useEffect, useState } from "react";
import TicketList from "../../components/organisms/TicketList";
import LoadingSpinner from "../../components/atoms/LoadingSpinner";
import axiosInstance from "../../api/axiosInstance";
import PageWrapper from "../../components/organisms/PageWrapper";
import TicketFilters from "../../components/molecules/TicketFilters";
import Pagination from "../../components/molecules/Pagination";

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Closed";
  priority: "Low" | "Medium" | "High";
  user: { username: string };
}

interface TicketResponse {
  tickets: Ticket[];
  totalPages: number;
  currentPage: number;
  totalTickets: number;
}

interface PaginationState {
  currentPage: number;
  totalPages: number;
}

interface FilterState {
  status: string;
  priority: string;
  search: string;
}

const AdminDashboard: React.FC = () => {
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
  }, [filters, pagination.currentPage]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets, filters, pagination.currentPage]);

  return (
    <PageWrapper header="Admin Dashboard">
      <div className="px-6 max-w-4xl flex-1 overflow-y-auto">
        <TicketFilters
          status={filters.status}
          setStatus={(status) => setFilters((prev) => ({ ...prev, status }))}
          priority={filters.priority}
          setPriority={(priority) =>
            setFilters((prev) => ({ ...prev, priority }))
          }
          search={filters.search}
          setSearch={(search) => setFilters((prev) => ({ ...prev, search }))}
        />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <TicketList
              tickets={tickets}
              isAdmin={true}
              fetchTickets={fetchTickets}
            />
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(page) =>
                setPagination((prev) => ({ ...prev, currentPage: page }))
              }
            />
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default AdminDashboard;
