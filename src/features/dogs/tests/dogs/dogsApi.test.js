import axios from "axios";

jest.mock("axios");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Mock fetch breeds", () => {
  it("should successfully fetch mock data from the endpoint", async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: [
        "Affenpinscher",
        "Afghan Hound",
        "African Hunting Dog",
        "Airedale",
        "Whippet",
        "Wire-haired Fox Terrier",
        "Yorkshire Terrier",
      ],
    });

    const response = await axios.get(
      "https://frontend-take-home-service.fetch.com/breeds",
      { withCredentials: true }
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    response.data.forEach((item) => {
      expect(typeof item).toBe("string");
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      "https://frontend-take-home-service.fetch.com/breeds",
      { withCredentials: true }
    );
  });
});

describe("Mock search dogs", () => {
  it("should successfully fetch mock search results", async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: {
        next: "",
        resultIds: [
          "PHGFTIcBOvEgQ5OCx8g6",
          "SHGFTIcBOvEgQ5OCx8g6",
          "mXGFTIcBOvEgQ5OCx8g6",
          "oHGFTIcBOvEgQ5OCx8g6",
          "xnGFTIcBOvEgQ5OCx8g6",
          "LXGFTIcBOvEgQ5OCx8g6",
          "L3GFTIcBOvEgQ5OCx8g6",
          "P3GFTIcBOvEgQ5OCx8g6",
          "U3GFTIcBOvEgQ5OCx8g6",
          "iXGFTIcBOvEgQ5OCx8g6",
        ],
        total: 10,
      },
    });

    let testParams = {
      breeds: [],
      zipCodes: [],
      ageMin: "",
      ageMax: "",
      size: 10,
      from: 0,
      sort: "breed:asc",
    };

    const queryParams = new URLSearchParams();
    const isValidZip = (zip) => /^\d{5}$/.test(zip);

    if (testParams.breeds.length) {
      testParams.breeds.forEach((breed) => queryParams.append("breeds", breed));
    }

    if (testParams.zipCodes.length) {
      testParams.zipCodes
        .filter(isValidZip)
        .forEach((zip) => queryParams.append("zipCodes", zip));
    }

    if (testParams.ageMin) queryParams.set("ageMin", testParams.ageMin);
    if (testParams.ageMax) queryParams.set("ageMax", testParams.ageMax);
    if (testParams.size)
      queryParams.set("size", Math.min(testParams.size, 100));
    if (testParams.from) queryParams.set("from", testParams.from);
    if (testParams.sort) queryParams.set("sort", testParams.sort);

    const response = await axios.get(
      `https://frontend-take-home-service.fetch.com/search?${queryParams.toString()}`,
      { withCredentials: true }
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.resultIds)).toBe(true);
    expect(response.data.resultIds.length).toBe(10);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `https://frontend-take-home-service.fetch.com/search?${queryParams.toString()}`,
      { withCredentials: true }
    );
  });
});

describe("Mock postDogs", () => {
  it("should successfully post dog result IDs and return dog details", async () => {
    const mockResultIds = ["PHGFTIcBOvEgQ5OCx8g6", "SHGFTIcBOvEgQ5OCx8g6"];

    axios.post.mockResolvedValue({
      status: 200,
      data: [
        {
          img: "image_url",
          name: "Russ",
          age: 1,
          breed: "African Hunting Dog",
          zip_code: "56235",
          id: "PHGFTIcBOvEgQ5OCx8g6",
        },
      ],
    });

    const response = await axios.post(
      "https://frontend-take-home-service.fetch.com/dogs",
      mockResultIds,
      {
        withCredentials: true,
      }
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data[0]).toHaveProperty("id");
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      "https://frontend-take-home-service.fetch.com/dogs",
      mockResultIds,
      { withCredentials: true }
    );
  });
});

describe("Mock dogs match", () => {
  it("should successfully post match request and return match result", async () => {
    const mockResultIds = ["PHGFTIcBOvEgQ5OCx8g6", "SHGFTIcBOvEgQ5OCx8g6"];
    const mockResultsMatch = { match: "iXGFTIcBOvEgQ5OCx8g6" };

    axios.post.mockResolvedValue({
      status: 200,
      data: mockResultsMatch,
    });

    const response = await axios.post(
      "https://frontend-take-home-service.fetch.com/match",
      mockResultIds,
      {
        withCredentials: true,
      }
    );

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("match", "iXGFTIcBOvEgQ5OCx8g6");
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      "https://frontend-take-home-service.fetch.com/match",
      mockResultIds,
      { withCredentials: true }
    );
  });
});
