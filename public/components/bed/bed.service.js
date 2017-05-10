angular.module('inward').factory('BedService', ['$http',
    function ($http) {

        return {
            getBeds: id => $http.get('/wards/'+ id).then(response => response.data),
            get: id => $http.get('/wards/'+id+'/beds').then(response => response.data),
            add: (id,bed) => $http.post('/wards/'+id+'/beds',bed).then(response => response.data),
        };
    }
])