/**
 * Created by Jonathan on 5/9/2017.
 */
angular.module('inward').factory('OperationTheatreService', ['$http',
    function ($http) {

        return {
                get: () => $http.get('/theatres').then(response => response.data),
                add: (patientId,theater) => $http.post('/theatres/'+patientId, theater).then(response => response.data),
                getDoctors : () => $http.get('/doctors').then(response => response.data),
                delete : opId => $http.delete('/theatres/'+opId).then(response => response.data),
        };
    }
])