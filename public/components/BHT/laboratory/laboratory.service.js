/**
 * Created by Jonathan on 5/9/2017.
 */
angular.module('inward').factory('LabTestService', ['$http',
    function ($http) {

        return {
            get: () => $http.get('/labTests').then(response => response.data),
            getLab: testId => $http.get('/labTests/'+testId).then(response => response.data),
            add: (patientId,lab) => $http.post('/labTests/'+patientId, lab).then(response => response.data),
            delete : (testId) => $http.delete('/labTests/'+testId).then(response => response.data),
            updateLabRequest : (labId,lab) => $http.put('/labTests/'+labId, lab).then(response => response.data),

           // addRemarks : (labRequestId,lab) => $http.post('/labTests/labRequests/'+labRequestId, lab).then(response => response.data),

            getLabTestTypes: () => $http.get('/LabTestTypes').then(response => response.data),
            addLabTestType: labType => $http.post('/LabTestTypes',labType).then(response => response.data),
            deleteLabType : id => $http.delete('/LabTestTypes/'+id).then(response => response.data),

            getPatients : () => $http.get('/patients').then(response => response.data),
            getPatientById : patientId => $http.get('/patients/'+patientId).then(response=>response.data),
    };
    }
])