import React, {Component} from 'react';
import TopNavigation from 'components/TopNavigation';

class WhatsNew extends Component {
  render() {
    return <div>
      <div className="page-header">
        <TopNavigation />
      </div>
      <div className="page-body">
        <div>WhatsNew</div>
      </div>
    </div>;
  }
}

export default WhatsNew;
