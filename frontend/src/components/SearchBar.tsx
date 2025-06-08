import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container my-4"
      role="search"
      aria-label="Buscador de artículos"
    >
      <div className="input-group">
        <input
          type="search"
          className="form-control"
          placeholder="Buscar artículos..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-describedby="search-help"
        />
        <button className="btn btn-primary" type="submit">
          Buscar
        </button>
      </div>
      <div id="search-help" className="form-text text-center">
        Presiona Enter o haz clic en Buscar
      </div>
    </form>
  );
};

export default SearchBar;
