const path = require('path');

module.exports = {
  entry: './src/emoji-input-field/emoji-input-field.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'test-app'),
  },
}
