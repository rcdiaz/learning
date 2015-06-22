(function() {
    'use strict';

    angular
        .module('alumnos')
        .factory('AlumnosForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

          var fields = [
              {
                  key: 'name',
                  type: 'input',
                  templateOptions: {
                      label: '',
                      placeholder: 'Nombre:',
                      disabled: disabled
                  }

              },
              {
                  key: 'apellido1',
                  type: 'input',
                  templateOptions: {
                      label: '',
                      placeholder: 'Apellido 1:',
                      disabled: disabled
                  }

              },
              {
                  key: 'apellido2',
                  type: 'input',
                  templateOptions: {
                      label: '',
                      placeholder: 'Apellido 2:',
                      disabled: disabled
                  }

              },
              {
                  key: 'telefono',
                  type: 'input',
                  templateOptions: {
                      label: '',
                      placeholder: 'Teléfono:',
                      disabled: disabled
                  }

              },
              {
                  key: 'dni',
                  type: 'input',
                  templateOptions: {
                      label: '',
                      placeholder: 'DNI:',
                      disabled: disabled
                  }
              },
              {
                  key: 'email',
                  type: 'input',
                  templateOptions: {
                      label: '',
                      placeholder: 'e-mail:',
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
