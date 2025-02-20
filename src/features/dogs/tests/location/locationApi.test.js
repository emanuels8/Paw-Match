import axios from "axios";

jest.mock("axios");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Mock post locations", () => {
  it("Should return location data", async () => {
    const mockLocationData = [
      {
        city: "Hartford",
        state: "CT",
        latitude: 41.7658,
        longitude: -72.6734,
        zip_code: "06104",
        county: "Hartford",
      },
      {
        city: "Round Lake",
        state: "IL",
        latitude: 42.3536,
        longitude: -88.0934,
        zip_code: "60073",
        county: "Lake",
      },
      {
        city: "Fox Lake",
        state: "IL",
        latitude: 42.3961,
        longitude: -88.1831,
        zip_code: "60041",
        county: "Lake",
      },
    ];

    axios.post.mockResolvedValue({
      status: 200,
      data: mockLocationData,
    });

    const response = await axios.post(
      "https://frontend-take-home-service.fetch.com/locations",
      ["06104", "60073", "60041"]
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBe(3);

    response.data.forEach((item) => {
      expect(item).toHaveProperty("city");
      expect(item).toHaveProperty("state");
      expect(item).toHaveProperty("latitude");
      expect(item).toHaveProperty("longitude");
      expect(item).toHaveProperty("zip_code");
      expect(item).toHaveProperty("county");
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      "https://frontend-take-home-service.fetch.com/locations",
      ["06104", "60073", "60041"]
    );
  });
});

describe("Mock fetch locations and search locations", () => {
  it("should successfully search locations with mock data", async () => {
    const mockSearchResponse = {
      results: [
        {
          city: "Hartford",
          latitude: 41.791776,
          county: "Hartford",
          state: "CT",
          zip_code: "06104",
          longitude: -72.718832,
        },
        {
          city: "New Haven",
          latitude: 41.3083,
          county: "New Haven",
          state: "CT",
          zip_code: "06510",
          longitude: -72.9279,
        },
      ],
      total: 2,
    };

    axios.post.mockResolvedValue({
      status: 200,
      data: mockSearchResponse,
    });

    const requestBody = {
      city: "Hartford",
      states: ["CT"],
      geoBoundingBox: {
        top: { lat: 42, lon: -72 },
        bottom: { lat: 41, lon: -73 },
        left: { lat: 41.5, lon: -73.5 },
        right: { lat: 41.5, lon: -72.5 },
      },
      size: 10,
      from: 0,
    };

    const response = await axios.post(
      "https://frontend-take-home-service.fetch.com/locations/search",
      requestBody
    );

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("results");
    expect(response.data).toHaveProperty("total");
    expect(Array.isArray(response.data.results)).toBe(true);
    expect(typeof response.data.total).toBe("number");

    response.data.results.forEach((item) => {
      expect(item).toHaveProperty("city");
      expect(item).toHaveProperty("state");
      expect(item).toHaveProperty("latitude");
      expect(item).toHaveProperty("longitude");
      expect(item).toHaveProperty("zip_code");
      expect(item).toHaveProperty("county");
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      "https://frontend-take-home-service.fetch.com/locations/search",
      requestBody
    );
  });
});
