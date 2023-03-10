const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const axios = require("axios");
const cors = require("cors");
const app = express();
//----------------------------------------

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
