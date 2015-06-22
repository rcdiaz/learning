'use strict';

// Configuring the new module
angular.module('profesores').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Profesores', 'profesores', 'dropdown', '/profesores(/create)?');
		Menus.addSubMenuItem('topbar', 'profesores', 'List Profesores', 'profesores');
		Menus.addSubMenuItem('topbar', 'profesores', 'New Profesore', 'profesores/create');
	}
]);
