'use strict';

//Setting up route
angular.module('profesores').config(['$stateProvider',
	function($stateProvider) {
		// Profesores state routing
		$stateProvider.
		state('listProfesores', {
			url: '/profesores',
			templateUrl: 'modules/profesores/views/list-profesores.client.view.html'
		}).
		state('createProfesore', {
			url: '/profesores/create',
			templateUrl: 'modules/profesores/views/create-profesore.client.view.html'
		}).
		state('editProfesore', {
			url: '/profesores/:profesoreId/edit',
			templateUrl: 'modules/profesores/views/edit-profesore.client.view.html'
		});
	}
]);
