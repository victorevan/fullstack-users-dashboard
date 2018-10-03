import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';

import { Card, Form } from 'semantic-ui-react';
import to from 'to-case';

import { saveUser } from '../../utils/api';

class AddUser extends Component {
  static propTypes = {
    textInputs: PropTypes.arrayOf(PropTypes.string),
    radioInputs: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
    })),
  }

  static defaultProps = {
    textInputs: ['name', 'role', 'location'],
    radioInputs: [{
      name: 'type',
      options: ['Candidate', 'Employee'],
    }, {
      name: 'surveyStatus',
      options: ['Pending', 'Scheduled', 'Completed'],
    }],
  }

  state = {
    name: '',
    role: '',
    location: '',
    type: 'Candidate',
    surveyStatus: 'Pending',
    isSubmitted: false,
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleRadioChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async () => {
    const {
      name, role, location, type, surveyStatus, isSubmitted,
    } = this.state;
    if (!isSubmitted) {
      const result = await saveUser({
        name,
        role,
        location,
        type,
        surveyStatus,
      });
      if (result.error || !result._id) {
        window.alert(result.error ? error.message : 'Something went wrong. Please try again.');
      } else {
        const { _id: id } = result;
        const { redirectTo } = this.props;
        window.alert('User created!');
        redirectTo(`/user/${id}`);
      }
    }
  }

  render() {
    const {
      state, handleInputChange, handleRadioChange, handleSubmit,
    } = this;
    const { textInputs, radioInputs } = this.props;

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Create a new user.</Card.Header>
          <Form>
            <Form.Group widths="equal">
              {textInputs.map(input => (
                <Form.Input
                  key={input}
                  fluid
                  name={input}
                  label={to.title(input)}
                  value={state[input]}
                  onChange={handleInputChange}
                />
              ))}
            </Form.Group>
            {radioInputs.map(radio => (
              <Form.Group key={radio.name} inline>
                {/* eslint-disable */}
                <label>{to.title(radio.name)}</label>
                {/* eslint-enable */}
                {radio.options.map(option => (
                  <Form.Radio
                    key={option}
                    name={radio.name}
                    label={option}
                    value={option}
                    checked={option === state[radio.name]}
                    onChange={handleRadioChange}
                  />
                ))}
              </Form.Group>
            ))}
            <Form.Button
              onClick={handleSubmit}
            >
              Submit
            </Form.Button>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  redirectTo: path => dispatch(push(path)),
});

export default connect(() => ({}), mapDispatchToProps)(AddUser);
