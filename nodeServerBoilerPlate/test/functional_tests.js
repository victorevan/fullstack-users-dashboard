const chaiHttp = require('chai-http');
const chai = require('chai');
const { assert } = chai;

chai.use(chaiHttp);

describe('Functional Tests', () => {
  let server;

  beforeEach(() => {
    server = require('../server', { bustCache: true });
  });

  afterEach((done) => {
    server.close();
    done();
  });

  describe('API ROUTING FOR /api/users', () => {
    describe('GET', () => {
      it('get array of users', (done) => {
        chai.request(server)
          .get('/api/users')
          .end((err, res) => {
            assert.equal(res.status, 200);
            done();
          });
      });
    });

    describe('POST', () => {
      it('create new user', (done) => {
        chai.request(server)
          .post('/api/users')
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
