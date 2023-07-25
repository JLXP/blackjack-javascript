//patron modulo
const miModulo = (() => {
  'use strict';

  /**
 * 2C = Two of Clubs
 * 2D = Two of Diamons
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

  //creacion del juego de las barajas

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  //let puntosJugador = 0,
  // puntosComputadora = 0;

  let puntosJugadores = []

  //Referencias del HTML
  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevo = document.querySelector("#btnNuevo");

  const divCartasJugadores = document.querySelectorAll(".divCartas"),
    puntosHTML = document.querySelectorAll("small");

  //Esta funcion incializa el juego
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    puntosHTML.forEach(elem => elem.innerText = 0);
    divCartasJugadores.forEach(elem => elem.innerHTML = '');

    btnPedir.disabled = false;
    btnDetener.disabled = false;


  }

  const crearDeck = () => {

    deck = [];
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
    return deck.sort(() => Math.random() - 0.5);
  };

  //Esta función pide tomar una carta

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }

    //Crea un array pero elimina el ultimo elemento de un array
    return deck.pop();
  };

  //esta funcion devuelve el valor de la carta, ejemplo AQ = 11
  const valorCarta = (carta) => {
    //trae el primer dato de la carta
    const valor = carta.substring(0, carta.length - 1);
    //valida si ese dato es string o numero
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  //Turno: 0 = primer jugador y el último será la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  }

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append(imgCarta);
  }

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores;

    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert("Nadie gana");
      } else if (puntosMinimos > 21) {
        alert("Computadora gana");
      } else if (puntosComputadora > 21) {
        alert("Jugador Gana");
      } else {
        alert("Computadora gana");
      }
    }, 10);
  }

  //Eventos
  //funcion cuando se pide carta
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      console.warn("Lo siento mucho, perdiste");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn("21, genial!");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  //turno de la computadora

  const turnoComputadora = (puntosMinimos) => {

    let puntosComputadora = 0;

    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);

    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();

  };

  //evento para detener el boton

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugadores[0]);
  });

  btnNuevo.addEventListener("click", () => {
    inicializarJuego();
  });

  return {
    nuevoJuego: inicializarJuego()
  };

})();

