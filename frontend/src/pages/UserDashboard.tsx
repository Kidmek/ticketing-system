import { useEffect, useState } from "react";
import NavigationBar from "../components/organisms/NavigationBar";
import TicketList from "../components/organisms/TicketList";
import FormField from "../components/molecules/FormField";
import Button from "../components/atoms/Button";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import ErrorText from "../components/atoms/ErrorText";
import axiosInstance from "../api/axiosInstance";

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Closed";
}

const UserDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [formError, setFormError] = useState("");

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

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          User Dashboard
        </h1>
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
        {isLoading ? <LoadingSpinner /> : <TicketList tickets={tickets} />}
      </div>
    </div>
  );
};

export default UserDashboard;
