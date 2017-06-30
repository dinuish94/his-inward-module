angular.module('inward').factory('dietService',['$http',function($http){
    return {
        get: (id) => $http.get('/diets/'+id).then(response => response.data),
        add: (id,prescription) => $http.post('/diets/'+id, prescription).then(response => response.data),
        update: (id,data) => $http.put('/diets/' + id,data).then(response => response.data),
        delete: (id) => $http.delete('/diets/'+id).then(response=>response.data)
    };
}]);