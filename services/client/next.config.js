const path = require('path');

module.exports = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    appDir: true,
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(__dirname, '../../')
  }
};
