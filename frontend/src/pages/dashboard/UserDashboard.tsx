import { useState } from "react";
import TicketList from "../../components/organisms/TicketList";
import FormField from "../../components/molecules/FormField";
import Button from "../../components/atoms/Button";
import LoadingSpinner from "../../components/atoms/LoadingSpinner";
import ErrorText from "../../components/atoms/ErrorText";
import PageWrapper from "../../components/organisms/PageWrapper";
import TicketFilters from "../../components/molecules/TicketFilters";
import Pagination from "../../components/molecules/Pagination";
import Select from "../../components/atoms/Select";
import { useTickets } from "../../hooks/useTickets";
import { FormState, ErrorState, TicketPriority } from "../../types/ticket";

const UserDashboard: React.FC = () => {
  const {
    tickets,
    isLoading,
    pagination,
    filters,
    setPagination,
    setFilters,
    createTicket,
  } = useTickets();

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
    try {
      await createTicket({ ...form, status: "Open" });
      setForm({ title: "", description: "", priority: "Medium" });
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
                  priority: e.target.value as TicketPriority,
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
