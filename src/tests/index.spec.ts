import request from "supertest";
import app from "../index";

describe("Server", () => {
  it("Should return 200 if the server is up", () => {
    request(app).get("/").expect(200);
  });
  it("Should return 404 for unexisting route", () => {
    request(app).get("/asd").expect(404);
  });
});

describe("Image resize", () => {
  it("Returns invalid request query params", () => {
    request(app).get("/api/image/board?height=mksd&width=mkds").expect(404);
  });
  it("Should return 404 for an image not on the server", () => {
    request(app).get("/api/image/someimage?height=300&width=300").expect(404);
  });
});
