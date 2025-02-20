import axios from "axios";

beforeAll(async () => {
  try {
    const response = await axios.post(
      "https://frontend-take-home-service.fetch.com/auth/login",
      {
        name: "Test User",
        email: "test@example.com",
      },
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200) {
      throw new Error("Login failed before running tests");
    }
  } catch (error) {
    throw new Error("Login failed before running tests: " + error.message);
  }
});

describe("Login API", () => {
  it("should successfully login using real API", async () => {
    const response = await axios.post(
      "https://frontend-take-home-service.fetch.com/auth/login",
      {
        name: "Test User",
        email: "test@example.com",
      },
      {
        withCredentials: true,
      }
    );
    expect(response.status).toBe(200);
  });
});
