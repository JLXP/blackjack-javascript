/**
 * 2C = Two of Clubs
 * 2D = Two of Diamons
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

//creacion del juego de las barajas

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

const crearDeck = () => {
  //Se inicia con 2 por que las barajas empiezan con 2 y 10 por que es el limite
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  //funcion para barajear las cartas
  deck.sort(() => Math.random() - 0.5);
  console.log(deck);
  return deck;
};

crearDeck();

//Esta función pide tomar una carta

const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }

  //Crea un array pero elimina el ultimo elemento de un array
  const carta = deck.pop();
  console.log(carta);
  return carta;
};

pedirCarta();

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

 const valor =  valorCarta(pedirCarta());
 console.log(valor);
