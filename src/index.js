// src/index.js
// Interfaz de consola (CLI) del Turnero de Caja
const readline = require("readline");
const { Cola } = require("./cola");

const cola = new Cola();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Convierte rl.question en una función que se puede esperar con await
function preguntar(texto) {
  return new Promise((resolve) => rl.question(texto, resolve));
}

function mostrarMenu() {
  console.log("\n=== TURNERO DE CAJA - GRUPO #9 ===");
  console.log("1. Registrar llegada de cliente");
  console.log("2. Atender siguiente cliente");
  console.log("3. Consultar estado de la fila");
  console.log("4. Salir");
}

// Opción 1: enqueue
async function registrarLlegada() {
  const nombre = (await preguntar("Nombre del cliente: ")).trim();

  if (nombre === "") {
    console.log("⚠ El nombre no puede estar vacío.");
    return;
  }

  const nodo = cola.enqueue(nombre);
  console.log(`✔ Turno #${nodo.turno} registrado para ${nodo.cliente}.`);
  console.log(`  Clientes pendientes: ${cola.tamano}`);
}

// Opción 2: dequeue
function atenderSiguiente() {
  const atendido = cola.dequeue();

  if (atendido === null) {
    console.log("⚠ No hay clientes en espera.");
    return;
  }

  console.log(`✔ Turno #${atendido.turno} - ${atendido.cliente} pasa a CAJA.`);
  console.log(`  Clientes pendientes: ${cola.tamano}`);
}

// Opción 3: consultar
function consultarFila() {
  if (cola.estaVacia()) {
    console.log("La fila está vacía. Pendientes: 0");
    return;
  }

  console.log("--- Clientes en espera ---");
  cola.listar().forEach((item, i) => {
    console.log(`${i + 1}. Turno #${item.turno} - ${item.cliente}`);
  });
  console.log(`Total pendientes: ${cola.tamano}`);
}

async function main() {
  let salir = false;

  while (!salir) {
    mostrarMenu();
    const opcion = (await preguntar("Elige una opción: ")).trim();

    switch (opcion) {
      case "1":
        await registrarLlegada();
        break;
      case "2":
        atenderSiguiente();
        break;
      case "3":
        consultarFila();
        break;
      case "4":
        salir = true;
        console.log("Hasta luego.");
        break;
      default:
        console.log("⚠ Opción no válida. Elige entre 1 y 4.");
    }
  }

  rl.close();
}

main();