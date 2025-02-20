global.localStorage = {
  getItem: jest.fn().mockReturnValue(null),
  setItem: jest.fn(),
  clear: jest.fn(),
};
