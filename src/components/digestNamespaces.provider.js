import $rootScope from '../decorators/rootScope';

function digestNamespacesProvider($provide, digestNamespacesConfig) {
  this.init = function (config) {
    digestNamespacesConfig.init(config);
    $provide.decorator('$rootScope', $rootScope);
  };
  this.$get = function() {
    return {
    };
  };
}

digestNamespacesProvider.$inject = ['$provide', 'digestNamespacesConfig'];

export default digestNamespacesProvider;
