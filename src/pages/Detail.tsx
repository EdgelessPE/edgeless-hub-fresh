import {useParams} from "react-router-dom";

export const Detail = () => {
  console.log(useParams());
  return (
    <h1>Hello Detail</h1>
  );
};
