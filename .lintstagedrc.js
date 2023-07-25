const buildEslintCommand = () => 'yarn lint --fix';

module.exports = {
  '*.{ts,tsx}': [buildEslintCommand],
};
