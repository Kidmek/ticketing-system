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
  onUpdate?: (id: string, status: string) => void;
}

const TicketList: React.FC<TicketListProps> = ({
  tickets,
  isAdmin = false,
  onUpdate,
}) => (
  <div className="space-y-4">
    {tickets.map((ticket) => (
      <TicketCard
        key={ticket._id}
        ticket={{ ...ticket, id: ticket._id }}
        isAdmin={isAdmin}
        onUpdate={onUpdate}
      />
    ))}
  </div>
);

export default TicketList;
