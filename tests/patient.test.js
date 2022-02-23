var nock = require('nock');
const request = require("supertest");
const expect = require("chai").expect;
const app = require("../functions/patients/index").app;

describe("GET /patients", function () {
    it("returns list of patients", function () {
      
    //specify the url to be intercepted
    nock(`http://localhost:${process.env.port}`)
    //define the method to be intercepted
    .get('/patients/')
    //respond with a OK and the specified JSON response
    .reply(200, {});
      
      request(app)
          .get("/patients")
          .end(function (err, res) {
            //assert that the mocked response is returned
            expect(res.body.status).to.equal(200);
            done();
          });
    })
  });