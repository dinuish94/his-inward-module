/**
 * Created by Jonathan on 5/6/2017.
 */

angular.module('inward').controller('BHTController',
    ['LabTestService', '$location', '$scope', 'ngNotify', '$mdDialog','$routeParams', function( LabTestService, $location, $scope, ngNotify, $mdDialog,$routeParams) {


        function getPatient() {
            LabTestService.getPatientById($routeParams.id).then(patient =>{
                $scope.patient = patient;
                console.log(patient);
            });
        }
        getPatient();

        function convertImgToBase64URL(url, callback, outputFormat){
            var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            img = new Image;
            img.crossOrigin = 'Anonymous';
            img.onload = function(){
                var dataURL;
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);
                dataURL = canvas.toDataURL(outputFormat);
                callback(dataURL);
                canvas = null; 
            };
            img.src = url;
        }
    
     convertImgToBase64URL('http://localhost:3000/app/assets/images/sl_logo.jpg', check, 'image/jpeg');
     function check(e){
         $scope.imageData = e;
     }

        $scope.downloadPDF = (patient,dat) =>{
             var docDefinition = {
                content: [
                        {
                             image: dat,
                             width : 50,
                             alignment: 'center'
                        },
                        { text: 'District Hospital ', fontSize: 25, bold: false, alignment: 'center' },
                        { text: '   ', fontSize: 10, bold: true  },
                        { text: 'Patient Details', fontSize: 20, bold: true, alignment: 'center' },
                        { text: '   ', fontSize: 10, bold: true  },
                        { text: 'Patient Basic Details', fontSize: 15, bold: true  },
                        { text: '   ', fontSize: 10, bold: true  },
                        {
                            layout: 'lightHorizontalLines',
                            table: {
                                headerRows: 0,
                                widths: [ 150, '*'],

                                body: [
                                [ 'Full Name', patient.name ],
                                [ 'NIC', '999999'],
                                [ 'Gender', patient.gender],
                                [ 'Date of Birth', 'Val 2']
                                ]
                            }
                        },

                        { text: '   ', fontSize: 10, bold: true  },
                        { text: 'Ward Admittance Details', fontSize: 15, bold: true  },
                        { text: '   ', fontSize: 10, bold: true  },
                          
                        {
                            layout: 'lightHorizontalLines',
                            table: {
                                headerRows: 0,
                                widths: [ 150, '*'],

                                body: [
                                [ 'Bed Head Ticket No', 'Second' ],
                                [ 'Discharge Date', 'Value 2'],
                                [ 'Admitted Date', 'Val 2']
                                ]
                            }
                        },

                        { text: '   ', fontSize: 10, bold: true  },
                        { text: 'Patient Allergy Details', fontSize: 15, bold: true  },
                        { text: '   ', fontSize: 10, bold: true  },
                          
                        {
                            layout: 'lightHorizontalLines',
                            table: {
                                headerRows: 0,
                                widths: [ 150, '*'],

                                body: [
                                [ 'Allergy Name', 'Second' ],
                                [ 'Allergy Drug', 'Second' ]
                                ]
                            }
                        }

                        



                ],
                info: {
                    title: 'Patient Details Report',
                    author: 'Jonathan',
                    subject: 'Report'
                }
             };

           pdfMake.createPdf(docDefinition).open();
        }



       
    }]);