import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import CompanySearchResultsList from '../components/CompanySearch/CompanySearchResultsList';
import CompanySearchBar from '../components/CompanySearch/CompanySearchBar';
import DepartmentSearchResultsList from '../components/DepartmentSearch/DepartmentSearchResultsList';
import DepartmentSearchBar from '../components/DepartmentSearch/DepartmentSearchBar';

class SignUpCompanyData extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      companyPreventHideDropdown: false,
      departmentPreventHideDropdown: false,
      term: '',
      companies: [],
      departments: [],
      companyId: '',
      companyName: '',
      departmentId: '',
      departmentName: '',
      redirect: false,
      isCompanyInputSelected: false,
      isDepartmentInputSelected: false,
      isSomeCompanySelected: false,
      isSomeDepartmentSelected: false
    }

    this.companyHideDropdown = this.companyHideDropdown.bind(this);
    this.departmentHideDropdown = this.departmentHideDropdown.bind(this);
    this.companySelected = this.companySelected.bind(this);
    this.departmentSelected = this.departmentSelected.bind(this);
    this.getAllCompanies = this.getAllCompanies.bind(this);
    this.getAllDepartments = this.getAllDepartments.bind(this);
    this.companyShowDropdown = this.companyShowDropdown.bind(this);
    this.departmentShowDropdown = this.departmentShowDropdown.bind(this);
    this.companySetPreventHideDropdown = this.companySetPreventHideDropdown.bind(this);
    this.companyResetPreventHideDropdown = this.companyResetPreventHideDropdown.bind(this);
    this.departmentSetPreventHideDropdown = this.departmentSetPreventHideDropdown.bind(this);
    this.departmentResetPreventHideDropdown = this.departmentResetPreventHideDropdown.bind(this);
    this.signup = this.signup.bind(this);
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

  getAllDepartments() {
    if (this.state.isSomeCompanySelected) {
      axios.get('http://localhost:3000/api/users/' + this.state.companyId + '/all_departments').then(response => {
        // If request is good...
        console.log("data: ", response.data);
        this.setState({ departments: response.data });
      })
      .catch((error) => {
        console.log('Cant get all departments data because: ' + error);
      });
    } else {
      console.log("You shuld select some company");
    }
  }

  companySetPreventHideDropdown() {
    this.setState({ companyPreventHideDropdown: true });
  }

  companyResetPreventHideDropdown() {
    this.setState({ companyPreventHideDropdown: false });
  }

  departmentSetPreventHideDropdown() {
    this.setState({ departmentPreventHideDropdown: true });
  }

  departmentResetPreventHideDropdown() {
    this.setState({ departmentPreventHideDropdown: false });
  }

  companyShowDropdown() {
    this.setState({ isCompanyInputSelected: true });
  }

  companyHideDropdown() {
    if (!this.state.companyPreventHideDropdown) {
      this.setState({ isCompanyInputSelected: false });
    }
  }

  departmentShowDropdown() {
    this.setState({ isDepartmentInputSelected: true });
  }

  departmentHideDropdown() {
    if (!this.state.departmentPreventHideDropdown) {
      this.setState({ isDepartmentInputSelected: false });
    }
  }

  companySelected(companyId, companyName) {
    this.setState({
      companyId: companyId,
      companyName: companyName,
      isSomeCompanySelected: true
    }, function() {
      this.setState({ isCompanyInputSelected: false, companyPreventHideDropdown: false });
      this.getAllDepartments();
    });
  }

  departmentSelected(departmentId, departmentName) {
    this.setState({
      departmentId: departmentId,
      departmentName: departmentName,
      isSomeDepartmentSelected: true,
      isDepartmentInputSelected: false,
      departmentPreventHideDropdown: false
    });
  }

  signup() {
    if (this.state.isSomeCompanySelected && this.state.isSomeDepartmentSelected) {
      axios.post('http://localhost:3000/api/users/signup', {
        email: this.props.location.state.email,
        password: this.props.location.state.password,
        fullname: this.props.location.state.fullname,
        department_id: this.state.departmentId,
        company_id: this.state.companyId
      })
      .then((response) => {
        if (response.data) {
          sessionStorage.setItem('userData', JSON.stringify(response));
          this.setState({redirect: true});
        } else {
          console.log("SignUp error");
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {

    if (this.state.redirect || sessionStorage.getItem("userData")) {
      return (<Redirect to={'/'}/>)
    }

    return (
      <div>
        <h2>Completa estos últimos datos</h2>
        <CompanySearchBar
          companyShowDropdown={this.companyShowDropdown}
          companyHideDropdown={this.companyHideDropdown}
          term={this.state.term}
          onSearchTermChange={(term) => {this.setState({ term });}}
        />

        <DepartmentSearchBar
          departmentShowDropdown={this.departmentShowDropdown}
          departmentHideDropdown={this.departmentHideDropdown}
          term={this.state.term}
          onSearchTermChange={(term) => {this.setState({ term });}}
        />

        <input type="text" name="company_id" placeholder={this.state.companyName}/>
        {this.renderCompaniesResult()}
        <input type="text" name="department_id" placeholder={this.state.departmentName}/>
        {this.renderDepartmentsResult()}
        <input type="submit" value="Continuar" onClick={this.signup}/>
      </div>
    );
  };

  renderCompaniesResult() {
    if(this.state.companies.length === 0 || this.state.isDepartmentInputSelected || !this.state.isCompanyInputSelected) {
      return;
    }

    return (
      <CompanySearchResultsList
        companySetPreventHideDropdown={this.companySetPreventHideDropdown}
        companyResetPreventHideDropdown={this.companyResetPreventHideDropdown}
        term={this.state.term}
        companies={this.state.companies}
        sendData={this.companySelected}
      />
    );
  }

  renderDepartmentsResult() {
    if(this.state.departments.length === 0 || this.state.isCompanyInputSelected || !this.state.isDepartmentInputSelected) {
      return;
    }

    return (
      <DepartmentSearchResultsList
        departmentSetPreventHideDropdown={this.departmentSetPreventHideDropdown}
        departmentResetPreventHideDropdown={this.departmentResetPreventHideDropdown}
        term={this.state.term}
        departments={this.state.departments}
        sendData={this.departmentSelected}
      />
    );
  }
};

export default SignUpCompanyData;
