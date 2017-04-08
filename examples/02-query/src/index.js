import Cyclop from 'cyclop-graph';
import { queryDoc, mutateDoc } from './documents';

console.log(queryDoc);
console.log(mutateDoc);


var client = Cyclop.ConnectionGraphql({
  url: "http://localhost:3000/graphql",
  headers: ""
});


client.query( queryDoc ).then()
client.mutate( mutateDoc ).then()


console.log(sum(1, 4))