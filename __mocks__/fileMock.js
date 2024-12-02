// eslint-disable-next-line no-undef
module.exports = new Proxy(
  {},
  {
    get: (target, key) => key // Mock class names as strings
  }
);

// eslint-disable-next-line no-undef
module.exports = 'test-file-stub';
