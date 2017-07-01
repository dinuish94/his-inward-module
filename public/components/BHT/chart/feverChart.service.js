angular.module('inward').factory('feverService',['$http',function($http){
    return {
        get: (id) => $http.get('/fevers/'+id).then(response => response.data)
    };
}]);