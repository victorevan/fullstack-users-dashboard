const chaiHttp = require('chai-http');
const chaiJsonSchema = require('chai-json-schema');
const server = require('../server');
const chai = require('chai');
const { assert, expect } = chai;

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

describe('Functional Tests', () => {
  let userSchema;

  before(() => {
    userSchema = {
      title: 'user schema',
      type: 'object',
      required: ['name', 'selected', 'surveyStatus', 'type', 'location', 'role'],
      properties: {
        ['_id']: { type: 'string' },
        selected: { type: 'boolean' },
        name: { type: 'string' },
        surveyStatus: { type: 'string' },
        type: { type: 'string' },
        location: { type: 'string' },
        role: { type: 'string' }
      }
    }
  });

  // TDD style
  describe('API ROUTING FOR /api/users', () => {
    describe('GET', () => {
      it('get array of users', (done) => {
        chai.request(server)
          .get('/api/users')
          .end((err, { status, body }) => {
            assert.equal(status, 200);
            assert.isArray(body);
            assert.jsonSchema(body[0], userSchema);
            done();
          });
      });
    });

    describe('POST', () => {
      it('create new user', (done) => {
        chai.request(server)
          .post('/api/users')
          .send({
            name: 'Victor',
            selected: false,
            surveyStatus: 'Scheduled',
            type: 'Candidate',
            location: 'Las Vegas, NV',
            role: 'Engineer'
          })
          .end((err, { status, body }) => {
            assert.equal(status, 201);
            assert.jsonSchema(body, userSchema);
            assert.equal(body.name, 'Victor');
            assert.equal(body.selected, false);
            assert.equal(body.surveyStatus, 'Scheduled');
            assert.equal(body.type, 'Candidate');
            assert.equal(body.location, 'Las Vegas, NV');
            assert.equal(body.role, 'Engineer');
            done();
          });
      });
    });
  });

  // BDD style
  xdescribe('API ROUTING FOR /api/users/:userId', () => {
    xdescribe('GET');
    xdescribe('PUT');
    xdescribe('DELETE');
  });
});
