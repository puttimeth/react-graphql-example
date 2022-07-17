# React-GraphQL example project

![image](https://user-images.githubusercontent.com/32786620/179411439-f4c1bd59-764c-42f5-8b34-551a12a3ecbf.png)

## Description
This repo is the example for those who struggle to use React as frontend combined with GraphQL. This project design to work with [this repo as backend](https://github.com/puttimeth/nestjs-graphql-mongodb-example).

## Installation
```bash
yarn install
```

## Running
```bash
yarn start
```

## Structure
The application contains 3 pages, `User`, `Pet` and `Post`. Each represent the collection in the database.

## GraphQL
I chose to use [Apollo Client](https://www.apollographql.com/docs/react/) as medium to send GraphQL request. I recommend to learn from the official document because most of the content come from them.

The query is declared like this. 
```ts
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
```

If you want to apply some condition, you can edit it like this. This query will get only the user that `firstName` is `jelly`.
```ts
const GET_USERS = gql`
  query {
    user(GetUserDto: { firstName: "jelly" }) {
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
```

Then, call the request by using `useQuery` hooks.
```ts
const { loading, error, data, startPolling } = useQuery(GET_USERS);
```

I want to let them auto poll but this function seem to have a bug. I cannot declare the config like this. It won't work.
```ts
const { loading, error, data, startPolling } = useQuery(GET_USERS, { pollInterval: 5000 });
```

Instead I use `useEffect` hook.
```ts
useEffect(() => {
  startPolling(5000);
}, []);
```

When use `data`, don't forget to access its child according to the query name. In this case, I have to access `user` before use.
```ts
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
```
