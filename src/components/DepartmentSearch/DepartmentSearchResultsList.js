import React from 'react';
import DepartmentSearchListItem from './DepartmentSearchListItem';

class DepartmentSearchResultsList extends React.Component {

  render() {
    return (
      <ul id="autocomplete-items" onMouseEnter={() => {this.props.departmentSetPreventHideDropdown()}} onMouseLeave={() => {this.props.departmentResetPreventHideDropdown()}}>
        <span className="dropdown-arrow-top"></span>
        <span className="dropdown-arrow-bottom"></span>
        <li>
          <a href={`/search?q=${this.props.term}`}>
            <i className="fa fa-search"></i> Search for <strong>{this.props.term}</strong>
          </a>
        </li>
        {this.renderDepartmentHeading()}
        {this.renderDepartments()}
      </ul>
    );
  }

  renderDepartments() {
    let filteredDepartments = this.props.departments.filter(
      (department) => {
        return department.name.toLowerCase().indexOf(
          this.props.term.toLowerCase()) !== -1;
      }
    );

    return filteredDepartments.map((department) => {
      return <DepartmentSearchListItem key={department.id} department={department} onSearchTermChange={(departmentId, departmentName) => {this.props.sendData(departmentId, departmentName)}}/>
    });
  }

  renderDepartmentHeading() {
    if (this.props.departments.length === 0) { return; }

    return <li className="autocomplete-heading"><h4>Departamentos</h4></li>
  }
}

export default DepartmentSearchResultsList;
