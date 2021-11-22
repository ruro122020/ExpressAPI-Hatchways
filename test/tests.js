const server = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const {
  assignDefaultIfUndefined,
  checkTagsExist,
  getPosts,
  checkAcceptableFields,
} = require("../helpers/helpers");

//Assertion
chai.should();
chai.use(chaiHttp);
const expect = chai.expect;
const assert = chai.assert;
describe("Testing helpers", () => {
  it("Should assign and return the default value ", () => {
    const sortByDefaultValue = "id";
    let sortBy = undefined;
    sortBy = assignDefaultIfUndefined(sortBy, sortByDefaultValue);
    assert.typeOf(sortBy, "string");
    assert.equal(sortBy, "id", "sortBy equals `id`");
  });

  it("Should return an error message if tags are undefined", () => {
    let tags;
    const response = checkTagsExist(tags);
    assert.typeOf(response, "Object");
    assert.equal(
      response.error,
      "Tags parameter is required",
      `error message equals ${response.error}`
    );
  });

  it("should return an error message if fields do not exist", () => {
    const directionFields = {
      desc: true,
      asc: true,
    };
    const direction = "de";
    const directionErr = checkAcceptableFields(
      direction,
      directionFields,
      "direction"
    );
    assert.typeOf(directionErr, "object");
    assert.equal(directionErr.error, "direction parameter is invalid");
  });

  it("Should return an array", async () => {
    const tags = "science,tech";
    const sortBy = "popularity";
    const direction = "desc";

    const response = await getPosts(tags, sortBy, direction);
    assert.typeOf(response, "array");
  });
});

describe("Testing server routes", () => {
  describe("Test GET route for /api/ping", () => {
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

  describe("Test GET route for /api/posts", () => {
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
        .query({ tags: "science,tech", sortBy: "cars" })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("Should return an object with error message if there are no matches for `sortBy` param", (done) => {
      chai
        .request(server)
        .get("/api/posts")
        .query({ tags: "science,tech", sortBy: "cars" })
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
