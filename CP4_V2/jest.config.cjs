module.exports = {
    transform: {
       '^.+\\.(js|jsx)$': 'babel-jest', // Use Babel to transform .js and .jsx files
     },
       moduleFileExtensions: ['js', 'jsx'], // Recognize .js and .jsx extensions
       testEnvironment: 'jest-environment-jsdom', // Use jsdom for DOM testing
     };