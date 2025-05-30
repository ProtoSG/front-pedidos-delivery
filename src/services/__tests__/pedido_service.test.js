import {
  postPedido,
  getTotalDias,
  getTotalSemanas,
  getTotalMeses,
  getTotalAnos
} from '../pedido_service';

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

describe('Pedido Service', () => {
  const mockApi = 'http://test-api.com';
  const pedidoApi = `${mockApi}/pedido`;
  const mockToken = 'test-token';

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetItem.mockReturnValue(mockToken);
    global.fetch.mockReset();
  });

  describe('postPedido', () => {
    const mockPedido = {
      total: 100,
      productos: [{ id: 1, cantidad: 2 }],
      extras: [{ id: 1, cantidad: 1 }]
    };

    it('should post pedido successfully', async () => {
      const mockResponse = { id: 1, ...mockPedido };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await postPedido(mockPedido);

      expect(fetch).toHaveBeenCalledWith(pedidoApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockPedido)
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error when posting pedido fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 400
      });

      await postPedido(mockPedido);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getTotalDias', () => {
    it('should fetch total dias successfully', async () => {
      const mockResponse = { total: 1000 };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await getTotalDias();

      expect(fetch).toHaveBeenCalledWith(`${pedidoApi}/datos_dias`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error when fetching total dias fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      await getTotalDias();

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getTotalSemanas', () => {
    it('should fetch total semanas successfully', async () => {
      const mockResponse = { total: 5000 };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await getTotalSemanas();

      expect(fetch).toHaveBeenCalledWith(`${pedidoApi}/datos_semanas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error when fetching total semanas fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      await getTotalSemanas();

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getTotalMeses', () => {
    it('should fetch total meses successfully', async () => {
      const mockResponse = { total: 20000 };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await getTotalMeses();

      expect(fetch).toHaveBeenCalledWith(`${pedidoApi}/datos_meses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error when fetching total meses fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      await getTotalMeses();

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getTotalAnos', () => {
    it('should fetch total anos successfully', async () => {
      const mockResponse = { total: 100000 };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await getTotalAnos();

      expect(fetch).toHaveBeenCalledWith(`${pedidoApi}/datos_anos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error when fetching total anos fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      await getTotalAnos();

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
}); 