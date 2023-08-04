import React, { FormEvent, useState, ChangeEvent } from "react";

interface QueryInputProps {
  onQuerySubmit: (query: string) => void;
}
const SearchBar = ({ onQuerySubmit }: QueryInputProps) => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); //pass city, country back to home component to start getting the data
    onQuerySubmit(query);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="searchField">
        <input
          className="input-field"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="City, Country                    (ex. Atlanta, Georgia)"
        />
      </form>
    </div>
  );
};

export default SearchBar;
