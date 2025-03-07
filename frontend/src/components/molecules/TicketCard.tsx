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
    priority: string;
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
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">{ticket.title}</h3>
        <p className="text-gray-600 text-base">{ticket.description}</p>
        <div className="flex flex-wrap gap-2 items-center mt-2">
          <span
            className={`px-2 py-1 text-sm font-medium rounded-full ${
              ticket.status === "Open"
                ? "bg-green-100 text-green-700"
                : ticket.status === "In Progress"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {ticket.status}
          </span>
          <span
            className={`px-2 py-1 text-sm font-medium rounded-full ${
              ticket.priority === "Low"
                ? "bg-blue-100 text-blue-700"
                : ticket.priority === "Medium"
                ? "bg-purple-100 text-purple-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            Priority: {ticket.priority}
          </span>
          {isAdmin && ticket.user && (
            <span className="px-2 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full">
              User: {ticket.user.username}
            </span>
          )}
        </div>
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
