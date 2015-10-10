'use strict';

// Alumnos controller
angular.module('alumnos').controller('AlumnosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Alumnos', 'TableSettings', 'AlumnosForm',
	function($scope, $stateParams, $location, Authentication, Alumnos, TableSettings, AlumnosForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Alumnos);
		$scope.alumno = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = AlumnosForm.getFormFields(disabled);
		};


		// Create new Alumno
		$scope.create = function() {
			var alumno = new Alumnos($scope.alumno);

			// Redirect after save
			alumno.$save(function(response) {
				$location.path('alumnos/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Alumno
		$scope.remove = function(alumno) {

			if ( alumno ) {
				alumno = Alumnos.get({alumnoId:alumno._id}, function() {
					alumno.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.alumno.$remove(function() {
					$location.path('alumnos');
				});
			}

		};

		// Update existing Alumno
		$scope.update = function() {
			var alumno = $scope.alumno;

			alumno.$update(function() {
				$location.path('alumnos');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewAlumno = function() {
			$scope.alumno = Alumnos.get( {alumnoId: $stateParams.alumnoId} );
			$scope.setFormFields(true);
		};

		$scope.toEditAlumno = function() {
			$scope.alumno = Alumnos.get( {alumnoId: $stateParams.alumnoId} );
			$scope.setFormFields(false);
		};

	}

]);
