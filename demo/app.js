import express from 'express';
import { join } from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import http from 'http';
import compression from 'compression';
import { parse } from 'react-docgen';

const REQUEST_PAYLOAD_LIMIT = '10mb';
const PORT = 4001;

const cwd = process.cwd();
const app = express();

app.use(compression());
app.disable('x-powered-by');
app.set('views', join(cwd, 'demo', 'public'));
app.set('view engine', 'ejs');

app.use(express.static(join(cwd, 'demo', 'public')));

app.use(bodyParser.urlencoded({
    extended: false,
    limit: REQUEST_PAYLOAD_LIMIT
}));

app.use(bodyParser.json({
    limit: REQUEST_PAYLOAD_LIMIT
}));

app.get('/api/components', function (req, res, next) {
    const componentRoot = join(cwd, 'components');
    const components = fs.readdirSync(componentRoot);
    const componentsResult = components.map((component) => {
        return {
            name: component,
            url: '/component/' + component,
            folder: join(componentRoot, component)
        };
    });
    res.json(componentsResult);
});

app.get('/api/components/:component', function (req, res, next) {
    const componentName = req.params.component;
    const componentRoot = join(cwd, 'components', componentName);
    const packageJson = require(join(componentRoot, 'package.json'));
    const componentFile = join(componentRoot, 'src', componentName + '.js');
    const componentExample = join(componentRoot, 'example', componentName + '.example.js');
    const componentReadme = join(componentRoot, 'README.md');
    const componentSource = fs.readFileSync(componentFile, { encoding: 'utf-8' });
    const version = packageJson.version;
    const liveExamples = packageJson.liveExamples || {};
    res.json({
        name: componentName,
        version: version,
        liveExamples: liveExamples,
        source: componentSource,
        example: fs.existsSync(componentExample) && fs.readFileSync(componentExample, { encoding: 'utf-8' }),
        readme: fs.existsSync(componentReadme) && fs.readFileSync(componentReadme, { encoding: 'utf-8' }),
        info: parse(componentSource)
    });
});

app.get('*', function (req, res, next) {
    if (req.url.startsWith('/api')) {
        return next();
    }
    res.render('index.ejs', {});
});


let server = http.createServer(app).listen(PORT, function () {
    let host = server.address().address;
    console.info(`styleguide is listening at http://${host}:${PORT}`);
});
