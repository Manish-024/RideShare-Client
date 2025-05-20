import { postRequest } from '../src/Api/rideApi';
import { API } from '../src/Api/utils';

jest.mock('axios', () => {
  const mockAxios = {
    create: jest.fn(() => mockAxios),
    interceptors: {
      request: { use: jest.fn() },
    },
    post: jest.fn(),
  };
  return mockAxios;
});

describe('Equivalence Partitioning Tests for postRequest', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Valid input - should succeed', async () => {
    API.post.mockResolvedValueOnce({ status: 200, data: { success: true } });
    const requestData = { origin: 'A', destination: 'B', seats: 2 };
    const transformedData = { action: requestData, key: undefined };
    const result = await postRequest(requestData);
    expect(result).toEqual({ error: null, data: { success: true } });
    expect(API.post).toHaveBeenCalledWith('/rides/postRequests', transformedData);
  });

  test('Invalid input - missing origin', async () => {
    API.post.mockRejectedValueOnce(new Error('Origin is required'));
    const requestData = { destination: 'B', seats: 2 };
    const transformedData = { action: requestData, key: undefined };
    const result = await postRequest(requestData);
    expect(result).toEqual({ error: 'Origin is required', data: null });
    expect(API.post).toHaveBeenCalledWith('/rides/postRequests', transformedData);
  });

  test('Invalid input - seats less than 1', async () => {
    API.post.mockRejectedValueOnce(new Error('Seats must be at least 1'));
    const requestData = { origin: 'A', destination: 'B', seats: 0 };
    const transformedData = { action: requestData, key: undefined };
    const result = await postRequest(requestData);
    expect(result).toEqual({ error: 'Seats must be at least 1', data: null });
    expect(API.post).toHaveBeenCalledWith('/rides/postRequests', transformedData);
  });

  test('Invalid input - missing destination', async () => {
    API.post.mockRejectedValueOnce(new Error('Destination is required'));
    const requestData = { origin: 'A', seats: 2 };
    const transformedData = { action: requestData, key: undefined };
    const result = await postRequest(requestData);
    expect(result).toEqual({ error: 'Destination is required', data: null });
    expect(API.post).toHaveBeenCalledWith('/rides/postRequests', transformedData);
  });
});