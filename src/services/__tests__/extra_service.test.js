import {
  postExtra,
  getExtras,
  deleteExtra,
  updateExtra
} from '../extra_service';

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

describe('Extra Service', () => {
  const mockToken = 'test-token';
  const mockApi = 'http://test-api.com';
  const extrasApi = `${mockApi}/extra`;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetItem.mockReturnValue(mockToken);
    global.fetch.mockReset();
  });

  describe('postExtra', () => {
    const mockExtra = {
      nombre: 'Test Extra',
      precio: '10.50',
      imagen_url: 'http://example.com/image.jpg'
    };

    it('should post a new extra successfully', async () => {
      const mockResponse = { id: 1, ...mockExtra, precio: 10.50 };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await postExtra(mockExtra);

      expect(fetch).toHaveBeenCalledWith(extrasApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`
        },
        body: JSON.stringify({
          ...mockExtra,
          precio: 10.50
        }),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error when posting extra fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 400
      });

      await postExtra(mockExtra);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getExtras', () => {
    it('should fetch extras successfully', async () => {
      const mockExtras = [
        { id: 1, nombre: 'Extra 1', precio: 10.50, imagen_url: 'http://example.com/image1.jpg' }
      ];
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockExtras)
      });

      const result = await getExtras();

      expect(fetch).toHaveBeenCalledWith(extrasApi);
      expect(result).toEqual(mockExtras);
    });

    it('should throw error when fetch fails', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      await expect(getExtras()).rejects.toThrow('Hubo un problema al enviar la  solicitud 500');
    });
  });

  describe('deleteExtra', () => {
    const mockId = 1;

    it('should delete extra successfully', async () => {
      const mockResponse = { message: 'Extra deleted' };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await deleteExtra(mockId);

      expect(fetch).toHaveBeenCalledWith(`${extrasApi}/${mockId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${mockToken}`
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error when deleting extra fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await deleteExtra(mockId);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('updateExtra', () => {
    const mockId = 1;
    const mockExtra = {
      nombre: 'Updated Extra',
      precio: '15.75',
      imagen_url: 'http://example.com/updated-image.jpg'
    };

    it('should update extra successfully', async () => {
      const mockResponse = { id: mockId, ...mockExtra, precio: 15.75 };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await updateExtra(mockId, mockExtra.nombre, mockExtra.precio, mockExtra.imagen_url);

      expect(fetch).toHaveBeenCalledWith(`${extrasApi}/${mockId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`
        },
        body: JSON.stringify({
          ...mockExtra,
          precio: 15.75
        }),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error when updating extra fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await updateExtra(mockId, mockExtra.nombre, mockExtra.precio, mockExtra.imagen_url);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
}); 