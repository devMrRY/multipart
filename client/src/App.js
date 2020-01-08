import React, { Component } from "react";
import Axios from "axios";
class App extends Component {
  state = {};
  submit = async e => {
    e.preventDefault();
    const filedata = new FormData();
    // filedata.append("avatar", this.state.avatar);
    filedata.append("userdata", [this.state.name, "rahul@gmail.com"]);
    console.log(filedata);
    const res = await Axios.post("/profile", filedata, {
      "Content-Type": "multipart/form-data"
    });
    console.log(res.data);
  };
  render() {
    return (
      <div>
        <input
          type="file"
          onChange={e => this.setState({ avatar: e.target.files[0] })}
        />
        <input
          type="file"
          onChange={e => this.setState({ ...this.state, text: e.target.files[0] })}
        />
        <input
          onChange={e => this.setState({ ...this.state, name: e.target.value })}
        />
        <button onClick={e => this.submit(e)}>submit</button>
      </div>
    );
  }
}

export default App;
