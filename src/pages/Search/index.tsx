import {useParams} from "react-router-dom";

export const Search = () => {
  const {query} = useParams() as { query: string }
  return (
    <h1>{query}</h1>
  )
}
