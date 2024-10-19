import { useEffect, useRef, useState } from "react";

export interface DropdownOption {
  value: string;
  label: string;
}
interface DropdownProps {
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  placeholder?: string;
}

export const Dropdown = ({ options, onSelect, placeholder }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    onSelect(option); 
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-light border border-gray-300 rounded-lg px-4 py-2 cursor-pointer w-full flex justify-between items-center"
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span className="ml-2">&#9662;</span>
      </div>
      {isOpen && (
        <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto z-10">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-light"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
