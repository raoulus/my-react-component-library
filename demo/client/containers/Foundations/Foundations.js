import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as colorActions from 'actions/color-actions';
import {bindActionCreators} from 'redux';
import TopNavigation from 'components/TopNavigation';

class Foundations extends Component {

  componentWillMount() {
    if (!this.props.colors) {
      this.props.actions.getColors();
    }
  }

  extractColors(colors) {
    if (!colors) {
      return null;
    }
    const extractedColors = /(.*):\s(#.*);/g.exec(colors.replace(/\n/g, ''));
    return extractedColors;
  }

  render() {
    const {colors} = this.props;
    const colorArr = this.extractColors(colors.colors);
    console.log(colorArr);
    return <div>
      <div className="page-header">
        <TopNavigation />
      </div>
      <div className="page-body">
        <div>Foundations</div>
      </div>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    colors: state.color.colors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(colorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Foundations);
