angular.module('inward').factory('foodService',['$http',function($http){
    return {
        get: () => $http.get('/foods').then(response => response.data)
    };
}]);