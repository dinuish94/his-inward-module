/**
 * Created by Jonathan on 5/6/2017.
 */

angular.module('inward').controller('Home',
    ['LabTestService', '$location', '$scope', 'ngNotify', '$mdDialog', function( LabTestService, $location, $scope, ngNotify, $mdDialog) {


        function getPatients() {
            LabTestService.getPatients().then(patients =>{
                $scope.patients = patients;
            });
        }
        getPatients();

        $scope.downloadPDF = () =>{
        html2canvas(document.getElementById('exportthis'), {
            onrendered: function (canvas) {
                console.log("csacsacs");
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("tets.pdf");
            }
        });
}


         $scope.downloadDF = () =>{

             var docDefinition = {
                content: [
                        {
                    table: {
                        headerRows: 1,
                        widths: [ 'auto', 'auto'],

                        body: [
                        [ 'cdscds', 'Second'],
                        [ 'Value 1', 'Value 2'],
                        [ { text: 'Bold value', bold: true }, 'Val 2',]
                        ]
                    }
                }
                
               


                ]
             };
           //  pdfMake.createPdf(docDefinition).download("patient.pdf");
           pdfMake.createPdf(docDefinition).open();
            

        }

    }]);