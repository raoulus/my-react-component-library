import React from 'react';
import Breadcrumb from 'my-react-component-library/components/Breadcrumb';

export default class Demo extends React.Component {

  render() {
    const breadcrumbItems = [
      {to: '/home', title: 'Home'},
      {to: '/my-details', title: 'My details'},
      {title: 'My details'}
    ];
    return <div>
      <Breadcrumb items={breadcrumbItems} />
    </div>;
  }

}
