/**
 * Created by Jonathan on 5/5/2017.
 */
'use strict';
angular.module('inward').controller('liquidBalanceController',['$scope','liquidBalanceService',function($scope,liquidBalanceService){

    function getvalues() {
        liquidBalanceService.get(1).then(chartValues => {
            $scope.chartValues = chartValues;
            console.log(chartValues);

            $scope.labels = chartValues.x;
            $scope.series = ['Series A'];
            $scope.data = [
                chartValues.y
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
    }
    getvalues();
    
}]);