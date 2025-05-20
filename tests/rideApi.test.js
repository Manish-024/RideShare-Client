import { getRequests, postRequest, getAcceptedRides, postDeclinePayment, getPaymentIntent, getBookedRides, getCoRiders, postRatings, getDriverRides, rideRequest, verifyCode, getPastRides, cancelRide, cancelPublishedRide } from '../src/Api/rideApi';
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

describe('rideApi.js', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getRequests - success', async () => {
    API.get.mockResolvedValueOnce({ status: 200, data: { requests: [] } });
    const result = await getRequests();
    expect(result).toEqual({ error: null, data: { requests: [] } });
    expect(API.get).toHaveBeenCalledWith('/rides/getRequests');
  });

  test('getRequests - failure', async () => {
    API.get.mockRejectedValueOnce(new Error('Network Error'));
    const result = await getRequests();
    expect(result).toEqual({ error: 'Network Error', data: null });
  });

  test('postRequest - success', async () => {
    API.post.mockResolvedValueOnce({ status: 200, data: { success: true } });
    const result = await postRequest({ action: 'accept', key: 'key123' });
    expect(result).toEqual({ error: null, data: { success: true } });
    expect(API.post).toHaveBeenCalledWith('/rides/postRequests', { action: { action: 'accept', key: 'key123' }, key: undefined });
  });

  test('postRequest - failure', async () => {
    API.post.mockRejectedValueOnce(new Error('Server Error'));
    const result = await postRequest('accept', 'key123');
    expect(result).toEqual({ error: 'Server Error', data: null });
  });

  test('getAcceptedRides - success', async () => {
    API.get.mockResolvedValueOnce({ status: 200, data: { rides: [] } });
    const result = await getAcceptedRides();
    expect(result).toEqual({ error: null, data: { rides: [] } });
    expect(API.get).toHaveBeenCalledWith('/rides/getAccepetedRides');
  });

  test('getAcceptedRides - failure', async () => {
    API.get.mockRejectedValueOnce(new Error('Network Error'));
    const result = await getAcceptedRides();
    expect(result).toEqual({ error: 'Network Error', data: null });
  });

});