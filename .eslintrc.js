module.exports = {
  root: true,
  extends: '@react-native-community',
  env: {
    ['jest/globals']: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
};
