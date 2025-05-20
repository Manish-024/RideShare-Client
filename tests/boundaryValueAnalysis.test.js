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

describe('Boundary Value Analysis Tests for postRequest', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Boundary value - minimum valid seats (1)', async () => {
    API.post.mockResolvedValueOnce({ status: 200, data: { success: true } });
    const requestData = { origin: 'A', destination: 'B', seats: 1 };
    const transformedData = { action: requestData, key: undefined };
    const result = await postRequest(requestData);
    expect(result).toEqual({ error: null, data: { success: true } });
    expect(API.post).toHaveBeenCalledWith('/rides/postRequests', transformedData);
  });

  test('Boundary value - maximum valid seats (10)', async () => {
    API.post.mockResolvedValueOnce({ status: 200, data: { success: true } });
    const requestData = { origin: 'A', destination: 'B', seats: 10 };
    const transformedData = { action: requestData, key: undefined };
    const result = await postRequest(requestData);
    expect(result).toEqual({ error: null, data: { success: true } });
    expect(API.post).toHaveBeenCalledWith('/rides/postRequests', transformedData);
  });

  test('Boundary value - below minimum seats (0)', async () => {
    API.post.mockRejectedValueOnce(new Error('Seats must be at least 1'));
    const requestData = { origin: 'A', destination: 'B', seats: 0 };
    const transformedData = { action: requestData, key: undefined };
    const result = await postRequest(requestData);
    expect(result).toEqual({ error: 'Seats must be at least 1', data: null });
    expect(API.post).toHaveBeenCalledWith('/rides/postRequests', transformedData);
  });

  test('Boundary value - above maximum seats (11)', async () => {
    API.post.mockRejectedValueOnce(new Error('Seats cannot exceed 10'));
    const requestData = { origin: 'A', destination: 'B', seats: 11 };
    const transformedData = { action: requestData, key: undefined };
    const result = await postRequest(requestData);
    expect(result).toEqual({ error: 'Seats cannot exceed 10', data: null });
    expect(API.post).toHaveBeenCalledWith('/rides/postRequests', transformedData);
  });
});