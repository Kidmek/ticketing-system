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
import Select from "../../components/atoms/Select";

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Closed";
  priority: "Low" | "Medium" | "High";
}

interface TicketResponse {
  tickets: Ticket[];
  totalPages: number;
  currentPage: number;
  totalTickets: number;
}

interface PaginationState {
  currentPage: number;
  totalPages: number;
}

interface FilterState {
  status: string;
  priority: string;
  search: string;
}

interface FormState {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
}

interface ErrorState {
  title: string;
  description: string;
  form: string;
}

const UserDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
  });
  const [filters, setFilters] = useState<FilterState>({
    status: "",
    priority: "",
    search: "",
  });
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    priority: "Medium",
  });
  const [errors, setErrors] = useState<ErrorState>({
    title: "",
    description: "",
    form: "",
  });

  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get<TicketResponse>("/api/tickets", {
        params: {
          page: pagination.currentPage,
          limit: 10,
          status: filters.status || undefined,
          priority: filters.priority || undefined,
          search: filters.search || undefined,
        },
      });
      setTickets(response.data.tickets);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.currentPage]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets, filters, pagination.currentPage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ title: "", description: "", form: "" });

    if (!form.title) {
      setErrors((prev) => ({ ...prev, title: "Title is required" }));
      return;
    }
    if (!form.description) {
      setErrors((prev) => ({
        ...prev,
        description: "Description is required",
      }));
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post("/api/tickets", {
        title: form.title,
        description: form.description,
        priority: form.priority,
      });
      setForm({ title: "", description: "", priority: "Medium" });
      setPagination((prev) => ({ ...prev, currentPage: 1 }));
      fetchTickets();
    } catch (error: any) {
      if (error.response) {
        setErrors((prev) => ({
          ...prev,
          form: error.response.data.message || "An error occurred",
        }));
      } else if (error.request) {
        setErrors((prev) => ({
          ...prev,
          form: "Network error, please try again",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          form: "An unexpected error occurred",
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper header="User Dashboard">
      <div className="px-6 max-w-4xl flex-1 overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <FormField
            label="Title"
            type="text"
            value={form.title}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, title: e.target.value }));
              setErrors((prev) => ({ ...prev, title: "" }));
            }}
            placeholder="Ticket title"
            error={errors.title}
          />
          <FormField
            label="Description"
            type="text"
            value={form.description}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, description: e.target.value }));
              setErrors((prev) => ({ ...prev, description: "" }));
            }}
            placeholder="Ticket description"
            error={errors.description}
          />
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Priority</label>
            <Select
              value={form.priority}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  priority: e.target.value as "Low" | "Medium" | "High",
                }))
              }
              options={[
                { value: "Low", label: "Low" },
                { value: "Medium", label: "Medium" },
                { value: "High", label: "High" },
              ]}
            />
          </div>
          <Button type="submit" className="w-full mt-4">
            Create Ticket
          </Button>
          {errors.form && <ErrorText message={errors.form} />}
        </form>
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
            <TicketList tickets={tickets} />
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

export default UserDashboard;
