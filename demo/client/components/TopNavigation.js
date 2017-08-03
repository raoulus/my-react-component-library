import React, {Component} from 'react';
import {Link} from 'react-router';
import './styles.less';

export default class TopNavigation extends Component {
  render() {
    return <nav className="nav">
      <div className="nav-title">
        <span className="app-title">My React Component Library</span>
      </div>
      <ul className="nav-links">
        <li><Link activeClassName="active" to="/components">Components</Link></li>
      </ul>
    </nav>;
  }
}
