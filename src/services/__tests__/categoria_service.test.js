import {
  postCategoria,
  getCategorias,
  deleteCategoria,
  updateCategoria,
  getRankCategoria
} from '../categoria_service';

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

describe('Categoria Service', () => {
  const mockToken = 'test-token';
  const mockApi = 'http://test-api.com';
  const categoriApi = `${mockApi}/categoria`;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetItem.mockReturnValue(mockToken);
    global.fetch.mockReset();
  });

  describe('postCategoria', () => {
    const mockNombre = 'Test Categoria';

    it('should post a new categoria successfully', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ message: 'Categoria created' })
      });

      await postCategoria({ nombre: mockNombre });

      expect(fetch).toHaveBeenCalledWith(categoriApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mockToken}`,
        },
        body: JSON.stringify({ nombre: mockNombre }),
      });
    });

    it('should handle error when posting categoria fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 401
      });

      await postCategoria({ nombre: mockNombre });

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getCategorias', () => {
    it('should fetch categorias successfully', async () => {
      const mockCategorias = [{ id: 1, nombre: 'Categoria 1' }];
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategorias)
      });

      const result = await getCategorias();

      expect(fetch).toHaveBeenCalledWith(categoriApi);
      expect(result).toEqual(mockCategorias);
    });

    it('should throw error when fetch fails', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      await expect(getCategorias()).rejects.toThrow('Hubo un problema al enviar la  solicitud 500');
    });
  });

  describe('deleteCategoria', () => {
    const mockId = 1;

    it('should delete categoria successfully', async () => {
      const mockResponse = { message: 'Categoria deleted' };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await deleteCategoria(mockId);

      expect(fetch).toHaveBeenCalledWith(`${categoriApi}/${mockId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error when deleting categoria fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await deleteCategoria(mockId);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('updateCategoria', () => {
    const mockId = 1;
    const mockNombre = 'Updated Categoria';

    it('should update categoria successfully', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ message: 'Categoria updated' })
      });

      await updateCategoria(mockId, mockNombre);

      expect(fetch).toHaveBeenCalledWith(`${categoriApi}/${mockId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mockToken}`,
        },
        body: JSON.stringify({ nombre: mockNombre }),
      });
    });

    it('should handle error when updating categoria fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await updateCategoria(mockId, mockNombre);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getRankCategoria', () => {
    const mockDate = '2024-03-20';

    it('should fetch categoria rank successfully', async () => {
      const mockRank = [{ categoria: 'Categoria 1', total: 10 }];
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockRank)
      });

      const result = await getRankCategoria({ date: mockDate });

      expect(fetch).toHaveBeenCalledWith(`${categoriApi}/rank/${mockDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mockToken}`,
        },
      });
      expect(result).toEqual(mockRank);
    });

    it('should handle error when fetching rank fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      await getRankCategoria({ date: mockDate });

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
}); 