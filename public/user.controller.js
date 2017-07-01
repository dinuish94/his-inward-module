angular.module('register',[]).controller('userController',['$scope','$http','$window',function userCtrl($scope,$http,$window){

    $scope.check = () => {
        console.log("load - ");
    }

    $scope.check();
    $scope.saveUser = (user) => {
        $http.post('/register',user).then(game => {
           $window.location.href='login'; 
        });
    }

    $scope.login = (user) => {
        console.log(user);
        $http.post('/login',user).then(user => {
           $window.sessionStorage.setItem("loggedInUser", true); //load
        //    $scope.name = $window.sessionStorage.getItem("loggedInUser");//retrieve
           $window.location.href='/';
           console.log(user);
        });
    }
}]);