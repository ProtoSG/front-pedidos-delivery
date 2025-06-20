from sqlalchemy import text
from sqlalchemy.sql import text
from sqlalchemy.sql import get_connection

class PedidoService:
    @classmethod
    def get_pedidos_by_cliente_id(cls, cliente_id):
        try:
            connection = get_connection()
            # Primero, obtener todos los pedidos del cliente
            sql_pedidos = text("SELECT * FROM Pedido WHERE admin_id = :cliente_id ORDER BY fecha_hora DESC")
            pedidos_result = connection.execute(sql_pedidos, {"cliente_id": cliente_id}).fetchall()

            pedidos_list = []
            for pedido_row in pedidos_result:
                pedido_id = pedido_row[0]
                # Para cada pedido, obtener sus productos
                sql_productos = text("""
                    SELECT p.nombre
                    FROM Pedido_Producto pp
                    JOIN Producto p ON pp.producto_id = p.producto_id
                    WHERE pp.pedido_id = :pedido_id
                """)
                productos_result = connection.execute(sql_productos, {"pedido_id": pedido_id}).fetchall()
                
                productos = [{'nombre': p[0]} for p in productos_result]
                
                pedido_data = {
                    'id': pedido_id,
                    'admin_id': pedido_row[1],
                    'fecha_hora': pedido_row[2].isoformat(),
                    'total': float(pedido_row[3]),
                    'estado': pedido_row[4],
                    'productos': productos
                }
                pedidos_list.append(pedido_data)

            return pedidos_list
        except Exception as ex:
            print(f"Error en get_pedidos_by_cliente_id: {ex}")
            return []
        finally:
            if 'connection' in locals() and connection.is_connected():
                connection.close() 