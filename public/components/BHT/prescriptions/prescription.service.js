angular.module('inward').factory('prescriptionService',['$http',function($http){
    return {
        get: () => $http.get('/prescriptions').then(response => response.data)
    };
}]);