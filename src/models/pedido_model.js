export class Pedido{
  constructor(id, total) {
    this.id = id;
    this.total = total;
    this.fecha_hora = Date.now();
  }
}