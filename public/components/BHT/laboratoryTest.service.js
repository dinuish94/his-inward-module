/**
 * Created by Jonathan on 5/9/2017.
 */
angular.module('inward').factory('LabTestService', ['$http',
    function ($http) {

        return {
            get: () => $http.get('/labTests').then(response => response.data),
            getLab: testId => $http.get('/labTests/'+testId).then(response => response.data),
           // getLabTypes: () => $http.get('/labTests/allLabTests').then(response => response.data),
           getLabTypes: () => $http.get('/labTests/labTypes').then(response => response.data),
            add: lab => $http.post('/labTests', lab).then(response => response.data),
            delete : testId => $http.delete('/labTests/'+testId).then(response => response.data),
    };
    }
])