import { useState } from "react";
import Button from "../atoms/Button";
import axiosInstance from "../../api/axiosInstance";
import LoadingSpinner from "../atoms/LoadingSpinner";

interface TicketCardProps {
  ticket: {
    id: string;
    title: string;
    description: string;
    status: string;
    user?: { username: string };
  };
  fetchTickets?: () => void;
  isAdmin: boolean;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  isAdmin,
  fetchTickets,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (id: string, status: string) => {
    setIsLoading(true);
    try {
      await axiosInstance.put(`/api/tickets/${id}`, { status });
      if (fetchTickets) {
        fetchTickets();
      }
    } catch (error) {
      console.error("Failed to update ticket", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{ticket.title}</h3>
        <p className="text-gray-600">{ticket.description}</p>
        <span className="text-sm text-blue-500">{ticket.status}</span>
        {isAdmin && ticket.user && (
          <p className="text-sm text-gray-500">User: {ticket.user.username}</p>
        )}
      </div>

      {isAdmin && (
        <div>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex flex-wrap gap-2 justify-end">
              {ticket.status !== "Open" && (
                <Button
                  onClick={() => handleUpdate(ticket.id, "Open")}
                  className="bg-green-500 hover:bg-green-600 
                  text-white text-sm "
                >
                  Set Open
                </Button>
              )}
              {ticket.status !== "In Progress" && (
                <Button
                  onClick={() => handleUpdate(ticket.id, "In Progress")}
                  className="bg-yellow-500 hover:bg-yellow-600 
                  text-white  text-sm "
                >
                  Set In Progress
                </Button>
              )}
              {ticket.status !== "Closed" && (
                <Button
                  onClick={() => handleUpdate(ticket.id, "Closed")}
                  className="bg-red-500 hover:bg-red-600
                   text-white  text-sm "
                >
                  Set Closed
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketCard;
