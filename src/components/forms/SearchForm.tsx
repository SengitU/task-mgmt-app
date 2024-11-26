import { useEffect, useState } from "react";

import { useDebounce } from "../../hooks/useDebounce";

const SearchForm = ({
  onCriteriaChange,
}: {
  onCriteriaChange: (newSearch: Record<string, string>) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dueAt, setDueAt] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    onCriteriaChange({
      ...(debouncedSearchTerm ? { searchTerm: debouncedSearchTerm } : {}),
      ...(dueAt ? { dueAt } : {}),
    });
  }, [debouncedSearchTerm, dueAt, onCriteriaChange]);

  return (
    <div className="space-y-4 p-2 w-full max-w-lg">
      <label
        htmlFor="free-text"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        <input
          className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600"
          type="text"
          name="free-text"
          placeholder="Search for task content"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </label>
      <div
        onChange={(event) =>
          setDueAt((event.target as unknown as Record<string, string>).value)
        }
        className="flex justify-between"
      >
        <div className="flex items-center px-2 border border-gray-200 rounded">
          <input
            id="due-today"
            type="radio"
            value="due-today"
            name="due-at"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
          />
          <label
            htmlFor="due-today"
            className="w-full py-4 px-2 text-sm font-medium text-gray-900"
          >
            Due Today
          </label>
        </div>
        <div className="flex items-center px-3 border border-gray-200 rounded">
          <input
            id="due-this-week"
            type="radio"
            value="due-this-week"
            name="due-at"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
          />
          <label
            htmlFor="due-this-week"
            className="w-full py-4 px-2 text-sm font-medium text-gray-900"
          >
            Due This Week
          </label>
        </div>
        <div className="flex items-center px-3 border border-gray-200 rounded">
          <input
            id="overdue"
            type="radio"
            value="overdue"
            name="due-at"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
          />
          <label
            htmlFor="overdue"
            className="w-full py-4 px-2 text-sm font-medium text-gray-900"
          >
            Overdue
          </label>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
