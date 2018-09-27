const chaiHttp = require('chai-http');
const server = require('../server');
const chai = require('chai');
const { assert } = chai;

chai.use(chaiHttp);

describe('Functional Tests', () => {
  describe('API ROUTING FOR /api/users', () => {
    describe('GET', () => {
      it('get array of users', (done) => {
        chai.request(server)
          .get('/api/users')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            done();
          });
      });
    });

    describe('POST', () => {
      it('create new user', (done) => {
        chai.request(server)
          .post('/api/users')
          .send({
            selected: false,
            name: 'Victor',
            surveyStatus: 'Scheduled',
            type: 'Candidate',
            location: 'Las Vegas, NV',
            role: 'Engineer'
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            done();
          });
      });
    });
  });

/*   describe('API ROUTING FOR /api/users/:userId', () => {
    describe('GET');
    describe('PUT');
    describe('DELETE');
  }); */
});
