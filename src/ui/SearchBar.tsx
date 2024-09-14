import { ChangeEvent, useState } from "react";
import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
}

export const SearchBar = ({
  placeholder = "Buscar...",
  onSearch,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full max-w-md">
      <span className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400">
        <CiSearch />
      </span>

      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-8 py-2 border border-gray-300 bg-light rounded-lg focus:outline-none focus:border-secondary-green focus:border-2"
      />
    </div>
  );
};
