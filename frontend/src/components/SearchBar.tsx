// frontend/src/components/SearchBar.tsx

import React, { useState, FormEvent } from "react";

interface Props {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (term.trim().length === 0) return;
    onSearch(term.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Buscar en Wikipedia..."
        style={{
          width: "80%",
          padding: "0.5rem",
          fontSize: "1rem",
          borderRadius: "4px 0 0 4px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          border: "1px solid #ccc",
          borderLeft: "none",
          borderRadius: "0 4px 4px 0",
          backgroundColor: "#1976d2",
          color: "white",
          cursor: "pointer",
        }}
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
