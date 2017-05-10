var myApp  = angular.module('inward');

myApp.factory("States", function(){
  var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
  
  return states;
  
});

// setup controller and pass data source
myApp.controller('SearchController', ['$window', '$http','$scope', function ($window, $http,$scope){                     
      $scope.selected="";
      $scope.states = ['penicillin','panadol','cannabis','moods','durex','give only one fuck a day','stfu','all','I','wanna','say','is','that','she','doesnt','really','care','about','me'];

}]);