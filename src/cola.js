// src/cola.js
// Cola (Queue) FIFO implementada con nodos enlazados.

class Nodo {
  constructor(turno, cliente) {
    this.turno = turno;       // número de turno (ej: 1, 2, 3...)
    this.cliente = cliente;   // nombre del cliente
    this.siguiente = null;    // puntero al siguiente nodo
  }
}

class Cola {
  constructor() {
    this.frente = null;       // primer nodo (el próximo a atender)
    this.final = null;        // último nodo (el que llegó de último)
    this.tamano = 0;          // cantidad de clientes en espera
    this.contadorTurnos = 0;  // genera el número de turno
  }

  // Registrar llegada: agrega al FINAL de la cola
  enqueue(cliente) {
    this.contadorTurnos++;
    const nuevo = new Nodo(this.contadorTurnos, cliente);

    if (this.estaVacia()) {
      this.frente = nuevo;
      this.final = nuevo;
    } else {
      this.final.siguiente = nuevo;
      this.final = nuevo;
    }

    this.tamano++;
    return nuevo;
  }

  // Atender al primero: saca del FRENTE de la cola
  dequeue() {
    if (this.estaVacia()) {
      return null;
    }

    const atendido = this.frente;
    this.frente = this.frente.siguiente;

    if (this.frente === null) {
      this.final = null;
    }

    atendido.siguiente = null;
    this.tamano--;
    return atendido;
  }

  // Ver quién sigue sin sacarlo
  peek() {
    return this.frente;
  }

  estaVacia() {
    return this.tamano === 0;
  }

  // Devuelve los clientes en espera como arreglo
  listar() {
    const lista = [];
    let actual = this.frente;
    while (actual !== null) {
      lista.push({ turno: actual.turno, cliente: actual.cliente });
      actual = actual.siguiente;
    }
    return lista;
  }
}

module.exports = { Nodo, Cola };