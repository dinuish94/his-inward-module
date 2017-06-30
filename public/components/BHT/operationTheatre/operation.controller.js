
angular.module('inward').controller('OperationTheatreController',
    ['OperationTheatreService', '$location', '$scope', 'ngNotify', '$mdDialog', function( OperationTheatreService, $location, $scope, ngNotify, $mdDialog) {

        function getTheatres() {
            OperationTheatreService.get().then(theatres =>{
                $scope.theatres = theatres;
            });
        }

        getTheatres();

        $scope.addTheatre = (theatre) => {
            OperationTheatreService.add(theatre).then(theatre =>{
                 ngNotify.set('Theatre added successfully!','success');
            });
        }
        
}]);