#!/bin/bash

componentName=$1
componentNameLower=$(echo $componentName | awk '{print tolower($0)}')
version="1.0.0-alpha.1"

if [ -d "components/$componentName" ]; then
  echo "Can not create component $componentName as it already exists!"
  exit 1
fi

# component root folder
echo "Creating folder components/$componentName"
mkdir components/$componentName

# index.js
echo "Creating file components/$componentName/index.js"
indexTemplate="import $componentName from './src/$componentName';
export default $componentName;"
echo "$indexTemplate" > components/$componentName/index.js

# README.md
echo "Creating file components/$componentName/README.md"
readmeTemplate="<!--
component description goes here
-->"
echo "$readmeTemplate" > components/$componentName/README.md

# Component.js
echo "Creating file components/$componentName/src/$componentName.js"
mkdir components/$componentName/src
componentTemplate="import React, {Component} from 'react';

class $componentName extends Component {

  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    return <div className=\"new-component\"></div>;
  }
}

export default $componentName;"
echo "$componentTemplate" > components/$componentName/src/$componentName.js

# example folder
echo "Creating folder components/$componentName/example"
mkdir components/$componentName/example

# example.js
echo "Creating file components/$componentName/example/$componentName.example.js"
exampleTemplate="import React from 'react';
import $componentName from 'my-react-component-library/components/$componentName';

export default class Demo extends React.Component {
  render() {
    return <$componentName />;
  }
}"
echo "$exampleTemplate" > components/$componentName/example/$componentName.example.js

# test folder
echo "Creating folder components/$componentName/test"
mkdir components/$componentName/test

# spec.js
echo "Creating file components/$componentName/test/$componentName.spec.js"
testTemplate="import $componentName from '../';
import {mount} from 'enzyme';

describe('<$componentName />', function() {

  it('renders the component', function() {
    const wrapper = mount(<$componentName />);
    expect(wrapper.render().find('.new-component')).to.have.length(1);
  });

});
"
echo "$testTemplate" > components/$componentName/test/$componentName.spec.js

# component.less
for theme in themes/*/less/components;
  do
    echo "Creating file $theme/$componentNameLower.less"
    echo "/* Styles for component $componentNameLower */" > $theme/$componentNameLower.less
done

# package.json
cd components/$componentName && npm init -f
json -I -f package.json -e "this.version=\"$version\";this.name=\"$componentNameLower\""
