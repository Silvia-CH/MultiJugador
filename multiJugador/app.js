//----------------------------VARIABLES----------------------------
let body = document.getElementsByTagName('body')[0];

let main = document.getElementsByTagName('main')[0];

let div;

let filas = 5;
let columnas = 5;

// variables de fichas
let jugador1, jugador2, final;

// variables para secciones laterales
let seccion, imagen, wasd, buttons, p, boton;

//     ->contadores
let contador1, contador2, contJug1, contJug2;

// variables para movimiento
let prev, idPrev, after, idAfter, fila, columna, continuar;

// variables para reinicio
let posicion, fin, img, jug1, jug2;


document.addEventListener('load', crearJuego());

document.addEventListener('keydown', mover);


//----------------------------MÉTODOS----------------------------
/**
 * @description esta función se activa cuando se carga 
 *  la página y llama todos los métodos necesarios 
 */
function crearJuego() {
    contJug1 = 0;
    contJug2 = 0;

    main.classList.add('contenedor');

    crearSeccionIzq();
    crearTablero();
    crearSeccionDer();
}

//------------------------Vista de juego------------------------

/**
 * @description crea la estructura del tablero
 */
function crearTablero() {
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            div = document.createElement('div');
            div.classList.add('card');
            div.setAttribute('id', `f${i}c${j}`);

            main.appendChild(div);
            body.appendChild(main);
        }
    }
    colocarFichas();
}

/**
 * @description sección informativa sobre los jugadores
 */
function crearSeccionIzq() {
    seccion = document.createElement('div');
    seccion.classList.add('seccion');

    // IMG JUGADOR1
    div = document.createElement('div');
    div.classList.add('divImg');

    wasd = document.createElement('img');
    wasd.src = 'img/wasd.png';
    wasd.classList.add('imgBtn');

    p = document.createElement('p');
    p.textContent = 'Jugador 1';
    p.classList.add('jugador1');

    div.appendChild(wasd);
    div.appendChild(p);
    seccion.appendChild(div);

    // IMG JUGADOR2
    div = document.createElement('div');
    div.classList.add('divImg');

    buttons = document.createElement('img');
    buttons.src = 'img/buttons.png';
    buttons.classList.add('imgBtn');

    p = document.createElement('p');
    p.textContent = 'Jugador 2';
    p.classList.add('jugador2');

    div.appendChild(buttons);
    div.appendChild(p);
    seccion.appendChild(div);

    body.appendChild(seccion);
}

/**
 * @description sección que contiene los contadores y el botón de reinicio
 */
function crearSeccionDer() {
    div = document.createElement('div');
    div.classList.add('seccion');

    contador1 = document.createElement('p');
    contador1.classList.add('jugador1');
    contador1.textContent = `Jugador 1: ${contJug1} punto(s)`;

    contador2 = document.createElement('p');
    contador2.classList.add('jugador2');
    contador2.textContent = `Jugador 2: ${contJug2} punto(s)`;

    boton = document.createElement('input');
    boton.setAttribute('type', 'button');
    boton.setAttribute('value', 'Reiniciar');
    boton.setAttribute('onclick', 'reiniciarTablero()');

    div.appendChild(contador1);
    div.appendChild(contador2);
    div.appendChild(boton);
    body.appendChild(div);
}

//----------------------------Colocar Fichas----------------------------

/**
 * @description coloca las fichas de forma aleatoria
 */
function colocarFichas() {
    continuar = true;

    final = document.getElementById(`f${randomNum()}c${randomNum()}`);
    final.classList.add('final');

    imagen = document.getElementById(final.getAttribute('id'));
    imagen.classList.add('imagen');

    do {
        jugador1 = document.getElementById(`f${randomNum()}c${randomNum()}`);
    } while (jugador1 == final);
    jugador1.classList.add('jugador1');


    do {
        jugador2 = document.getElementById(`f${randomNum()}c${randomNum()}`);
    } while (jugador2 == final || jugador2 == jugador1);
    jugador2.classList.add('jugador2');

}

