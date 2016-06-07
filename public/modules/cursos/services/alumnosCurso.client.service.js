'use strict';

//Alumnos service used to communicate Alumnos REST endpoints
angular.module('cursos').factory('AlumnosCurso', ['$resource',
	function($resource) {
		return $resource('alumnos/:all', { all: '@all'
		}, {
			query: {
                isArray: true
            },
			update: {
				method: 'PUT'
			}
		});
	}
]);