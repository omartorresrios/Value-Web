import React from 'react';

class ValueSearchListItem extends React.Component {

  handleValueClicked(valueId, valueName) {
    this.props.onSearchTermChange(valueId, valueName);
  }

  render() {
    return (
      <li>
        <span dangerouslySetInnerHTML={{ __html: this.props.value.name }} onClick={() => this.handleValueClicked(this.props.value.id, this.props.value.name)} />
      </li>
    );
  }
}

export default ValueSearchListItem;
