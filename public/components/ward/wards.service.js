/**
 * Created by dinuksha on 5/2/17.
 */
angular.module('inward').factory('WardService', ['$http',
    function ($http) {

        return {
            get: () => $http.get('/wards').then(response => response.data),
            add: ward => $http.post('/wards', ward).then(response => response.data),
            update: (id,ward) => $http.put('/wards/'+id, ward).then(response => response.data),
            delete: id => $http.delete('/wards/' + id).then(response => response.data),
            getDoctors: () => $http.get('/doctors').then(response => response.data),
            getDoctor: (id) => $http.get('/doctors/'+id).then(response => response.data),
            getWardById: (id) => $http.get('/wards/'+id).then(response => response.data),
            getPatients: (wardId) => $http.get('/wards/'+wardId+'/beds').then(response => response.data),
            internalTransfer: (transfer) => $http.post('/wards/itransfers', transfer).then(response => response.data),
            externalTransfer: (transfer) => $http.post('/wards/etransfers', transfer).then(response => response.data)

        };
    }
])