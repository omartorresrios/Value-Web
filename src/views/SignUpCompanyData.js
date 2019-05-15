import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import CompanySearchResultsList from '../components/CompanySearch/CompanySearchResultsList';
import CompanySearchBar from '../components/CompanySearch/CompanySearchBar';

class SignUpCompanyData extends React.Component {

  constructor(props) {
    super(props)
    this.state = { preventHideDropdown: false, showDropdown: false, term: '', companies: [], companyId: '', companyName: '' }
    this.hideDropdown = this.hideDropdown.bind(this);
    this.companySelected = this.companySelected.bind(this);
    this.getAllCompanies = this.getAllCompanies.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.setPreventHideDropdown = this.setPreventHideDropdown.bind(this);
    this.resetPreventHideDropdown = this.resetPreventHideDropdown.bind(this);
  }

  componentWillMount() {
    this.getAllCompanies();
  }

  getAllCompanies() {
    axios.get('http://localhost:3000/api/users/all_companies').then(response => {
      // If request is good...
      console.log("data: ", response.data);
      this.setState({ companies: response.data });
    })
    .catch((error) => {
      console.log('Cant get all companies data because: ' + error);
    });
  }

  setPreventHideDropdown() {
    this.setState({ preventHideDropdown: true });
  }

  resetPreventHideDropdown() {
    this.setState({ preventHideDropdown: false });
  }

  hideDropdown() {
    if (!this.state.preventHideDropdown) {
      this.setState({ showDropdown: false });
    }
  }

  showDropdown() {
    this.setState({ showDropdown: true });
  }

  companySelected(companyId, companyName) {
    this.setState({ companyId: companyId, companyName: companyName, showDropdown: false });
  }

  render() {
    return (
      <div>
        <h2>Completa estos últimos datos</h2>
        <CompanySearchBar
          showDropdown={this.showDropdown}
          hideDropdown={this.hideDropdown}
          term={this.state.term}
          onSearchTermChange={(term) => {this.setState({ term });}}
        />
        <input type="text" name="company_id" placeholder={this.state.companyName}/>
        {this.renderCompaniesResult()}
        <input type="text" name="department_id" placeholder="Departamento/Área"/>
        {this.renderDepartmentsResult()}
        <input type="submit" value="Registrar"/>
      </div>
      );
    };

    renderCompaniesResult() {
      if(!this.state.showDropdown || this.state.companies.length === 0) {
        return;
      }

      return (
        <CompanySearchResultsList
          setPreventHideDropdown={this.setPreventHideDropdown}
          resetPreventHideDropdown={this.resetPreventHideDropdown}
          term={this.state.term}
          companies={this.state.companies}
          sendData={this.companySelected}
        />
      );
    }

    renderDepartmentsResult() {

    }

};

export default SignUpCompanyData;
