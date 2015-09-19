'use strict';

// Cursos controller
angular.module('cursos').controller('CursosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Cursos', 'TableSettings', 'CursosForm',
	function($scope, $stateParams, $location, Authentication, Cursos, TableSettings, CursosForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Cursos);
		$scope.curso = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = CursosForm.getFormFields(disabled);
		};


		// Create new Curso
		$scope.create = function() {
			var curso = new Cursos($scope.curso);

			// Redirect after save
			curso.$save(function(response) {
				$location.path('cursos/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Curso
		$scope.remove = function(curso) {

			if ( curso ) {
				curso = Cursos.get({cursoId:curso._id}, function() {
					curso.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.curso.$remove(function() {
					$location.path('cursos');
				});
			}

		};

		// Update existing Curso
		$scope.update = function() {
			var curso = $scope.curso;

			curso.$update(function() {
				$location.path('cursos/' + curso._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewCurso = function() {
			$scope.curso = Cursos.get( {cursoId: $stateParams.cursoId} );
			$scope.setFormFields(true);
		};

		$scope.toEditCurso = function() {
			$scope.curso = Cursos.get( {cursoId: $stateParams.cursoId} );
			$scope.setFormFields(false);
		};

	}

]);
