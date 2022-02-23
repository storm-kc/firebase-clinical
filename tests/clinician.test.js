var nock = require('nock');
const request = require("supertest");
const expect = require("chai").expect;
const app = require("../functions/clinicians/index").app;

describe("GET /clinicians", function () {
    it("returns list of clinicians", function () {
      
    //specify the url to be intercepted
    nock(`http://localhost:5000`)
    //define the method to be intercepted
    .get('/clinicians/')
    //respond with a OK and the specified JSON response
    .reply(200, {});
      
      request(app)
          .get("/clinicians")
          .end(function (err, res) {
            //assert that the mocked response is returned
            expect(res.body.status).to.equal(200);
            done();
          });
    })
  });