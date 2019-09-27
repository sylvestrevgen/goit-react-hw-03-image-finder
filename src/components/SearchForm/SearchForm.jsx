import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './searchForm.module.css';

export default class SearchForm extends Component {
  state = {
    searchValue: '',
  };

  handleInputChange = event => {
    this.setState({
      searchValue: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSearchSubmit(this.state.searchValue);
    this.setState({
      searchValue: '',
    });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <form className={styles.searchForm} onSubmit={this.handleSubmit}>
        <input
          type="text"
          className={styles.input}
          autoComplete="off"
          placeholder="Search images..."
          value={searchValue}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

SearchForm.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
};
