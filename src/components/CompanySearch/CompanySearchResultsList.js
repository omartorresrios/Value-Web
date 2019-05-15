import React from 'react';
import CompanySearchListItem from './CompanySearchListItem';

class CompanySearchResultsList extends React.Component {

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
        {this.renderCompanyHeading()}
        {this.renderCompanies()}
      </ul>
    );
  }

  renderCompanies() {
    let filteredCompanies = this.props.companies.filter(
      (company) => {
        return company.name.toLowerCase().indexOf(
          this.props.term.toLowerCase()) !== -1;
      }
    );

    return filteredCompanies.map((company) => {
      return <CompanySearchListItem key={company.id} company={company} onSearchTermChange={(companyId, companyName) => {this.props.sendData(companyId, companyName)}}/>
    });
  }

  renderCompanyHeading() {
    if (this.props.companies.length === 0) { return; }

    return <li className="autocomplete-heading"><h4>Empresas</h4></li>
  }
}

export default CompanySearchResultsList;
