'use strict';

(function() {
	// Profesores Controller Spec
	describe('Profesores Controller Tests', function() {
		// Initialize global variables
		var ProfesoresController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Profesores controller.
			ProfesoresController = $controller('ProfesoresController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Profesore object fetched from XHR', inject(function(Profesores) {
			// Create sample Profesore using the Profesores service
			var sampleProfesore = new Profesores({
				name: 'New Profesore'
			});

			// Create a sample Profesores array that includes the new Profesore
			var sampleProfesores = [sampleProfesore];

			// Set GET response
			$httpBackend.expectGET('profesores').respond(sampleProfesores);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.profesores).toEqualData(sampleProfesores);
		}));

		it('$scope.findOne() should create an array with one Profesore object fetched from XHR using a profesoreId URL parameter', inject(function(Profesores) {
			// Define a sample Profesore object
			var sampleProfesore = new Profesores({
				name: 'New Profesore'
			});

			// Set the URL parameter
			$stateParams.profesoreId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/profesores\/([0-9a-fA-F]{24})$/).respond(sampleProfesore);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.profesore).toEqualData(sampleProfesore);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Profesores) {
			// Create a sample Profesore object
			var sampleProfesorePostData = new Profesores({
				name: 'New Profesore'
			});

			// Create a sample Profesore response
			var sampleProfesoreResponse = new Profesores({
				_id: '525cf20451979dea2c000001',
				name: 'New Profesore'
			});

			// Fixture mock form input values
			scope.name = 'New Profesore';

			// Set POST response
			$httpBackend.expectPOST('profesores', sampleProfesorePostData).respond(sampleProfesoreResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Profesore was created
			expect($location.path()).toBe('/profesores/' + sampleProfesoreResponse._id);
		}));

		it('$scope.update() should update a valid Profesore', inject(function(Profesores) {
			// Define a sample Profesore put data
			var sampleProfesorePutData = new Profesores({
				_id: '525cf20451979dea2c000001',
				name: 'New Profesore'
			});

			// Mock Profesore in scope
			scope.profesore = sampleProfesorePutData;

			// Set PUT response
			$httpBackend.expectPUT(/profesores\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/profesores/' + sampleProfesorePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid profesoreId and remove the Profesore from the scope', inject(function(Profesores) {
			// Create new Profesore object
			var sampleProfesore = new Profesores({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Profesores array and include the Profesore
			scope.profesores = [sampleProfesore];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/profesores\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProfesore);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.profesores.length).toBe(0);
		}));
	});
}());