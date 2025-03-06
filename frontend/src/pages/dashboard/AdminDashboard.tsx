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
  user: { username: string };
}

interface TicketResponse {
  tickets: Ticket[];
  totalPages: number;
  currentPage: number;
  totalTickets: number;
}

const AdminDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get<TicketResponse>("/api/tickets", {
        params: {
          page: currentPage,
          limit: 10,
          status: status || undefined,
          search: search || undefined,
        },
      });
      setTickets(response.data.tickets);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, status, search]);

  useEffect(() => {
    fetchTickets();
  }, [status, search, currentPage, fetchTickets]);

  return (
    <PageWrapper header="Admin Dashboard">
      <div className="px-6 max-w-4xl flex-1 overflow-y-auto w-screen">
        <TicketFilters
          status={status}
          setStatus={setStatus}
          search={search}
          setSearch={setSearch}
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
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default AdminDashboard;
