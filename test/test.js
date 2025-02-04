const request = require("supertest"),
  chai = require("chai"),
  expect = chai.expect,
  should = chai.should(),
  app = require("../server/server"),
  assert = chai.assert;

describe("User and Event endpoints", function() {
  let _token;
  this.timeout(100000);
  let userLogin;

  beforeEach(async () => {
    let req = {
      email: "user@gmail.com",
      password: "password"
    };

    userLogin = await request(app)
      .post(`/login`)
      .send(req)
      .set("Content-Type", "Application/json")
      .expect(200);

    JSON.parse(userLogin.text).should.have.property("_token");

    _token = JSON.parse(userLogin.text)._token;
  });
  it("should create a user", done => {
    const data = {
      email: "user7@gmail.com",
      password: "password"
    };

    request(app)
      .post("/user")
      .send(data)
      .set("Content-Type", "Application/json")
      .expect(200)
      .then(done())
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.email).to.be.equal("user5@gmail.com");
        done();
      });
  });

  it("should get a user details and events via an email search", async function() {
    const email = "user@gmail.com";

    let data = await request(app)
      .get(`/user/${email}`)
      .set({ Authorization: `Bearer ${_token}` })
      .set("Content-Type", "Application/json")
      .expect(200);

    expect(JSON.parse(data.text).user).to.be.an("object");
    expect(JSON.parse(data.text).events).to.be.an("array");
  });

  it("should login a user", async function() {
    let req = {
      email: "user@gmail.com",
      password: "password"
    };

    let data = await request(app)
      .post(`/login`)
      .send(req)
      .set("Content-Type", "Application/json")
      .expect(200);
    JSON.parse(userLogin.text).should.have.property("_token");
    expect(JSON.parse(data.text)._token).to.be.a("string");
  });

  it("should return status failed if both login input is not passed", async () => {
    let req = { email: "user@gmail.com" };

    let data = await request(app)
      .post("/login")
      .send(req)
      .expect(403);
    expect(JSON.parse(data.text).status).to.be.equal("failed");
  });

  it("should get all the events of a signed in user", async function() {
    let data = await request(app)
      .get(`/event/user`)
      .set({ Authorization: `Bearer ${_token}` })
      .set("Content-Type", "Application/json")
      .expect(200);
    expect(JSON.parse(data.text)).to.be.an("array");
  });

  it("should create an event", async () => {
    let data = {
      location: {
        latLng: {
          lng: -77.598718,
          lat: 38.186986
        },
        address: "Nigeria"
      },
      start: "2019-12-10",
      end: "2020-12-10",
      title: "The lion and the jewel",
      details: "Barooka, Baale of ilujinle stage play"
    };

    let Event = await request(app)
      .post("/event")
      .send(data)
      .set({ Authorization: `Bearer ${_token}` })
      .set("Content-Type", "Application/json")
      .expect(200);

    expect(JSON.parse(Event.text)).to.be.an("object");
  });

  it("should get all event", async () => {
    let events = await request(app)
      .get("/event")
      .expect(200);
    expect(JSON.parse(events.text)).to.be.an("object");
    expect(JSON.parse(events.text).success).to.be.equal(true);
  });

  it("should reject a duplicate event creation", async () => {
    let data = {
      location: {
        latLng: {
          lng: -77.03609,
          lat: 38.89587
        },
        address: "lagos, Nigeria"
      },
      start: "2019-11-05",
      end: "2020-12-05",
      title: "The lion and the jewel",
      details: "Barooka, Baale of ilujinle"
    };

    let Event = await request(app)
      .post("/event")
      .send(data)
      .set({ Authorization: `Bearer ${_token}` })
      .set("Content-Type", "Application/json")
      .expect(500);

    expect(JSON.parse(Event.text)).to.be.an("object");
    expect(JSON.parse(Event.text).success).to.be.equal(false);
  });
});

