(function() {
    'use strict';

    angular
        .module('cursos')
        .factory('CursosForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
  				{
  					key: 'Nombre del Curso',
  					type: 'input',
  					templateOptions: {
                        placeholder: "Nombre del Curso",
                        disabled: disabled
                    }
  				},
                {
                    key: 'Tipo',
                    type: 'select',
                    templateOptions: {
                        placeholder: "Tipo del Curso",
                        disabled: disabled
                    }
                },
                {
                    key: 'subTipo',
                    type: 'input',
                    templateOptions: {
                        placeholder: "Subtipo del Curso",
                        disabled: disabled
                    }
                },
                {
                    key: 'Intensivo',
                    type: 'checkbox',
                    templateOptions: {
                        label: "Intensivo",
                        disabled: disabled
                    }
                }

  			];

        return fields;

      };

      var service = {
        getFormFields: getFormFields
      };

      return service;

  }

})();
