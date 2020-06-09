/**
 *
 * 10.106.8.125    stage-novadax01br-t001
 * 10.106.8.74     stage-novadax02br-t001
 * 10.106.10.38    stage-novadax03br-t001
 * 10.106.9.102    stage-novadax04br-t001
 *  */
const { createProxyMiddleware } = require('http-proxy-middleware');

const targets = {
  //localhost: 'http://10.106.8.125:8000/',
  localhost: 'http://127.0.0.1:3006/',
}

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: targets.localhost,
      changeOrigin: true,
    })
  );
};
