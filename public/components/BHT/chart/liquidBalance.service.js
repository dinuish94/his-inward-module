angular.module('inward').factory('liquidBalanceService',['$http',function($http){
    return {
        get: (id) => $http.get('/lBalance/'+id).then(response => response.data)
    };
}]);