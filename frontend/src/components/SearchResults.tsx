import React from "react";
import { WikiSearchResult } from "../types";

interface Props {
  results: WikiSearchResult[];
  onSelect: (pageid: number) => void;
}

const SearchResults: React.FC<Props> = ({ results, onSelect }) => {
  if (results.length === 0) {
    return (
      <div className="container">
        <p className="text-center mt-4">No se encontraron resultados.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <ul className="list-group">
        {results.map(item => (
          <li
            key={item.pageid}
            onClick={() => onSelect(item.pageid)}
            className="list-group-item list-group-item-action"
            style={{ cursor: "pointer" }}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
