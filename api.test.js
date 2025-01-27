const axios = require("axios");
const {
  API_ENDPOINT,
  API_USERNAME,
  API_PASSWORD,
} = require("../constant/testingConstants");

describe("API Testing with Auth Token and CRUD Operations", () => {
  let authToken;
  let createdUserId;
  it("should allow user to login with correct password ", async () => {
    console.log("API_ENDPOINT: ", API_ENDPOINT);
    const response = await axios.post(`${API_ENDPOINT}/api/login`, {
      email: API_USERNAME,
      password: API_PASSWORD,
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("token");
    authToken = response.data.token;
  });

  it("should not allow user to login with incorrect password", async () => {
    try {
      await axios.post(`${API_ENDPOINT}/api/login`, {
        email: "incorrect username",
        password: "incorrect password",
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toBe("user not found");
    }
  });

  it("should able to create user by using token", async () => {
    const response = await axios.post(
      `${API_ENDPOINT}/api/users`,
      {
        name: "Sample user name",
        job: "Developer",
      },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("id");
    createdUserId = response.data.id;
  });

  it("should retrieve the Created User", async () => {
    createdUserId = 6;
    const response = await axios.get(
      `${API_ENDPOINT}/api/users/${createdUserId}`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    expect(response.status).toBe(200);
    expect(response.data.data.id).toBe(parseInt(createdUserId));
  });

  it("should retrieve the Created User", async () => {
    // Note: As the sample platform API will not real store the created user info, will user a sample one to retrieve
    createdUserId = 6;
    const response = await axios.get(
      `${API_ENDPOINT}/api/users/${createdUserId}`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    expect(response.status).toBe(200);
    expect(response.data.data.id).toBe(parseInt(createdUserId));
  });
});
