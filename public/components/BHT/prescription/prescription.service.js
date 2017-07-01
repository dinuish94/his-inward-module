angular.module('inward').factory('prescriptionService',['$http',function($http){
    return {
        get: (id) => $http.get('/prescriptions/'+id).then(response => response.data),
        add: (id,prescription) => $http.post('/prescriptions/'+id, prescription).then(response => response.data),
        update: (id,data) => $http.put('/prescriptions/' + id,data).then(response => response.data),
        delete: (id) => $http.delete('/prescriptions/'+id).then(response=>response.data)
    };
}]);