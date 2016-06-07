'use strict';

// Profesores controller
angular.module('profesores').controller('ProfesoresController',
    ['$scope', '$stateParams', '$location', 'Authentication', 'Profesores', 'TableSettings', 'ProfesoresForm',
        function ($scope, $stateParams, $location, Authentication, Profesores, TableSettings, ProfesoresForm) {
            $scope.authentication = Authentication;
            $scope.tableParams = TableSettings.getParams(Profesores);
            $scope.profesore = {};

            $scope.setFormFields = function (disabled) {
                $scope.formFields = ProfesoresForm.getFormFields(disabled);
            };


            // Create new Profesore
            $scope.create = function () {
                var profesore = new Profesores($scope.profesore);
                // Redirect after save
                profesore.$save(function (response) {
                    $location.path('profesores');
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };

            // Remove existing Profesore
            $scope.remove = function (profesore) {

                if (profesore) {
                    profesore = Profesores.get({profesoreId: profesore._id}, function () {
                        profesore.$remove();
                        $scope.tableParams.reload();
                    });

                } else {
                    $scope.profesore.$remove(function () {
                        $location.path('profesores');
                    });
                }

            };

            // Update existing Profesore
            $scope.update = function () {
                var profesore = $scope.profesore;

                profesore.$update(function () {
                    $location.path('profesores');
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };


            $scope.toViewProfesore = function () {
                $scope.profesore = Profesores.get({profesoreId: $stateParams.profesoreId});
                $scope.setFormFields(true);
            };

            $scope.toEditProfesore = function () {
                $scope.profesore = Profesores.get({profesoreId: $stateParams.profesoreId});
                $scope.setFormFields(false);
            };

        }

    ]);
