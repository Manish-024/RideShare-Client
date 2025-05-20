import { getRequests, postRequest, getAcceptedRides } from '../src/Api/rideApi';
import { API } from '../src/Api/utils';

jest.mock('axios', () => {
  const mockAxios = {
    create: jest.fn(() => mockAxios),
    interceptors: {
      request: { use: jest.fn() },
    },
    get: jest.fn(),
    post: jest.fn(),
  };
  return mockAxios;
});

describe('Regression Testing for rideApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Ensure getRequests still works after recent changes', async () => {
    API.get.mockResolvedValueOnce({ status: 200, data: { requests: [{ id: 1, origin: 'A', destination: 'B' }] } });
    const result = await getRequests();
    expect(result).toEqual({ error: null, data: { requests: [{ id: 1, origin: 'A', destination: 'B' }] } });
    expect(API.get).toHaveBeenCalledWith('/rides/getRequests');
  });

  test('Ensure postRequest still works after recent changes', async () => {
    API.post.mockResolvedValueOnce({ status: 201, data: { success: true } });
    const requestData = { origin: 'A', destination: 'B', seats: 2 };
    const transformedData = { action: requestData, key: undefined };
    const result = await postRequest(requestData);
    expect(result).toEqual({ error: null, data: { success: true } });
    expect(API.post).toHaveBeenCalledWith('/rides/postRequests', transformedData);
  });

  test('Ensure getAcceptedRides still works after recent changes', async () => {
    API.get.mockResolvedValueOnce({ status: 200, data: { rides: [{ id: 1, origin: 'A', destination: 'B' }] } });
    const result = await getAcceptedRides();
    expect(result).toEqual({ error: null, data: { rides: [{ id: 1, origin: 'A', destination: 'B' }] } });
    expect(API.get).toHaveBeenCalledWith('/rides/getAccepetedRides');
  });
});