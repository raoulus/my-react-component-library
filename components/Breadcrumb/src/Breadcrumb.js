import React, {Component, PropTypes} from 'react';

class Breadcrumb extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="breadcrumb">
        {this.props.items.map((item, index) => {
          return <div className="breadcrumb-item" key={index}>
            {item.to && <a href={item.to}>{item.title}</a>}
            {!item.to && <span>{item.title}</span>}
          </div>;
        })}
      </div>
    );
  }
}

export default Breadcrumb;
