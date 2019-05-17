import React from 'react';
import ValueSearchListItem from './ValueSearchListItem';

class ValueSearchResultsList extends React.Component {

  render() {
    return (
      <ul id="autocomplete-items" onMouseEnter={() => {this.props.setPreventHideDropdown()}} onMouseLeave={() => {this.props.resetPreventHideDropdown()}}>
        <span className="dropdown-arrow-top"></span>
        <span className="dropdown-arrow-bottom"></span>
        <li>
          <a href={`/search?q=${this.props.term}`}>
            <i className="fa fa-search"></i> Search for <strong>{this.props.term}</strong>
          </a>
        </li>
        {this.renderValueHeading()}
        {this.renderValues()}
      </ul>
    );
  }

  renderValues() {
    let filteredValues = this.props.values.filter(
      (value) => {
        return value.name.toLowerCase().indexOf(
          this.props.term.toLowerCase()) !== -1;
      }
    );

    return filteredValues.map((value) => {
      return <ValueSearchListItem key={value.id} value={value} onSearchTermChange={(valueId, valueName) => {this.props.sendData(valueId, valueName)}}/>
    });
  }

  renderValueHeading() {
    if (this.props.values.length === 0) { return; }

    return <li className="autocomplete-heading"><h4>valores</h4></li>
  }
}

export default ValueSearchResultsList;
