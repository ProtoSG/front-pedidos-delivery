import { getRankExtra } from '../pedido_extra';

jest.mock('../../constants/api', () => ({
  api: 'http://test-api.com'
}));

// Mock fetch and localStorage
global.fetch = jest.fn();
const mockGetItem = jest.fn();
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: mockGetItem
  },
  writable: true
});

describe('Pedido Extra Service', () => {
  const mockApi = 'http://test-api.com';
  const extraApi = `${mockApi}/pedido_extra`;
  const mockToken = 'test-token';
  const mockDate = '2024-03-20';

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetItem.mockReturnValue(mockToken);
    global.fetch.mockReset();
  });

  describe('getRankExtra', () => {
    it('should fetch rank extra data successfully', async () => {
      const mockResponse = [
        { id: 1, nombre: 'Extra 1', cantidad: 10 },
        { id: 2, nombre: 'Extra 2', cantidad: 5 }
      ];
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await getRankExtra({ date: mockDate });

      expect(fetch).toHaveBeenCalledWith(`${extraApi}/rank_extra/${mockDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error when fetch fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      await getRankExtra({ date: mockDate });

      expect(fetch).toHaveBeenCalledWith(`${extraApi}/rank_extra/${mockDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`
        }
      });
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should handle network error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const mockError = new Error('Network error');
      global.fetch.mockRejectedValueOnce(mockError);

      await getRankExtra({ date: mockDate });

      expect(fetch).toHaveBeenCalledWith(`${extraApi}/rank_extra/${mockDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`
        }
      });
      expect(consoleSpy).toHaveBeenCalledWith(mockError);
      consoleSpy.mockRestore();
    });
  });
}); 