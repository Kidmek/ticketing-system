import { useEffect, useState } from "react";
import NavigationBar from "../components/organisms/NavigationBar";
import TicketList from "../components/organisms/TicketList";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import axiosInstance from "../api/axiosInstance";

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

  const handleUpdate = async (id: string, status: string) => {
    setIsLoading(true);
    try {
      await axiosInstance.put(`/api/tickets/${id}`, { status });
      fetchTickets();
    } catch (error) {
      console.error("Failed to update ticket", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <TicketList
            tickets={tickets}
            isAdmin={true}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
