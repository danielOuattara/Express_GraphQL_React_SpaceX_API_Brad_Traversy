import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
//--------------------------------------

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

class Launches extends Component {
  displayLaunches = () => {
    console.log(this.props);
    let data = this.props.data;
    if (data.loading) {
      return <div>Loading Launches ...</div>;
    }
    if (data.error) {
      return <div> {data.error.message}</div>;
    }

    return data.launches.map((launch) => (
      <li key={launch.flight_number}>{launch.mission_name}</li>
    ));
  };
  render() {
    return (
      <div>
        {" "}
        <h1 className="display-4 my-3">Launches</h1>
        <ul id="">{this.displayLaunches()}</ul>
      </div>
    );
  }
}

export default graphql(LAUNCHES_QUERY)(Launches);
