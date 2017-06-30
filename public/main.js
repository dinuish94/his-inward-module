
// Registering the module
var inward = angular.module('inward', [
    'ngRoute',
    'datatables',
    'ngResource',
    'chart.js',
    'angularUtils.directives.dirPagination',
    'ui.bootstrap',
    'ngNotify',
    'ngMaterial',
    'ngMessages',
    'oitozero.ngSweetAlert',
    'xeditable',
    'ngDialog'
]);

inward.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
