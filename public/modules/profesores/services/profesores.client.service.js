'use strict';

//Profesores service used to communicate Profesores REST endpoints
angular.module('profesores').factory('Profesores', ['$resource',
	function($resource) {
		return $resource('profesores/:profesoreId', { profesoreId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);