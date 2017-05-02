/**
 * Created by dinuksha on 5/2/17.
 */
angular.module('inward').controller('BedController',
    ['$location', '$scope', 'ngNotify', 'sharedProperties', function($location, $scope, ngNotify, sharedProperties) {
    "use strict";

        $scope.id = sharedProperties.getWardNo();

}]);