angular.module('inward').factory('prescriptionService',['$http',function($http){
    return {
        get: () => $http.get('/prescriptions').then(response => response.data),
        add: prescription => $http.post('/prescriptions', prescription).then(response => response.data),
        update: (id,data) => $http.put('/prescriptions/' + id,data).then(response => response.data),
        delete: (id) => $http.delete('/prescriptions/'+id).then(response=>response.data)
    };
}]);