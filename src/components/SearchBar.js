import React, { Component } from "react";
import SearchResults from "./SearchResults";
import axios from "axios";

const API_KEY = `${process.env.REACT_APP_IMAGE_SEARCH}`;
export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      searchResult: []
    };
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const searchValue = this.state.value;
    axios
      .get(
        `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&per_page=15&orientation=landscape&query=${searchValue}}`
      )
      .then(res => {
        this.setState({
          searchResult: res.data.results
        });
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="search-container">
          <input
            class="field-container"
            type="text"
            value={this.state.value}
            placeholder="Search Images..."
            onChange={this.handleChange}
          />

          <button className="btn-warning" type="submit">
            <i class="fa fa-search" />
          </button>
        </form>
        <SearchResults results={this.state.searchResult} />
      </div>
    );
  }
}
