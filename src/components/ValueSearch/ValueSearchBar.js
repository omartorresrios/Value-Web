import React from 'react';

class ValueSearchBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <form action="/search" acceptCharset="UTF-8" method="get">
        <input name="utf8" type="hidden" value="√" />
        <input
          onFocus={() => this.props.valueShowDropdown()}
          onBlur={() => this.props.valueHideDropdown()}
          value={this.props.term}
          onChange={(event) => {this.handleInputChange(event.target.value)}}
          placeholder="Escoge un valor"
          autoComplete="off"
          type="search"
          name="search[q]"
          id="search_q" />
      </form>
    );
  }

  handleInputChange(term) {
    this.props.onSearchTermChange(term);
  }
}
export default ValueSearchBar;
