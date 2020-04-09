import webpackConfig from '../../webpack.config';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

const SocketIOService = require("./spaceships/services/SocketIOService.ts");

// initializing packages
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlwares
app.use(webpackDevMiddleware(webpack(webpackConfig)));

// routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api', (req, res) => {
  res.json({api: 'works!'});
});

// starting the server
export const server = app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

// socket io
SocketIOService.init(server);
