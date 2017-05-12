/**
 * Created by Jonathan on 5/9/2017.
 */
angular.module('inward').factory('LabTestService', ['$http',
    function ($http) {

        return {
            get: () => $http.get('/labTests').then(response => response.data),
            getLab: testId => $http.get('/labTests/'+testId).then(response => response.data),
            add: lab => $http.post('/labTests', lab).then(response => response.data),
            delete : testId => $http.delete('/labTests/'+testId).then(response => response.data),

            getLabTestTypes: () => $http.get('/labTests/LabTestTypes').then(response => response.data),
            addLabTestType: labType => $http.post('/labTests/LabTestTypes',labType).then(response => response.data),
            deleteLabType : id => $http.delete('/labTests/LabTestTypes/'+id).then(response => response.data),
    };
    }
])