/**
 * @returns numero random (entre 0 y 4)
 */
function randomNum() {
    let num = (Math.random() * 4);
    return Math.round(num);
}

//----------------------------Movimientos----------------------------

/**
 * @description comprueba si la tecla presionada es de WASD o las flechas
 * 
 * @param event recoge que tecla se presiona en el teclado 
 * 
 * @returns void (pero el switch da diferente info dependiendo de la tecla)
 */
function mover(event) {
    switch (event['keyCode']) {
        case 87: //w
            movimiento(1, -1, 0, 2);
            break;
        case 65: //a
            movimiento(1, 0, -1, 2);
            break;
        case 83: //s
            movimiento(1, 1, 0, 2);
            break;
        case 68: //d
            movimiento(1, 0, 1, 2);
            break;
        case 38: //ArrowUp
            movimiento(2, -1, 0, 1);
            break;
        case 37: //ArrowLeft
            movimiento(2, 0, -1, 1);
            break;
        case 40: //ArrowDown
            movimiento(2, 1, 0, 1);
            break;
        case 39: //ArrowRight
            movimiento(2, 0, 1, 1);
            break;
    }
}

/**
 * @description según la info dada por la función 'mover', esta función
 *  mueve al jugador cprrespondiente si se cumplen las condiciones
 * 
 * @param numJug -> nº del jugador 
 * @param numFila -> cuantas filas se tiene que mover la ficha
 * @param numCol -> cuantas columnas se tiene que mover la ficha
 * @param numOpuesto -> nº del otro jugador
 */
function movimiento(numJug, numFila, numCol, numOpuesto) {
    if (continuar) {
        prev = 0;
        idPrev = 0;

        after = 0;
        idAfter = 0;
        fila = 0;
        columna = 0;

        prev = document.getElementsByClassName(`jugador${numJug}`)[1];
        idPrev = prev.getAttribute('id');

        fila = Number(idPrev.charAt(1)) + numFila;
        columna = Number(idPrev.charAt(3)) + numCol;

        // condicional de colisión con el borde del tablero
        if ((fila <= 4 && fila >= 0) && (columna <= 4 && columna >= 0)) { 
            idAfter = `f${fila}c${columna}`;
            after = document.getElementById(idAfter);
            if (after.classList.length != 4 && !after.classList.contains(`jugador${numOpuesto}`)) { //CONDICIONAL DE COLISIONES
                after.classList.add(`jugador${numJug}`);
                prev.classList.remove(`jugador${numJug}`);

                comprobarGanador(after);
            }
        }
    }
}

//----------------------------Comprobar Ganador----------------------------

/**
 * @description comprueba ganador y actualiza contadores
 * 
 * @param posicion recoge la posición del último movimiento
 */
function comprobarGanador(posicion) {
    if (posicion.classList.length == 4) {
        if (posicion.classList.contains('jugador1')) {
            contJug1 = contJug1 + 1;
            contador1.textContent = `Jugador 1: ${contJug1} punto(s)`;
        } else if (posicion.classList.contains('jugador2')) {
            contJug2 = contJug2 + 1;
            contador2.textContent = `Jugador 2: ${contJug2} punto(s)`;
        }
        continuar = false;
        setTimeout(reiniciarTablero, 2000);
    }
}

//----------------------------Reinicio----------------------------

/**
 * @description reinicia únicamente las fichas
 */
function reiniciarTablero() {
    fin = document.getElementsByClassName('final')[0];
    fin.classList.remove('final');

    img = document.getElementsByClassName('imagen')[0];
    img.classList.remove('imagen');

    jug1 = document.getElementsByClassName('jugador1')[1];
    jug1.classList.remove('jugador1');

    jug2 = document.getElementsByClassName('jugador2')[1];
    jug2.classList.remove('jugador2');

    colocarFichas();
}