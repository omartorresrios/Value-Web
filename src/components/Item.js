import React from 'react';

class Item extends React.Component {
    render() {
        return (
            <div>
                <td>{this.props.item.empleado}</td>
                <td>{this.props.item.departamento}</td>
                <td>{this.props.item.reviews}</td>
            </div>
        );
    }
}

export default Item;
