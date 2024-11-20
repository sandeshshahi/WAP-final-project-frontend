import { useState, useEffect, useRef } from 'react';

interface CustomSelectProps {
  options: string[];
  onSelect?: (value: string[]) => void; // Optional callback for when an option is selected
}

const CustomSelect = ({ options, onSelect }: CustomSelectProps) => {
  const [selected, setSelected] = useState<string>(options[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option.split(' - '));
    }
  };

  return (
    <div className="relative w-72" ref={dropdownRef}>
      {/* Selected item */}
      <div
        className="bg-indigo-600  text-white p-3 rounded cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex  justify-center items-center">
          <p className="text-lg font-semibold">Year</p>&nbsp; &nbsp; &nbsp;{' '}
          {selected}
        </span>
        <span
          className={`transform transition-transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          ▼
        </span>
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute w-full bg-white mt-2 rounded shadow-lg z-10 ">
          {options
            .filter((option) => option !== selected)
            .map((option, index) => (
              <div
                key={index}
                className={`p-3 text-gray-900  bg-white cursor-pointer hover:bg-indigo-500  hover:text-white ${
                  option === selected ? 'bg-indigo-600' : ''
                }`}
                onClick={() => handleSelect(option)}
              >
                {/* {selected} */}
                <span className="flex w-full  justify-start items-center px-10">
                  &nbsp; &nbsp; &nbsp; {option}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
