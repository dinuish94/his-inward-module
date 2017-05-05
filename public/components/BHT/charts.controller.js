'use strict';
angular.module('inward').controller('lineChartController',function($scope){
    $scope.labels = ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [95, 97, 94, 100, 101, 98],
    [96, 98, 93, 98, 96, 102]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
  };
});