import { getAdmin, updateAdmin } from '../admin_service';
import { api } from '../../constants/api';

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

describe('Admin Service', () => {
  const mockToken = 'test-token';
  const adminApi = `${api}/admin`;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    mockGetItem.mockReturnValue(mockToken);
  });

  describe('getAdmin', () => {
    it('should fetch admin profile successfully', async () => {
      const mockAdminData = { id: 1, name: 'Admin User' };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockAdminData),
      });

      const result = await getAdmin();

      expect(fetch).toHaveBeenCalledWith(`${adminApi}/profile`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mockToken}`,
        },
      });
      expect(result).toEqual(mockAdminData);
    });

    it('should throw error when fetch fails', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      await expect(getAdmin()).rejects.toThrow('Hubo un problema al enviar la  solicitud 401');
    });
  });

  describe('updateAdmin', () => {
    const mockCheckPassword = 'oldPassword';
    const mockPassword = 'newPassword';

    it('should update admin password successfully', async () => {
      const mockResponse = { message: 'Password updated', success: true };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await updateAdmin(mockCheckPassword, mockPassword);

      expect(fetch).toHaveBeenCalledWith(adminApi, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mockToken}`,
        },
        body: JSON.stringify({ checkPassword: mockCheckPassword, password: mockPassword }),
      });
      expect(result).toEqual({ success: true });
    });

    it('should return error message when update fails', async () => {
      const mockResponse = { message: 'Invalid password', success: false };
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await updateAdmin(mockCheckPassword, mockPassword);

      expect(result).toEqual({ mensaje: 'Invalid password' });
    });

    it('should throw error when success is false', async () => {
      const mockResponse = { message: 'Server error', success: false };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await updateAdmin(mockCheckPassword, mockPassword);

      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe('No se encontro un token en la respuesta del servidor');
    });
  });
}); 