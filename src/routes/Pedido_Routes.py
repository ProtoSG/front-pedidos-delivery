from flask import Blueprint, request, jsonify
from src.services.pedido_service import Pedido_Service
from flask_jwt_extended import jwt_required, get_jwt_identity

pedido = Blueprint('pedido', __name__)

@pedido.route('/pedido/cliente', methods=['GET'])
@jwt_required()
def listar_pedidos_por_cliente():
    try:
        current_user_id = get_jwt_identity()
        pedidos = Pedido_Service.get_pedidos_by_cliente_id(current_user_id)
        return jsonify(pedidos)
    except Exception as ex:
        return jsonify({'mensaje': f'Error interno del servidor: {str(ex)}'}), 500

@pedido.route('/pedido', methods=['POST'])
@jwt_required()
def registrar_pedido():
    try:
# ... existing code ... 