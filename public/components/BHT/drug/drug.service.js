angular.module('inward').factory('drugService',['$http',function($http){
    return {
        get: () => $http.get('/drugs').then(response => response.data)
    }
}]);