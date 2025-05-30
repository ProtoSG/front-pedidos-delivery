import {
  actualizarLocalStorage,
  addProduct,
  addCantidad,
  removeCantidad,
  removeProduct,
  deletePedido
} from '../agregar_producto';

// Mock localStorage
const mockSetItem = jest.fn();
Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: mockSetItem
  },
  writable: true
});

describe('Agregar Producto Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('actualizarLocalStorage', () => {
    it('should update localStorage with pedido and total', () => {
      const pedido = [[], []];
      const total = 100;

      actualizarLocalStorage(pedido, total);

      expect(mockSetItem).toHaveBeenCalledWith('pedido', JSON.stringify(pedido));
      expect(mockSetItem).toHaveBeenCalledWith('total', JSON.stringify(total));
    });
  });

  describe('addProduct', () => {
    let mockSetPedido;
    let mockSetTotal;
    const mockProducto = { id: 1, precio: 10 };
    const mockExtra = { id: 2, precio: 5 };
    let initialPedido;
    const initialTotal = 0;

    beforeEach(() => {
      mockSetPedido = jest.fn();
      mockSetTotal = jest.fn();
      initialPedido = [[], []];
    });

    it('should add a new product to pedido', () => {
      addProduct({
        producto: mockProducto,
        setPedido: mockSetPedido,
        setTotal: mockSetTotal,
        total: initialTotal,
        pedido: initialPedido
      });

      expect(mockSetPedido).toHaveBeenCalledWith([
        [{ ...mockProducto, cantidad: 1, subtotal: mockProducto.precio }],
        []
      ]);
      expect(mockSetTotal).toHaveBeenCalledWith(mockProducto.precio);
    });

    it('should add a new extra to pedido', () => {
      addProduct({
        extra: mockExtra,
        setPedido: mockSetPedido,
        setTotal: mockSetTotal,
        total: initialTotal,
        pedido: initialPedido
      });

      expect(mockSetPedido).toHaveBeenCalledWith([
        [],
        [{ ...mockExtra, cantidad: 1, subtotal: mockExtra.precio }]
      ]);
      expect(mockSetTotal).toHaveBeenCalledWith(mockExtra.precio);
    });

    it('should increment quantity of existing product', () => {
      const existingPedido = [
        [{ ...mockProducto, cantidad: 1, subtotal: mockProducto.precio }],
        []
      ];

      addProduct({
        producto: mockProducto,
        setPedido: mockSetPedido,
        setTotal: mockSetTotal,
        total: mockProducto.precio,
        pedido: existingPedido
      });

      expect(mockSetPedido).toHaveBeenCalledWith([
        [{ ...mockProducto, cantidad: 2, subtotal: mockProducto.precio * 2 }],
        []
      ]);
      expect(mockSetTotal).toHaveBeenCalledWith(mockProducto.precio * 2);
    });
  });

  describe('addCantidad', () => {
    let mockSetPedido;
    let mockSetTotal;
    const mockProducto = { id: 1, precio: 10 };
    const mockExtra = { id: 2, precio: 5 };

    beforeEach(() => {
      mockSetPedido = jest.fn();
      mockSetTotal = jest.fn();
    });

    it('should increment product quantity', () => {
      const pedido = [
        [{ ...mockProducto, cantidad: 1, subtotal: mockProducto.precio }],
        []
      ];

      addCantidad({
        producto: mockProducto,
        setPedido: mockSetPedido,
        setTotal: mockSetTotal,
        total: mockProducto.precio,
        pedido
      });

      expect(mockSetPedido).toHaveBeenCalledWith([
        [{ ...mockProducto, cantidad: 2, subtotal: mockProducto.precio * 2 }],
        []
      ]);
      expect(mockSetTotal).toHaveBeenCalledWith(mockProducto.precio * 2);
    });

    it('should increment extra quantity', () => {
      const pedido = [
        [],
        [{ ...mockExtra, cantidad: 1, subtotal: mockExtra.precio }]
      ];

      addCantidad({
        extra: mockExtra,
        setPedido: mockSetPedido,
        setTotal: mockSetTotal,
        total: mockExtra.precio,
        pedido
      });

      expect(mockSetPedido).toHaveBeenCalledWith([
        [],
        [{ ...mockExtra, cantidad: 2, subtotal: mockExtra.precio * 2 }]
      ]);
      expect(mockSetTotal).toHaveBeenCalledWith(mockExtra.precio * 2);
    });
  });

  describe('removeCantidad', () => {
    let mockSetPedido;
    let mockSetTotal;
    const mockProducto = { id: 1, precio: 10 };
    const mockExtra = { id: 2, precio: 5 };

    beforeEach(() => {
      mockSetPedido = jest.fn();
      mockSetTotal = jest.fn();
    });

    it('should decrement product quantity', () => {
      const pedido = [
        [{ ...mockProducto, cantidad: 2, subtotal: mockProducto.precio * 2 }],
        []
      ];

      removeCantidad({
        producto: mockProducto,
        setPedido: mockSetPedido,
        setTotal: mockSetTotal,
        total: mockProducto.precio * 2,
        pedido
      });

      expect(mockSetPedido).toHaveBeenCalledWith([
        [{ ...mockProducto, cantidad: 1, subtotal: mockProducto.precio }],
        []
      ]);
      expect(mockSetTotal).toHaveBeenCalledWith(mockProducto.precio);
    });

    it('should decrement extra quantity', () => {
      const pedido = [
        [],
        [{ ...mockExtra, cantidad: 2, subtotal: mockExtra.precio * 2 }]
      ];

      removeCantidad({
        extra: mockExtra,
        setPedido: mockSetPedido,
        setTotal: mockSetTotal,
        total: mockExtra.precio * 2,
        pedido
      });

      expect(mockSetPedido).toHaveBeenCalledWith([
        [],
        [{ ...mockExtra, cantidad: 1, subtotal: mockExtra.precio }]
      ]);
      expect(mockSetTotal).toHaveBeenCalledWith(mockExtra.precio);
    });
  });

  describe('removeProduct', () => {
    let mockSetPedido;
    let mockSetTotal;
    const mockProducto = { id: 1, precio: 10, cantidad: 2 };
    const mockExtra = { id: 2, precio: 5, cantidad: 2 };

    beforeEach(() => {
      mockSetPedido = jest.fn();
      mockSetTotal = jest.fn();
    });

    it('should remove a product', () => {
      const pedido = [
        [{ ...mockProducto, cantidad: 2, subtotal: mockProducto.precio * 2 }],
        []
      ];

      removeProduct({
        producto: mockProducto,
        setPedido: mockSetPedido,
        setTotal: mockSetTotal,
        total: mockProducto.precio * 2,
        pedido
      });

      expect(mockSetPedido).toHaveBeenCalledWith([[], []]);
      expect(mockSetTotal).toHaveBeenCalledWith(0);
    });

    it('should remove an extra', () => {
      const pedido = [
        [],
        [{ ...mockExtra, cantidad: 2, subtotal: mockExtra.precio * 2 }]
      ];

      removeProduct({
        extra: mockExtra,
        setPedido: mockSetPedido,
        setTotal: mockSetTotal,
        total: mockExtra.precio * 2,
        pedido
      });

      expect(mockSetPedido).toHaveBeenCalledWith([[], []]);
      expect(mockSetTotal).toHaveBeenCalledWith(0);
    });
  });

  describe('deletePedido', () => {
    let mockSetPedido;
    let mockSetTotal;

    beforeEach(() => {
      mockSetPedido = jest.fn();
      mockSetTotal = jest.fn();
    });

    it('should clear pedido and total', () => {
      deletePedido({
        setPedido: mockSetPedido,
        setTotal: mockSetTotal
      });

      expect(mockSetPedido).toHaveBeenCalledWith([[], []]);
      expect(mockSetTotal).toHaveBeenCalledWith(0);
      expect(mockSetItem).toHaveBeenCalledWith('pedido', JSON.stringify([[], []]));
      expect(mockSetItem).toHaveBeenCalledWith('total', JSON.stringify(0));
    });
  });
}); 