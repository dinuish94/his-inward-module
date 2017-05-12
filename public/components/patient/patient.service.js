angular.module('inward').factory('patientService',['$http',function($http){
    return {
        get: () => $http.get('/patients').then(response=>response.data),
        post: (data) => $http.post('/patients',data).then(response=>response.data) 
    }
}])