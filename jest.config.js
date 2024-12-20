module.exports = {
  // ...existing code...
  moduleNameMapper: {
    'react-router-dom': '<rootDir>/node_modules/react-router-dom',
    // ...existing code...
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  // ...existing code...
}
