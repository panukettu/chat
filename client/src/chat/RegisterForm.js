import React from "react";

export default class RegisterForm extends React.Component {
  state = {
    nickname: ""
  };

  handleChange = e => {
    this.setState({ nickname: e.target.value });
  };

  render() {
    const { setUser } = this.props;
    return (
      <React.Fragment>
        <input
          name="nickname"
          type="text"
          value={this.state.nickname}
          onChange={this.handleChange}
          placeholder="Nimimerkki"
        />
        <button
          type="button"
          onClick={() => {
            setUser(this.state.nickname);
          }}
        >
          join the fun
        </button>
      </React.Fragment>
    );
  }
}
