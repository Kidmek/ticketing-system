import TicketList from "../../components/organisms/TicketList";
import LoadingSpinner from "../../components/atoms/LoadingSpinner";
import PageWrapper from "../../components/organisms/PageWrapper";
import TicketFilters from "../../components/molecules/TicketFilters";
import Pagination from "../../components/molecules/Pagination";
import { useTickets } from "../../hooks/useTickets";

const AdminDashboard: React.FC = () => {
  const {
    tickets,
    isLoading,
    pagination,
    filters,
    setPagination,
    setFilters,
    fetchTickets,
  } = useTickets();

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
