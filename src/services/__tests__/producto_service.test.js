import {
  postProducto,
  getProductos,
  deleteProducto,
  updateProducto
} from '../producto_service';

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

describe('Producto Service', () => {
  const mockApi = 'http://test-api.com';
  const productoApi = `${mockApi}/producto`;
  const mockToken = 'test-token';

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetItem.mockReturnValue(mockToken);
    global.fetch.mockReset();
  });

  describe('postProducto', () => {
    const mockProducto = {
      nombre: 'Test Producto',
      precio: '10.50',
      categoria_id: '1',
      descripcion: 'Test Description',
      imagen_url: 'http://example.com/image.jpg'
    };

    it('should post producto successfully', async () => {
      const mockResponse = { id: 1, ...mockProducto, precio: 10.50, categoria_id: 1 };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await postProducto(mockProducto);

      expect(fetch).toHaveBeenCalledWith(productoApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`
        },
        body: JSON.stringify({
          ...mockProducto,
          precio: 10.50,
          categoria_id: 1
        })
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error when posting producto fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 400
      });

      await postProducto(mockProducto);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getProductos', () => {
    it('should fetch productos successfully', async () => {
      const mockResponse = [
        { id: 1, nombre: 'Producto 1', precio: 10.50, categoria_id: 1 },
        { id: 2, nombre: 'Producto 2', precio: 15.75, categoria_id: 2 }
      ];
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await getProductos();

      expect(fetch).toHaveBeenCalledWith(productoApi);
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when fetch fails', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      await expect(getProductos()).rejects.toThrow('Hubo un problema al enviar la  solicitud 500');
    });
  });

  describe('deleteProducto', () => {
    const mockId = 1;

    it('should delete producto successfully', async () => {
      const mockResponse = { message: 'Producto deleted' };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await deleteProducto(mockId);

      expect(fetch).toHaveBeenCalledWith(`${productoApi}/${mockId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${mockToken}`
        }
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error when deleting producto fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await deleteProducto(mockId);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('updateProducto', () => {
    const mockId = 1;
    const mockProducto = {
      nombre: 'Updated Producto',
      precio: '15.75',
      categoria_id: '2',
      descripcion: 'Updated Description',
      imagen_url: 'http://example.com/updated-image.jpg'
    };

    it('should update producto successfully', async () => {
      const mockResponse = { id: mockId, ...mockProducto, precio: 15.75, categoria_id: 2 };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await updateProducto(
        mockId,
        mockProducto.nombre,
        mockProducto.precio,
        mockProducto.categoria_id,
        mockProducto.descripcion,
        mockProducto.imagen_url
      );

      expect(fetch).toHaveBeenCalledWith(`${productoApi}/${mockId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`
        },
        body: JSON.stringify({
          ...mockProducto,
          precio: 15.75,
          categoria_id: 2
        })
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error when updating producto fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await updateProducto(
        mockId,
        mockProducto.nombre,
        mockProducto.precio,
        mockProducto.categoria_id,
        mockProducto.descripcion,
        mockProducto.imagen_url
      );

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
}); 