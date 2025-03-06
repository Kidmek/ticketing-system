import TicketCard from "../molecules/TicketCard";

interface TicketListProps {
  tickets: Array<{
    _id: string;
    title: string;
    description: string;
    status: string;
    user?: { username: string };
  }>;
  isAdmin?: boolean;
  fetchTickets?: () => void;
}

const TicketList: React.FC<TicketListProps> = ({
  tickets,
  isAdmin = false,
  fetchTickets,
}) => (
  <div className="space-y-4">
    {tickets?.length > 0 ? (
      tickets.map((ticket) => (
        <TicketCard
          fetchTickets={fetchTickets}
          key={ticket._id}
          ticket={{ ...ticket, id: ticket._id }}
          isAdmin={isAdmin}
        />
      ))
    ) : (
      <p className="text-center text-red-400">No tickets created</p>
    )}
  </div>
);

export default TicketList;
