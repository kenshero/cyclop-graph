import { CyclopConnection } from 'cyclop-graph'


export const client = new CyclopConnection({
  url: "http://localhost:3000/graphql",
  headers: ""
});

export const client2 = new CyclopConnection({
  url: "http://localhost:3005/graphqlUser",
  headers: ""
});
