var path = require('path');

module.exports = {
   entry: {
     mytoken:'./src/mytoken.js'
    },
   output: {
     filename: "[name].js",
     path: path.resolve(__dirname, 'webroot/')
   },
   plugins: [
]
};