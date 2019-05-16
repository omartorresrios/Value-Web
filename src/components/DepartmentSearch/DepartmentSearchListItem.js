import React from 'react';

class DepartmentSearchListItem extends React.Component {

  handleDepartmentClicked(departmentId, departmentName) {
    this.props.onSearchTermChange(departmentId, departmentName);
  }

  render() {
    return (
      <li>
        <span dangerouslySetInnerHTML={{ __html: this.props.department.name }} onClick={() => this.handleDepartmentClicked(this.props.department.id, this.props.department.name)} />

      </li>
    );
  }
}

export default DepartmentSearchListItem;
