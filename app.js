const express = require('express');
const schema = require('./schema.js') ;
const graphqlHTTP = require('express-graphql').graphqlHTTP ;

const app = express()

app.use('/graphql', graphqlHTTP(
    {
        schema: schema,
        graphiql: true,
    }
))

app.listen(3000, () => {
  console.log('App listening on port 3000')
})