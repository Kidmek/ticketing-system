import React from "react";
import Select from "../atoms/Select";
import FormField from "./FormField";

interface TicketFiltersProps {
  status: string;
  setStatus: (status: string) => void;
  search: string;
  setSearch: (search: string) => void;
}

const TicketFilters: React.FC<TicketFiltersProps> = ({
  status,
  setStatus,
  search,
  setSearch,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex gap-4">
      <div className="flex-1 flex flex-col">
        <label className="block mb-1 text-gray-700">Status</label>
        <div className="flex-1 flex items-start">
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
      </div>
      <div className="flex-1">
        <FormField
          label="Search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or description"
        />
      </div>
    </div>
  );
};

export default TicketFilters;
