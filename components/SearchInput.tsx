import { FC, useState } from "react";

type Props = {
  placeholder?: string;
  disable?: boolean;
  onSubmit: (value: string) => void;
};

const SearchInput: FC<Props> = ({ placeholder = "Search...", disable, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="form-control">
      <div className="input-group">
        <input
          type="text"
          placeholder={placeholder}
          className="input-bordered input"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button
          disabled={disable}
          className="btn-square btn"
          onClick={(event) => {
            if (disable) return;

            event.preventDefault();
            const sanitizedSearch = inputValue.trim();

            if (sanitizedSearch) {
              onSubmit(sanitizedSearch);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
