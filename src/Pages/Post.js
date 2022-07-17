import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";

const GET_POSTS = gql`
  query {
    post {
      _id
      title
      likes
      createdDate
    }
  }
`;

const Post = () => {
  const { loading, error, data, startPolling } = useQuery(GET_POSTS);

  useEffect(() => {
    startPolling(5000);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!: {error}</p>;
  return (
    <div>
      <p style={{ fontSize: "large", fontWeight: "bold" }}>Post</p>
      {
        <ul>
          {data.post.map(({ _id, title, likes, createdDate }) => (
            <li key={_id}>
              {title} {likes} {createdDate}
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default Post;
