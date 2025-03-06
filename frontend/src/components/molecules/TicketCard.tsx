import Button from "../atoms/Button";

interface TicketCardProps {
  ticket: {
    id: string;
    title: string;
    description: string;
    status: string;
    user?: { username: string };
  };
  isAdmin?: boolean;
  onUpdate?: (id: string, status: string) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  isAdmin,
  onUpdate,
}) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-4">
    <h3 className="text-lg font-semibold">{ticket.title}</h3>
    <p className="text-gray-600">{ticket.description}</p>
    <span className="text-sm text-blue-500">{ticket.status}</span>
    {isAdmin && ticket.user && (
      <p className="text-sm text-gray-500">User: {ticket.user.username}</p>
    )}
    {isAdmin && onUpdate && (
      <div className="mt-2 space-x-2">
        {ticket.status !== "Open" && (
          <Button
            onClick={() => onUpdate(ticket.id, "Open")}
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
          >
            Set Open
          </Button>
        )}
        {ticket.status !== "In Progress" && (
          <Button
            onClick={() => onUpdate(ticket.id, "In Progress")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
          >
            Set In Progress
          </Button>
        )}
        {ticket.status !== "Closed" && (
          <Button
            onClick={() => onUpdate(ticket.id, "Closed")}
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
          >
            Set Closed
          </Button>
        )}
      </div>
    )}
  </div>
);

export default TicketCard;
