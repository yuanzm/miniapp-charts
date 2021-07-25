module.exports = {
  extends: [
    '@tencent/eslint-config-tencent',
  ],
  parserOptions: {
      parser: 'babel-eslint',
      ecmaVersion: 2020,
      sourceType: 'module',
  },
  env: {
      browser: true,
      commonjs: true,
      es6: true,
  },
  rules: {
    indent: [1, 2], // warning, 2 space
  },
  "globals": {
    "Component": "readonly",
    "wx": "readonly",
    "Behavior": "readonly",
    "getApp": "readonly",
  }
};