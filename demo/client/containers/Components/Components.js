import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as componentActions from 'actions/component-actions';
import {bindActionCreators} from 'redux';
import {transform} from 'babel-standalone';
import {Icon} from 'react-fa';
import CodeMirror from 'react-codemirror';
import ReactMarkdown from 'react-markdown';
import TopNavigation from 'components/TopNavigation';
import './styles.less';

import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/fold/foldcode';


class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// Select a component',
      source: '// pssst',
      editorMode: 'demo',
      activeComponent: null
    };
  }

  defaultProps = {
    component: {}
  }

  handleCodeChange(code) {
    this.setState({code: code}, this.compileCode);
  }

  changeEditorMode(mode) {
    this.setState({editorMode: mode});
  }

  renderComponentMenu() {
    const {components} = this.props;
    return components.map((component, index) => {
      const activeClass = this.state.activeComponent === component.name ? 'active' : '';
      return <li key={index} className={`${activeClass} component-link`} onClick={this.loadComponent.bind(this, component.name)}>{component.name}</li>;
    });
  }

  renderComponentSection() {
     const {component} = this.props;
     const isDemo = this.state.editorMode === 'demo';
     return <div>
       <div>
         <div className="section-title">
           {component.name} <span className="component-version">{component.version}</span>
         </div>
         <div className="code-options">
           <span className={`change-mode-icon ${isDemo ? 'active' : ''}`} onClick={this.changeEditorMode.bind(this, 'demo')} title="Demo">
             Demo <Icon name="play" />
           </span>
           <span className={`change-mode-icon ${!isDemo ? 'active' : ''}`} onClick={this.changeEditorMode.bind(this, 'source')} title="Source code">
             Source <Icon name="code" />
           </span>
         </div>
         {
           // component.info.description && <p className="component-description">{component.info.description}</p>
          }
       </div>
       <div ref="mount"></div>
       <hr />
     </div>;
   }

   renderLiveExamples() {
     const {component} = this.props;
     const examples = component.liveExamples;
     if (examples) {
       return (
         <div>
           <div className="section-title">Live examples</div>
           <div className="component-live-examples">
             <ul className="list">
               {Object.keys(examples).map((exampleName) => {
                 const name = exampleName[0].toUpperCase() + exampleName.substring(1, exampleName.length);
                 return <li key={exampleName}><a href={examples[exampleName]} target="_blank">{name}</a></li>;
               })}
             </ul>
           </div>
           <hr />
         </div>
       );
     }
   }

  renderDocs() {
    const {component} = this.props;
    const props = component.info.props;
    const propKeys = Object.keys(props);
    return <div className="prop-type-section">
      <div className="section-title">PropTypes</div>
      {propKeys.map((propName) => {
        const property = props[propName];
        return <div key={propName} className="prop-wrapper">
          <span className="prop-title">{propName} -</span>
          <span className="prop-type">{property.type.name}</span>
          {property.required && <span className="prop-required">required</span>}
          <span className="prop-description">{property.description}</span>
          {property.defaultValue && <span className="prop-default">
            <span className="prop-default-label">Default:</span>
            <pre className="prop-default-value">{property.defaultValue.value.replace(/\'/g, '')}</pre></span>}
          {property.type && property.type.name === 'enum' && <span className="prop-options">
            <span className="prop-options-label">Options:</span>
            <pre className="prop-options-value">
              {property.type.value.map((option, index) => <span key={`option-${index}`} className="prop-option">{option.value.replace(/\'/g, '')}</span>)}
            </pre>
          </span>}
        </div>;
      })}
      <hr />
    </div>;
  }

  renderEditor() {
    if (this.state.loadingComponent) {
      return null;
    }
    const showDemo = this.state.editorMode === 'demo';
    const codeText = showDemo ? this.state.code : this.state.source;
    const isReadOnly = showDemo !== true;
    const changeHandler = showDemo ? this.handleCodeChange.bind(this) : () => {};
    const sectionTitle = showDemo ? 'Demo' : 'Source';
    return <div>
      <div className="section-title">{sectionTitle}</div>
      <CodeMirror
          onChange={changeHandler}
          className="playgroundStage"
          value={codeText}
          options={{
            readOnly: isReadOnly,
            mode: 'jsx',
            lineNumbers: false,
            lineWrapping: true,
            smartIndent: false,
            matchBrackets: true,
            theme: 'solarized-light'
          }}
        />
    </div>;
  }

  compileCode() {
    let code = this.state.code;
    let clean = code.replace(/^import(.*)/gm, '');
    clean = clean.replace('export default ', '');
    let n = clean.match(/class(.*)extends/);
    let componentName = n[1].trim();

    const mountNode = ReactDOM.findDOMNode(this.refs.mount);
    try {
      ReactDOM.unmountComponentAtNode(mountNode);
    } catch (e) {
      console.error(e);
    }

    try {
      const compiledCode = transform(
        `(function() {${clean} return <${componentName}/>;})();`,
        {presets: ['es2015', 'stage-0', 'react']}
      ).code;
      ReactDOM.render(eval(compiledCode), mountNode);
    } catch (err) {
      const error = <div className="playgroundError"><pre>{err.toString()}</pre></div>;
      ReactDOM.render(error, mountNode);
    }
  }

  renderReadme() {
    const {component} = this.props;
    if (component.readme) {
      const readmeText = component.readme.replace(/^#\s(.*)/g, '');
      return <div>
        <div className="readme"><ReactMarkdown source={readmeText} /></div>
      </div>;
    }
    return null;
  }

  renderWelcome() {
    return <div>
      <div className="section-title">Welcome</div>
      <p>
        <b>Git repository</b>
        <br />
        <a href="https://github.com/raoulus/my-react-component-library" target="_blank">
        https://github.com/raoulus/my-react-component-library
        </a>
      </p>
      <p>
        <b>Contibution guide</b>
        <br />
        <a href="https://github.com/raoulus/my-react-component-library/blob/development/CONTRIBUTING.md" target="_blank">
        https://github.com/raoulus/my-react-component-library/blob/development/CONTRIBUTING.md
        </a>
      </p>
      <p>
        <b>Issue tracker</b>
        <br />
        <a href="https://github.com/raoulus/my-react-component-library/issues" target="_blank">
        https://github.com/raoulus/my-react-component-library/issues
        </a>
      </p>
      <p>
        <b>Changelog</b>
        <br />
        <a href="https://github.com/raoulus/my-react-component-library/blob/development/CHANGELOG.md" target="_blank">
        https://github.com/raoulus/my-react-component-library/blob/development/CHANGELOG.md
        </a>
      </p>
    </div>;
  }

  componentWillMount() {
    if (!this.props.components.length) {
      this.props.actions.getComponents();
    }
  }

  loadComponent(name) {
    this.props.actions.getComponent(name);
    this.setState({
      loadingComponent: true,
      activeComponent: name
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.component && nextProps.component.example) {
      this.setState({
        code: nextProps.component.example,
        source: nextProps.component.source,
        editorMode: 'demo',
        loadingComponent: false
      }, this.compileCode);
    }
  }

  render() {
    const {component} = this.props;
    return (
      <div className="page-wrapper">
        <div className="page-header">
          <TopNavigation />
        </div>
        <div className="page-body">
          <div className="flex full-height">
            <div className="flex-2 sidebar section">
              <div className="section-title">Components</div>
              <div className="components">
                <ul className="list-reset">
                  {this.renderComponentMenu()}
                </ul>
              </div>
            </div>
            <div className="flex-10">
              {!component && <div className="flex">
                <div className="flex-12 section">
                  {this.renderWelcome()}
                </div>
              </div>}
              {component && <div className="flex">
                <div className="flex-6 section">
                  {this.renderComponentSection()}
                  {this.renderDocs()}
                  {this.renderLiveExamples()}
                  {this.renderReadme()}
                </div>
                <div className="flex-6 section">
                  {this.renderEditor()}
                </div>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    components: state.component.components,
    component: state.component.component
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(componentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Components);
