angular.module('inward').factory('patientService',['$http',function($http){
    return {
        get: () => $http.get('/patients').then(response=>response.data),
        add: (data) => $http.post('/patients',data).then(response=>response.data) 
    }
}])

//   get: () => $http.get('/wards').then(response => response.data),
//             add: ward => $http.post('/wards', ward).then(response => response.data),
//             delete: id => $http.delete('/wards/' + id).then(response => response.data),
//             getDoctors: () => $http.get('/doctors').then(response => response.data),
//             getDoctor: (id) => $http.get('/doctors/'+id).then(response => response.data),