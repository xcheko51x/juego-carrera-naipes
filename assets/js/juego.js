// FUNCION ANONIMA AUTOEJECUTABLE
(function () {
    // C -> Treboles
    // H -> Corazones
    // S -> Corazones Negros
    // D -> Diamantes

    // VARIABLES GENERALES
    let baraja = [];
    const cartasLinea = [];
    let contadorBanda = 2;
    const tiposCartas = ['C', 'H', 'S', 'D'];
    const especiales = ['A', 'J', 'Q', 'K'];

    // REFERENCIAS HTML POR ID, CLASS ó DIV
    const divCartasMazo = document.querySelector('#div-cartas-mazo');
    const divLineaTreboles = document.querySelector('#div-linea-treboles');
    const divLineaCorazones = document.querySelector('#div-linea-corazones');
    const divLineaCorazonesNegros = document.querySelector('#div-linea-corazones-negros');
    const divLineaDiamantes = document.querySelector('#div-linea-diamantes');
    const divCartasLinea = document.querySelector('#div-cartas-linea');

    // REFERENCIAS A LOS BOTONES
    const btnNuevo = document.querySelector('#btnNuevo');
    const btnSiguiente = document.querySelector('#btnSiguiente');

    // SECCION DE DEFINICION DE LAS FUNCIONES
    
    // FUNCION QUE CREA LA BARAJA, 
    // SACA LAS QUE ESTARAN EN LA LINEA 
    // Y MUESTRA EN PANTALLA LAS CARTAS INICIALES
    const crearBaraja = () => {
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tiposCartas) {
                baraja.push(i + tipo);
                baraja.push(i + tipo);
            }
        }

        for (let especial of especiales) {
            for (let tipo of tiposCartas) {
                if (especial === 'A') {
                    baraja.push(especial + tipo);
                } else {
                    baraja.push(especial + tipo);
                    baraja.push(especial + tipo);
                }
            }
        }
        baraja = _.shuffle(baraja);
        // console.log(baraja);

        for (let i = 0; i < 12; i++) {
            cartasLinea.push(baraja.pop());
        }
        // console.log(cartasLinea);

        // PARA MOSTRAR LA CARTA DEL MAZO
        muestraCartasInicio('I', divCartasMazo);

        // PARA MOSTRAR LAS CARTAS DE LAS LINEAS
        for (let tipo of tiposCartas) {
            (tipo === 'C') ? muestraCartasInicio(tipo, divLineaTreboles)
                : (tipo === 'H') ? muestraCartasInicio(tipo, divLineaCorazones)
                    : (tipo === 'S') ? muestraCartasInicio(tipo, divLineaCorazonesNegros)
                        : (tipo === 'D') ? muestraCartasInicio(tipo, divLineaDiamantes)
                            : "";
        }

        // PARA MOSTRAR LAS CARTAS DE LA BANDA
        for (let i = 0; i <= 13; i++) {
            // MUESTRA LA PRIMEA Y ULTIMA CARTA DE LA LINEA DE BANDA
            if ((i === 0) || (i === 13)) {
                muestraCartasInicio('CIF', divCartasLinea);
            } else {
                // MUESTRA LAS CARTAS DEL RECORRIDO VALIDAS
                muestraCartasInicio('CL', divCartasLinea);
            }
        }
    }

    // FUNCION QUE MUESTRA LAS CARTAS EN LA PANTALLA SEGUN LOS DATOS RECIBIDOS
    const muestraCartasInicio = (tipoCarta, divLineaCarta) => {
        const imgCarta = document.createElement('img');

        if (tipoCarta === 'I') {
            imgCarta.classList.add('carta', 'carta-mazo');
            imgCarta.src = `assets/cartas/red_back.png`;
            divLineaCarta.append(imgCarta);
        } else if (tipoCarta === 'CIF') {
            imgCarta.classList.add('carta');
            imgCarta.src = `assets/cartas/grey_back.png`;
            divLineaCarta.append(imgCarta);
        } else if (tipoCarta === 'CL') {
            imgCarta.id = 'img-linea';
            imgCarta.classList.add('carta');
            imgCarta.src = `assets/cartas/red_back.png`;
            divLineaCarta.append(imgCarta);
        } else {
            imgCarta.id = `l${tipoCarta.toLowerCase()}`;
            imgCarta.classList.add('carta');
            imgCarta.src = `assets/cartas/A${tipoCarta}.png`;
            divLineaCarta.append(imgCarta);
        }
    }

    // FUNCION QUE COMPRUBRA QUE LINEA AVANZA UN ESPACIO
    const movimientoAdelante = (carta) => {
        const tipoCarta = carta.substring(carta.length - 1, carta.length);
        const arrTreboles = document.querySelectorAll('#lc');
        const arrCorazones = document.querySelectorAll('#lh');
        const arrCorazonesNegros = document.querySelectorAll('#ls');
        const arrDiamantes = document.querySelectorAll('#ld');

        (tipoCarta === 'C') ? adelante(tipoCarta, arrTreboles, divLineaTreboles)
            : (tipoCarta === 'H') ? adelante(tipoCarta, arrCorazones, divLineaCorazones)
                : (tipoCarta === 'S') ? adelante(tipoCarta, arrCorazonesNegros, divLineaCorazonesNegros)
                    : (tipoCarta === 'D') ? adelante(tipoCarta, arrDiamantes, divLineaDiamantes)
                        : "";
    }

    // FUNCION QUE MUESTRA EN PANTALLA LA CARTA QUE ADELANTA SEGUN LOS DATOS RECIBIDOS
    const adelante = (tipoCarta, arrCartasTipo, divLineaTipo) => {
        // console.log(tipoCarta, arrCartasTipo, divLineaTipo);
        if (arrCartasTipo.length === 1) {
            const imgCarta = document.createElement('img');

            arrCartasTipo[0].src = `assets/cartas/grey_back.png`;

            imgCarta.classList.add('carta');
            imgCarta.id = `l${tipoCarta.toLowerCase()}`;
            imgCarta.src = `assets/cartas/A${tipoCarta}.png`;
            divLineaTipo.append(imgCarta);
        } else if (arrCartasTipo.length > 1) {
            for (item of arrCartasTipo) {
                item.src = `assets/cartas/red_back.png`;
            }
            const imgCarta = document.createElement('img');
            imgCarta.classList.add('carta');
            imgCarta.id = `l${tipoCarta.toLowerCase()}`;
            imgCarta.src = `assets/cartas/A${tipoCarta}.png`;
            divLineaTipo.append(imgCarta);
        }

        revisaGanador();
    }

    // FUNCION QUE COMPRUBRA QUE LINEA RETROCEDE UN ESPACIO
    const movimientoAtras = (arrC, arrH, arrS, arrD) => {
        if (
            (arrC.length > contadorBanda) &&
            (arrH.length > contadorBanda) &&
            (arrS.length > contadorBanda) &&
            (arrD.length > contadorBanda)
        ) {
            const cartaBanda = document.querySelectorAll('#img-linea');
            let cartaLinea = cartasLinea.pop();
            cartaBanda[contadorBanda - 2].src = `assets/cartas/${cartaLinea}.png`;
            cartaLinea = cartaLinea.substring(cartaLinea.length - 1, cartaLinea.length);

            contadorBanda++;
            atras(cartaLinea);
        }
    }

    // FUNCION QUE MUESTRA EN PANTALLA LA CARTA QUE RETROCEDE SEGUN LOS DATOS RECIBIDOS
    const atras = (carta) => {
        const cartaAtras = document.querySelectorAll(`#l${carta.toLowerCase()}`);

        cartaAtras[cartaAtras.length - 1].remove();
        cartaAtras[cartaAtras.length - 2].src = `assets/cartas/A${carta}.png`;
    }

    // FUNCION QUE REVISA SI ALGUNA LINEA LLEGO A LA META
    const revisaGanador = () => {
        const arrTreboles = document.querySelectorAll('#lc');
        const arrCorazones = document.querySelectorAll('#lh');
        const arrCorazonesNegros = document.querySelectorAll('#ls');
        const arrDiamantes = document.querySelectorAll('#ld');

        (arrTreboles.length === 14) ? (alert('TREBOLES GANA'), btnSiguiente.disabled = true)
            : (arrCorazones.length === 14) ? (alert('CORAZONES GANA'), btnSiguiente.disabled = true)
                : (arrCorazonesNegros.length === 14) ? (alert('CORAZONES NEGROS GANA'), btnSiguiente.disabled = true)
                    : (arrDiamantes.length === 14) ? (alert('DIAMANTES GANA'), btnSiguiente.disabled = true)
                        : movimientoAtras(arrTreboles, arrCorazones, arrCorazonesNegros, arrDiamantes);
    }

    // FUNCION DEL BOTON NUEVO
    btnNuevo.addEventListener('click', () => {
        location.reload();
    });

    // FUNCION DEL BOTON SIGUIENTE
    btnSiguiente.addEventListener('click', () => {
        if (baraja.length === 0) {
            alert('YA NO HAY CARTAS EN EL MAZO');
            btnSiguiente.disabled = true;
        } else {
            // MUESTRA LA NUEVA CARTA DEL MAZO
            let carta = baraja.pop();
            const imgCarta = document.createElement('img');
            imgCarta.classList.add('carta', 'carta-mazo');
            imgCarta.src = `assets/cartas/${carta}.png`;
            divCartasMazo.append(imgCarta);

            movimientoAdelante(carta);
        }
    });

    // FUNCION QUE INICIALIZA EL JUEGO
    const inicializacion = () => {
        crearBaraja();
    }

    // LAMADA INICIAL DEL JUEGO
    inicializacion();

})();