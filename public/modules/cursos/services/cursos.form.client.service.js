(function() {
    'use strict';

    angular
        .module('cursos')
        .factory('CursosForm', factory);

    function factory() {

      var getFormFields = function(disabled) {


        var fields = [

  				{
  					key: 'name',
  					type: 'input',
  					templateOptions: {
                        label: 'Text',
                        placeholder: 'Nombre del Curso'
                    }
  				},
                {
                    key: 'descripcion',
                    type: 'input',
                    templateOptions: {
                        label: 'Text',
                        placeholder: 'Descripcion adicional'
                    }
                },
                {
                    key: 'certificacion',
                    type: 'select',
                    templateOptions: {
                        label: 'Certificacion',
                        "options": [
                            {
                                "name": "Cambridge",
                                "value": "cambridge"
                            },
                            {
                                "name": "Trinity",
                                "value": "trinity"
                            },
                            {
                                "name": "Otra",
                                "value": "otra"
                            }
                        ]
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
