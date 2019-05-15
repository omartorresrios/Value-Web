import React from 'react';

class CompanySearchBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <form action="/search" acceptCharset="UTF-8" method="get">
        <input name="utf8" type="hidden" value="√" />
        <input
          onFocus={() => this.props.showDropdown()}
          onBlur={() => this.props.hideDropdown()}
          value={this.props.term}
          onChange={(event) => {this.handleInputChange(event.target.value)}}
          placeholder="Busca una empresa"
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
export default CompanySearchBar;
