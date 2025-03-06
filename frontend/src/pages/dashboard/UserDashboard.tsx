import { useCallback, useEffect, useState } from "react";
import TicketList from "../../components/organisms/TicketList";
import FormField from "../../components/molecules/FormField";
import Button from "../../components/atoms/Button";
import LoadingSpinner from "../../components/atoms/LoadingSpinner";
import ErrorText from "../../components/atoms/ErrorText";
import axiosInstance from "../../api/axiosInstance";
import PageWrapper from "../../components/organisms/PageWrapper";
import TicketFilters from "../../components/molecules/TicketFilters";
import Pagination from "../../components/molecules/Pagination";

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Closed";
}

interface TicketResponse {
  tickets: Ticket[];
  totalPages: number;
  currentPage: number;
  totalTickets: number;
}

const UserDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [formError, setFormError] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTitleError("");
    setDescriptionError("");
    setFormError("");

    if (!title) {
      setTitleError("Title is required");
      return;
    }
    if (!description) {
      setDescriptionError("Description is required");
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post("/api/tickets", { title, description });
      setTitle("");
      setDescription("");
      setCurrentPage(1);
      fetchTickets();
    } catch (error: any) {
      if (error.response) {
        setFormError(error.response.data.message || "An error occurred");
      } else if (error.request) {
        setFormError("Network error, please try again");
      } else {
        setFormError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [status, search, currentPage, fetchTickets]);

  return (
    <PageWrapper header="User Dashboard">
      <div className="px-6 max-w-4xl flex-1 overflow-y-auto w-screen mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <FormField
            label="Title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError("");
            }}
            placeholder="Ticket title"
            error={titleError}
          />
          <FormField
            label="Description"
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionError("");
            }}
            placeholder="Ticket description"
            error={descriptionError}
          />
          <Button type="submit" className="w-full mt-4">
            Create Ticket
          </Button>
          {formError && <ErrorText message={formError} />}
        </form>
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
            <TicketList tickets={tickets} />
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

export default UserDashboard;
