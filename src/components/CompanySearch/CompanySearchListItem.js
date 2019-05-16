import React from 'react';

class CompanySearchListItem extends React.Component {

  handleCompanyClicked(companyId, companyName) {
    this.props.onSearchTermChange(companyId, companyName);
  }

  render() {
    return (
      <li>
        <span dangerouslySetInnerHTML={{ __html: this.props.company.name }} onClick={() => this.handleCompanyClicked(this.props.company.id, this.props.company.name)} />

      </li>
    );
  }
}

export default CompanySearchListItem;
