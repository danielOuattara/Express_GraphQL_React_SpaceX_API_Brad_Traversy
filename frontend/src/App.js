import "./App.css";
import logo from "./spaceX-logo.jpeg";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://flyby-gateway.herokuapp.com/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <img
          src={logo}
          alt="SpaceX"
          style={{ maxwidth: 300, display: "block", margin: "auto" }}
        />
      </div>
    </ApolloProvider>
  );
}

export default App;
