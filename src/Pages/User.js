import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";

const GET_USERS = gql`
  query {
    user {
      _id
      firstName
      lastName
      pets {
        name
      }
      phoneNumber
    }
  }
`;

const User = () => {
  const { loading, error, data, startPolling } = useQuery(GET_USERS);

  useEffect(() => {
    startPolling(5000);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <div>
      <p style={{ fontSize: "large", fontWeight: "bold" }}>User</p>
      {
        <ul>
          {data.user.map(({ _id, firstName, lastName, phoneNumber, pets }) => (
            <li key={_id}>
              {firstName} {lastName} {phoneNumber}
              {pets.length > 0 && (
                <ul>
                  {pets.map(({ name }) => (
                    <li key={`${_id}-${name}`}>{name}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default User;
