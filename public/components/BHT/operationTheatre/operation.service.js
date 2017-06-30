/**
 * Created by Jonathan on 5/9/2017.
 */
angular.module('inward').factory('OperationTheatreService', ['$http',
    function ($http) {

        return {
                get: () => $http.get('/theatres').then(response => response.data),
                add: theater => $http.post('/theatres', lab).then(response => response.data),
         };
    }
])