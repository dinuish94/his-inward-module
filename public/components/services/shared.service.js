angular.module('inward')
    .service('sharedProperties', function () {
        var wardNo;
        var patientId;
        return {
            getWardNo: function () {
                return wardNo;
            },
            setWardNo: function(value) {
                wardNo= value;
            },
            setPid: function(pid) {
                patientId= value;
            },
            getPid: function () {
                return patientId;
            }
        };
    });