angular.module('inward')
    .service('sharedProperties', function () {
        var wardNo;

        return {
            getWardNo: function () {
                return wardNo;
            },
            setWardNo: function(value) {
                wardNo= value;
            }
        };
    });