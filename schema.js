const axios = require("axios");
const graphql = require("graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLID,
} = graphql;

//------------------------------------------------------------------------
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType },
  }),
});

//-----
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
  }),
});

//------------------------------------------------------------------------
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/launches", {
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
          })
          .then((response) => response.data);
      },
    },
    launch: {
      type: LaunchType,
      args: { flight_number: { type: GraphQLInt } },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
          })
          .then((response) => response.data);
      },
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/rockets", {
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
          })
          .then((response) => response.data);
      },
    },
    rocket: {
      type: RocketType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.id}`, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" },
          })
          .then((response) => response.data);
      },
    },
  },
});

//---------------------------------------------------------------------------
module.exports = new GraphQLSchema({
  query: RootQuery,
});
