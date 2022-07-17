import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";

const GET_PETS = gql`
  query {
    pet {
      _id
      name
    }
  }
`;

const Pet = () => {
  const { loading, error, data, startPolling } = useQuery(GET_PETS);

  useEffect(() => {
    startPolling(5000);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!: {error}</p>;
  return (
    <div>
      <p style={{ fontSize: "large", fontWeight: "bold" }}>Pet</p>
      {
        <ul>
          {data.pet.map(({ _id, name }) => (
            <li key={_id}>{name}</li>
          ))}
        </ul>
      }
    </div>
  );
};

export default Pet;
