process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Donor    = require('../models/donor');

//Require the dev-dependencies
let chai = require('chai');
let expect = chai.expect;
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Donors API', () => {

  beforeEach((done) => { //Before each test we empty the database
      Donor.remove({}, (err) => {
          done();
      });
  });

  /*
  * Test the get all donors route
  */
  describe('/GET donors', () => {
      it('it should GET all the donors', (done) => {
        chai.request(server)
            .get('/api/donors')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              expect(res.body.data).to.be.a('array');
              done();
            });
      });
  });

  /*
  * Test the get a donor route route
  */
  describe('/GET donors/1', () => {
      it('it should GET a donor', (done) => {
        chai.request(server)
            .get('/api/donors/1')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              expect(res.body.data).to.be.a('null');
              done();
            });
      });
  });

  /*
  * Test the get a donor route route
  */
  describe('/DELETE donors/1', () => {
      it('it should DELETE a donor', (done) => {
        chai.request(server)
            .delete('/api/donors/1')
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              expect(res.body.data).to.be.a('undefined');
              done();
            });
      });
  });

});
