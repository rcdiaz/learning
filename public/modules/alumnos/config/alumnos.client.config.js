'use strict';

// Configuring the new module
angular.module('alumnos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Alumnos', 'alumnos', 'dropdown', '/alumnos(/create)?');
		Menus.addSubMenuItem('topbar', 'alumnos', 'List Alumnos', 'alumnos');
		Menus.addSubMenuItem('topbar', 'alumnos', 'New Alumno', 'alumnos/create');
	}
]);
