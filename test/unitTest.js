// tests/unitTests.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('API Tests', () => {
  it('should return status 200 for /api/characters endpoint', (done) => {
    chai.request(app)
      .get('/api/characters')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return status 200 for /api/starships endpoint', (done) => {
    chai.request(app)
      .get('/api/starships')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return status 200 for /api/planets endpoint', (done) => {
    chai.request(app)
      .get('/api/planets')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
