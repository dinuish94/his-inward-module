/**
 * Created by dinuksha on 5/2/17.
 */
angular.module('inward').factory('WardService', ['$http',
    function ($http) {

        return {
            get: () => $http.get('/wards').then(response => response.data),
            add: ward => $http.post('/wards', ward).then(response => response.data),
            delete: id => $http.delete('/wards/' + id).then(response => response.data),
            getDoctors: () => $http.get('/doctors').then(response => response.data),
        };
    }
])