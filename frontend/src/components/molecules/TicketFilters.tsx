import React from "react";
import Select from "../atoms/Select";
import FormField from "./FormField";

interface TicketFiltersProps {
  status: string;
  setStatus: (status: string) => void;
  priority: string;
  setPriority: (priority: string) => void;
  search: string;
  setSearch: (search: string) => void;
}

const TicketFilters: React.FC<TicketFiltersProps> = ({
  status,
  setStatus,
  priority,
  setPriority,
  search,
  setSearch,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="block mb-1 text-gray-700">Status</label>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: "", label: "All" },
              { value: "Open", label: "Open" },
              { value: "In Progress", label: "In Progress" },
              { value: "Closed", label: "Closed" },
            ]}
          />
        </div>
        <div className="flex flex-col">
          <label className="block mb-1 text-gray-700">Priority</label>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            options={[
              { value: "", label: "All" },
              { value: "Low", label: "Low" },
              { value: "Medium", label: "Medium" },
              { value: "High", label: "High" },
            ]}
          />
        </div>
        <div className="flex flex-col">
          <FormField
            label="Search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or description"
          />
        </div>
      </div>
    </div>
  );
};

export default TicketFilters;
