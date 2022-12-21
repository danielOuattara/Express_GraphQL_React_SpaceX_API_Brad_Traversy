import React, { Component } from "react";

class componentName extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-9">
            <h4>Mission: {this.props.mission_name} </h4>
            <p>Date: {this.props.launch_date_local}</p>
          </div>
          <div className="col-md-3">
            <button className="btn btn-secondary"> Details</button>
          </div>
        </div>
      </div>
    );
  }
}

export default componentName;
