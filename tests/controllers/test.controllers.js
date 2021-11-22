const server = require("../../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

//Assertion
chai.should();
chai.use(chaiHttp);

describe("Testing Routes", () => {
  describe("Test GET route to /api/ping", () => {
    it("Should return status code 200", (done) => {
      chai
        .request(server)
        .get("/api/ping")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("Should return object with success true", (done) => {
      chai
        .request(server)
        .get("/api/ping")
        .end((err, res) => {
          res.body.should.be.a("Object");
          res.body.should.have.property("success").eql(true);
          done();
        });
    });
  });

  describe("Test GET route to /api/posts", () => {
    it("Should return status code 200 if tags param was defined", (done) => {
      chai
        .request(server)
        .get("/api/posts")
        .query({ tags: "science,tech" })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("Should return an array if tags param was defined", (done) => {
      chai
        .request(server)
        .get("/api/posts")
        .query({ tags: "science,tech" })
        .end((err, res) => {
          res.body.should.be.a("array");
          done();
        });
    });
    it("Should return HTTP 400 if tags param is undefined", (done) => {
      chai
        .request(server)
        .get("/api/posts")
        .query({})
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Should return an object with error message if tags param is undefined", (done) => {
      chai
        .request(server)
        .get("/api/posts")
        .query({})
        .end((err, res) => {
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql("Tags parameter is required");
          done();
        });
    });
    it("Should return HTTP 400 if there are no matches for `sortBy` param", (done) => {
      chai
        .request(server)
        .get("/api/posts")
        .query({ tags: "science,tech", sortBy: "ratings" })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Should return an object with error message if there are no matches for `sortBy` param", (done) => {
      chai
        .request(server)
        .get("/api/posts")
        .query({ tags: "science,tech", sortBy: "ratings" })
        .end((err, res) => {
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql("sortBy parameter is invalid");
          done();
        });
    });
    it("Should return HTTP 400 if there are no matches for `direction` param", (done) => {
      chai
        .request(server)
        .get("/api/posts")
        .query({
          tags: "science,tech",
          sortBy: "popularity",
          direction: "random",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Should return an object with error message if there are no matches for `direction` param", (done) => {
      chai
        .request(server)
        .get("/api/posts")
        .query({
          tags: "science,tech",
          sortBy: "popularity",
          direction: "random",
        })
        .end((err, res) => {
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql("direction parameter is invalid");
          done();
        });
    });
  });
});
