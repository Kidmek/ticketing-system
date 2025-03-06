import { useEffect, useState } from "react";
import TicketList from "../components/organisms/TicketList";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import axiosInstance from "../api/axiosInstance";
import PageWrapper from "../components/organisms/PageWrapper";

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Closed";
  user: { username: string };
}

const AdminDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/api/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <PageWrapper header="Admin Dashboard">
      <div className="px-6 max-w-4xl flex-1 overflow-y-auto">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <TicketList
            tickets={tickets}
            isAdmin={true}
            fetchTickets={fetchTickets}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default AdminDashboard;
