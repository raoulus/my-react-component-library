import React, {Component} from 'react';
import TopNavigation from 'components/TopNavigation';

class Templates extends Component {
  render() {
    return <div>
      <div className="page-header">
        <TopNavigation />
      </div>
      <div className="page-body">
        <div>Templates</div>
      </div>
    </div>;
  }
}

export default Templates;
