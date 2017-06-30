angular.module('inward').factory('patientService',['$http',function($http){
    return {
        get: () => $http.get('/patients').then(response=>response.data),
        add: (data) => $http.post('/patients',data).then(response=>response.data) ,
        discharge:(data) => $http.put('/patients/' + data).then(response=>response.data),
        update:(data) => $http.put('/patients/' + data).then(response=>response.data)
    }
}])

