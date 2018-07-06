import React from 'react';

export default class RegisterForm extends React.Component {
  state = {
    nickname: 'Esa'
  };

  handleChange = e => {
    this.setState({ nickname: e.target.value });
  };

  render() {
    const { setUser } = this.props;
    return (
      <form>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={this.state.nickname}
          onChange={this.handleChange}
          placeholder="Nimimerkki"
        />
        <button
          name="submit"
          type="button"
          onClick={() => {
            setUser(this.state.nickname);
            console.log('clicked');
          }}
        >
          join the fun
        </button>
      </form>
    );
  }
}
