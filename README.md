## My react component library
__I am working these days on this project to get it production ready. Currently there's still a lot to clean up and test.__
<br><br>
This module makes it possible to manage your react components as a [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md). In addition to components you are able to distribute a styleguide. You can define different versions of your component styles and manage the integration easily in your `webpack.config.js`.

This project comes with a live JSX editor as you probably know from the [react homepage](https://facebook.github.io/react/). This makes it easy also for non-developer to get a glimpse of  components and its usage.

**Features**
 - Monorepo for react components
 - CSS styleguide
 - Live demo for components  

**Dependencies**
 - The versioning and publishing workflow is baed on [Lerna](https://github.com/lerna/lerna).


### Usage
Install the styleguide in your app.
```bash
npm i my-react-component-library -S -E
```
<br>
Update your webpack configuration in order to load the components and styles in your source files from the `node_modules` folder.

```javascript
// webpack.config.js
resolve: {
  modules: [
    path.resolve(__dirname, 'node_modules')
  ],
  alias: {
    'styleguide-v1': path.resolve(__dirname, 'node_modules', 'my-react-component-library')
  }
}
...
module: {
  loaders: [
    {
      test: /\.(jsx|js)?$/,
      // include: path.resolve(__dirname, 'node_modules', 'styleguide-v1'),
      loader: 'babel',
      query: {plugins: []}
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('css-loader?minimize&-autoprefixer!less-loader'),
      // include: path.resolve(__dirname, 'node_modules', 'styleguide-v1')
    }
  ]
}
```

#### Loading styles
You can either load the complete styleguide includind all components as `css`
```css
@import "~styleguide-v1/themes/v1/css/theme-v1.min.css";
```

Or you load the styles for each component individually.
```css
@import "~styleguide-v1/themes/v1/css/components/pagination.css";
```

#### Loading react components
Import components the usual way.
```js
import Pagination from 'styleguide-v1/components/Pagination';
```
<br>

### Commands
```
# Install dependencies
yarn install (use yarn for now, as npm has an issue installing from a pull request)

# Start demo
npm start

# Run unit tests
npm test

# Run unit tests with file watcher
npm run test:watch

# Create a new component
npm run create:component ComponentName
```

...
