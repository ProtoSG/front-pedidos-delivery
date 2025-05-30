import { getRankProducto } from '../pedido_producto';

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

describe('Pedido Producto Service', () => {
  const mockApi = 'http://test-api.com';
  const pedidoApi = `${mockApi}/pedido_producto`;
  const mockToken = 'test-token';
  const mockDate = '2024-03-20';

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetItem.mockReturnValue(mockToken);
    global.fetch.mockReset();
  });

  describe('getRankProducto', () => {
    it('should fetch rank producto data successfully', async () => {
      const mockResponse = [
        { id: 1, nombre: 'Producto 1', cantidad: 15 },
        { id: 2, nombre: 'Producto 2', cantidad: 8 }
      ];
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await getRankProducto({ date: mockDate });

      expect(fetch).toHaveBeenCalledWith(`${pedidoApi}/rank_productos/${mockDate}`, {
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

      await getRankProducto({ date: mockDate });

      expect(fetch).toHaveBeenCalledWith(`${pedidoApi}/rank_productos/${mockDate}`, {
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

      await getRankProducto({ date: mockDate });

      expect(fetch).toHaveBeenCalledWith(`${pedidoApi}/rank_productos/${mockDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`
        }
      });
      expect(consoleSpy).toHaveBeenCalledWith(mockError);
      consoleSpy.mockRestore();
    });

    it('should log data rank to console', async () => {
      const mockResponse = [
        { id: 1, nombre: 'Producto 1', cantidad: 15 }
      ];
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      await getRankProducto({ date: mockDate });

      expect(consoleSpy).toHaveBeenCalledWith('DATA RANK: ', mockResponse);
      consoleSpy.mockRestore();
    });
  });
}); 