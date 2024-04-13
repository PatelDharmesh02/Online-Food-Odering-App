import { Component } from "react";
import { Link } from "react-router-dom";

class ProfileClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <div>
        <h1>This is the Class based Profile Component</h1>
        <h2>Count: {this.state.count}</h2>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >Click</button>
        <Link to={"/"}>
        <button>Home</button>
        </Link>
      </div>
    );
  }
}

export default ProfileClass;
