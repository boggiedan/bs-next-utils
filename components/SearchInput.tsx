import { FC, useState } from "react";

type Props = {
  disable?: boolean;
  onSubmit: (value: string) => void;
};

const SearchInput: FC<Props> = ({ disable, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <form className="w-full">
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          placeholder="Search by name"
          required
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <button
          type="submit"
          disabled={disable}
          className="absolute bottom-2.5 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={(event) => {
            event.preventDefault();

            const sanitizedSearch = inputValue.trim();

            if (sanitizedSearch) {
              onSubmit(sanitizedSearch);
            }
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
