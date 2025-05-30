import { login, logout, experiedToken } from '../login_service';

jest.mock('../../constants/api', () => ({
  api: 'http://test-api.com'
}));

// Mock fetch and localStorage
global.fetch = jest.fn();
const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: mockGetItem,
    setItem: mockSetItem,
    removeItem: mockRemoveItem
  },
  writable: true
});

// Mock jose
jest.mock('jose', () => ({
  decodeJwt: jest.fn()
}));

describe('Login Service', () => {
  const mockApi = 'http://test-api.com';
  const loginApi = `${mockApi}/login`;
  const mockCredentials = {
    username: 'testuser',
    password: 'testpass'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch.mockReset();
  });

  describe('login', () => {
    it('should login successfully and store token', async () => {
      const mockToken = 'test-token';
      const mockResponse = {
        mensaje: 'Login exitoso',
        token: mockToken
      };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await login(mockCredentials);

      expect(fetch).toHaveBeenCalledWith(loginApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockCredentials)
      });
      expect(mockSetItem).toHaveBeenCalledWith('token', mockToken);
      expect(result).toEqual({ token: mockToken });
    });

    it('should handle failed login', async () => {
      const mockResponse = {
        mensaje: 'Credenciales inválidas'
      };
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await login(mockCredentials);

      expect(mockSetItem).not.toHaveBeenCalled();
      expect(result).toEqual({ mensaje: 'Credenciales inválidas' });
    });

    it('should handle missing token in response', async () => {
      const mockResponse = {
        mensaje: 'Login exitoso'
      };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await login(mockCredentials);

      expect(mockSetItem).not.toHaveBeenCalled();
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe('No se encontro un token en la respuesta del servidor');
    });
  });

  describe('logout', () => {
    it('should remove token from localStorage', () => {
      logout();
      expect(mockRemoveItem).toHaveBeenCalledWith('token');
    });
  });

  describe('experiedToken', () => {
    it('should return true for expired token', () => {
      const mockToken = 'expired-token';
      mockGetItem.mockReturnValue(mockToken);
      const { decodeJwt } = require('jose');
      decodeJwt.mockReturnValue({
        exp: Math.floor(Date.now() / 1000) - 3600 // expired 1 hour ago
      });

      const result = experiedToken();

      expect(mockGetItem).toHaveBeenCalledWith('token');
      expect(decodeJwt).toHaveBeenCalledWith(mockToken);
      expect(result).toBe(true);
    });

    it('should return false for valid token', () => {
      const mockToken = 'valid-token';
      mockGetItem.mockReturnValue(mockToken);
      const { decodeJwt } = require('jose');
      decodeJwt.mockReturnValue({
        exp: Math.floor(Date.now() / 1000) + 3600 // expires in 1 hour
      });

      const result = experiedToken();

      expect(mockGetItem).toHaveBeenCalledWith('token');
      expect(decodeJwt).toHaveBeenCalledWith(mockToken);
      expect(result).toBe(false);
    });

    it('should handle invalid token', () => {
      const mockToken = 'invalid-token';
      mockGetItem.mockReturnValue(mockToken);
      const { decodeJwt } = require('jose');
      decodeJwt.mockReturnValue(null);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const result = experiedToken();

      expect(mockGetItem).toHaveBeenCalledWith('token');
      expect(decodeJwt).toHaveBeenCalledWith(mockToken);
      expect(consoleSpy).toHaveBeenCalledWith('El token no es válido o no contiene el campo \'exp\'');
      expect(result).toBe(true);
      consoleSpy.mockRestore();
    });

    it('should handle token without exp field', () => {
      const mockToken = 'token-without-exp';
      mockGetItem.mockReturnValue(mockToken);
      const { decodeJwt } = require('jose');
      decodeJwt.mockReturnValue({});

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const result = experiedToken();

      expect(mockGetItem).toHaveBeenCalledWith('token');
      expect(decodeJwt).toHaveBeenCalledWith(mockToken);
      expect(consoleSpy).toHaveBeenCalledWith('El token no es válido o no contiene el campo \'exp\'');
      expect(result).toBe(true);
      consoleSpy.mockRestore();
    });
  });
}); 