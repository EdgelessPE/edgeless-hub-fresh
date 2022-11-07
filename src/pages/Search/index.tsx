import { useParams } from "react-router-dom";
import React from "react";

export const Search = () => {
  const { query } = useParams() as { query: string };
  return <h1>{query}</h1>;
};
