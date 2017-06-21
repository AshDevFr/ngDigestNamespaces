import digestNamespacesProvider from './components/digestNamespaces.provider';
import digestNamespacesConfig from './components/digestNamespacesConfig.constant';

module.exports = angular.module('ng-digest-namespaces', [])
 .provider('digestNamespaces', digestNamespacesProvider)
 .constant('digestNamespacesConfig', digestNamespacesConfig);
