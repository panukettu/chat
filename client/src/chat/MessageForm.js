import React from "react";

import styled from "styled-components";

export default class SubmitForm extends React.Component {
  state = {
    message: ""
  };

  handleChange = e => this.setState({ message: e.target.value });

  handleKeyPress = e => {
    if (e.key === "Enter" && this.state.message.trim() !== "") {
      e.preventDefault();
      this.props.submitMessage(this.state.message);
      this.setState({ message: "" });
    }
  };

  render() {
    const { submitMessage } = this.props;
    return (
      <Submit>
        <FullWidthTextArea
          value={this.state.message}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          name="message"
        />
        <button
          type="button"
          onClick={() => {
            submitMessage(this.state.message);
            this.setState({ message: "" });
          }}
        >
          Send
        </button>
      </Submit>
    );
  }
}

const Submit = styled.footer`
  flex: 0.075;
  margin: 10px;
`;

const FullWidthTextArea = styled.textarea`
  width: 100%;
`;
