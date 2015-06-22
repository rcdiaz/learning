'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Profesore = mongoose.model('Profesore'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, profesore;

/**
 * Profesore routes tests
 */
describe('Profesore CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Profesore
		user.save(function() {
			profesore = {
				name: 'Profesore Name'
			};

			done();
		});
	});

	it('should be able to save Profesore instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Profesore
				agent.post('/profesores')
					.send(profesore)
					.expect(200)
					.end(function(profesoreSaveErr, profesoreSaveRes) {
						// Handle Profesore save error
						if (profesoreSaveErr) done(profesoreSaveErr);

						// Get a list of Profesores
						agent.get('/profesores')
							.end(function(profesoresGetErr, profesoresGetRes) {
								// Handle Profesore save error
								if (profesoresGetErr) done(profesoresGetErr);

								// Get Profesores list
								var profesores = profesoresGetRes.body;

								// Set assertions
								(profesores[0].user._id).should.equal(userId);
								(profesores[0].name).should.match('Profesore Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Profesore instance if not logged in', function(done) {
		agent.post('/profesores')
			.send(profesore)
			.expect(401)
			.end(function(profesoreSaveErr, profesoreSaveRes) {
				// Call the assertion callback
				done(profesoreSaveErr);
			});
	});

	it('should not be able to save Profesore instance if no name is provided', function(done) {
		// Invalidate name field
		profesore.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Profesore
				agent.post('/profesores')
					.send(profesore)
					.expect(400)
					.end(function(profesoreSaveErr, profesoreSaveRes) {
						// Set message assertion
						(profesoreSaveRes.body.message).should.match('Please fill Profesore name');
						
						// Handle Profesore save error
						done(profesoreSaveErr);
					});
			});
	});

	it('should be able to update Profesore instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Profesore
				agent.post('/profesores')
					.send(profesore)
					.expect(200)
					.end(function(profesoreSaveErr, profesoreSaveRes) {
						// Handle Profesore save error
						if (profesoreSaveErr) done(profesoreSaveErr);

						// Update Profesore name
						profesore.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Profesore
						agent.put('/profesores/' + profesoreSaveRes.body._id)
							.send(profesore)
							.expect(200)
							.end(function(profesoreUpdateErr, profesoreUpdateRes) {
								// Handle Profesore update error
								if (profesoreUpdateErr) done(profesoreUpdateErr);

								// Set assertions
								(profesoreUpdateRes.body._id).should.equal(profesoreSaveRes.body._id);
								(profesoreUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Profesores if not signed in', function(done) {
		// Create new Profesore model instance
		var profesoreObj = new Profesore(profesore);

		// Save the Profesore
		profesoreObj.save(function() {
			// Request Profesores
			request(app).get('/profesores')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Profesore if not signed in', function(done) {
		// Create new Profesore model instance
		var profesoreObj = new Profesore(profesore);

		// Save the Profesore
		profesoreObj.save(function() {
			request(app).get('/profesores/' + profesoreObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', profesore.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Profesore instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Profesore
				agent.post('/profesores')
					.send(profesore)
					.expect(200)
					.end(function(profesoreSaveErr, profesoreSaveRes) {
						// Handle Profesore save error
						if (profesoreSaveErr) done(profesoreSaveErr);

						// Delete existing Profesore
						agent.delete('/profesores/' + profesoreSaveRes.body._id)
							.send(profesore)
							.expect(200)
							.end(function(profesoreDeleteErr, profesoreDeleteRes) {
								// Handle Profesore error error
								if (profesoreDeleteErr) done(profesoreDeleteErr);

								// Set assertions
								(profesoreDeleteRes.body._id).should.equal(profesoreSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Profesore instance if not signed in', function(done) {
		// Set Profesore user 
		profesore.user = user;

		// Create new Profesore model instance
		var profesoreObj = new Profesore(profesore);

		// Save the Profesore
		profesoreObj.save(function() {
			// Try deleting Profesore
			request(app).delete('/profesores/' + profesoreObj._id)
			.expect(401)
			.end(function(profesoreDeleteErr, profesoreDeleteRes) {
				// Set message assertion
				(profesoreDeleteRes.body.message).should.match('User is not logged in');

				// Handle Profesore error error
				done(profesoreDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Profesore.remove().exec(function(){
				done();
			});	
		});
	});
});
