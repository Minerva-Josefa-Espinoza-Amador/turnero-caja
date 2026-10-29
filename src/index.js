// src/index.js
const { Cola } = require("./cola");

const cola = new Cola();

cola.enqueue("Ana");
cola.enqueue("Luis");
cola.enqueue("María");

console.log("En espera:", cola.listar());
console.log("Atendiendo a:", cola.dequeue());
console.log("Sigue:", cola.peek());
console.log("En espera:", cola.listar());
console.log("Tamaño:", cola.tamano);