const defaultConfig = {
  enabled: true,
  debug: false,
  additionalDependencies: [],
  excludeNamespaces: []
};

let _config;

const digestNamespacesConfig = {
  init: function (config) {
    _config = Object.assign({}, defaultConfig, config);
  },
  enable: function (enabled) {
    _config.enabled = enabled;
    console.log('digestNamespaces', _config.enabled);
    return _config.enabled;
  },
  isEnabled: () => Boolean(_config.enabled),
  debugEnabled: () => Boolean(_config.debug),
  additionalDependencies: () => _config.additionalDependencies ? Array.from(_config.additionalDependencies) : [],
  exclude: namespace => !_config.excludeNamespaces.includes(namespace) && _config.excludeNamespaces.push(namespace),
  include: namespace => {
    if (!_config.excludeNamespaces.includes(namespace))
      return;

    const index = _config.excludeNamespaces.indexOf(namespace);

    if (index !== -1) {
      _config.excludeNamespaces.splice(index, 1);
    }
  },
  nsExcluded: namespace => _config.excludeNamespaces.includes(namespace)
};

export default (function digestNamespacesConfigConstant() {
  return digestNamespacesConfig;
})();
