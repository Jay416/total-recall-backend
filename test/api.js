var app = require('../index');

var should = require('should');
var request = require('supertest');

var fixtur = {
	group: 'language',
	question: 'the [ðə:]',
	answer: ['определенный артикль']
};

var fixturs = [{
	group: 'language',
	question: 'and [ænd]',
	answer: ['и, а, но']
}, {
	group: 'language',
	question: 'a [ə]',
	answer: ['определенный артикль']
}, {
	group: 'language',
	question: 'to [tu:]',
	answer: ['к, в, на, до, для']
}, {
	group: 'language',
	question: 'was [wɔz]',
	answer: ['был, была, было']
}, {
	group: 'language',
	question: 'I [ʌi]',
	answer: ['я']
}, {
	group: 'language',
	question: 'is [iz]',
	answer: ['быть']
}, {
	group: 'language',
	question: 'of [ɔv]',
	answer: ['из, от, о, об']
}, {
	group: 'language',
	question: 'that [ðæt]',
	answer: ['тот, та, то']
}, {
	group: 'language',
	question: 'you [ju:]',
	answer: ['ты, вы']
}];

var newRemembers

describe('Behavior users:', function() {
	var agent = request.agent(app);
	describe('Creating one "remembers"', function() {
		var response; 
		before(function(done) {
	    agent.post('/api/remembers')
	    	.send(fixtur)
		    .end(function(err, res){
					response = res;
					done();
				});
	  });
		it('response should have the status of 200', function() {
			response.status.should.equal(200);
		});
		it('response should have the correct field', function() {
			response.body.should.have.properties(fixtur)
			// should(response.body).not.be.ok;
			// console.log(response.body);//jinc
			// response.body.group.should.equal(fixtur.group);
			// response.body.question.should.equal(fixtur.question);
			// response.body.answer.should.equal(fixtur.answer);
		});
	});
	describe('Getting a list of "remembers"', function() { 
		it('response should have the status of 200', function(done) {
			agent.get('/api/remembers').expect(200,  done);
		});
	});
	describe('Getting one "remembers" by id', function() { 
		it('response should have the status of 200', function(done) {
			agent.get('/api/remembers/:id').expect(200, done);
		});
	});
	describe('Update one "remembers" by id', function() { 
		it('response should have the status of 200', function(done) {
			agent.put('/api/remembers/:id').expect(200, done);
		});
	});
	describe('Delete one "remembers" by id', function() { 
		it('response should have the status of 204', function(done) {
			agent.delete('/api/remembers/:id').expect(204, done);
		});
	});
	describe('Answer to the "remembers"', function() { 
		it('response should have the status of 200', function(done) {
			agent.put('/api/remembers/:id/answer').expect(200, done);
		});
	});
});