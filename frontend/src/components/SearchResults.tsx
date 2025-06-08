// frontend/src/components/SearchResults.tsx

import React from "react";
import { WikiSearchResult } from "../types";

interface Props {
  results: WikiSearchResult[];
  onSelect: (pageid: number) => void;
}

const SearchResults: React.FC<Props> = ({ results, onSelect }) => {
  if (results.length === 0) {
    return <p>No se encontraron resultados.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {results.map((item) => (
        <li
          key={item.pageid}
          onClick={() => onSelect(item.pageid)}
          style={{
            cursor: "pointer",
            padding: "0.5rem",
            borderBottom: "1px solid #eee",
          }}
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
