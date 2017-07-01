angular.module('inward').factory('diabeticService',['$http',function($http){
    return {
        get: (id) => $http.get('/diabetes/'+id).then(response => response.data)
    };
}]);