let participantes = []
let seleccionados = []; 
let audioActual = null;

function agregarParticipante() {
    let nombreParticipante = document.getElementById("nombre").value;
    
    if (nombreParticipante === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    if (participantes.includes(nombreParticipante)) {
        alert("Este nombre ya ha sido ingresado. No puedes agregarlo nuevamente.");
        nombre.value = "";
        return;
    }
    
    participantes.push(nombreParticipante);
    nombre.value = "";
    actualizarParticipantes();

    let botonSortear = document.querySelector(".boton-sortear");

    if (participantes.length >= 4) {
        botonSortear.classList.add("fijo");
    } else {
        botonSortear.classList.remove("fijo");
    }

    let lista = document.getElementById("listaParticipantes");

    if (participantes.length >= 4) {
        lista.classList.add("compacta");
    } else {
        lista.classList.remove("compacta");
    }
}

function actualizarParticipantes() {
    let lista = document.getElementById("listaParticipantes");
    lista.innerHTML = ""; 

    for (let i = 0; i < participantes.length; i++) {
        let li = document.createElement("li");
        li.textContent = participantes[i];
        lista.appendChild(li); 
    }
}

let longitudInicial = participantes.length;
function sortearParticipante() {
    
    if (participantes.length === 0) {
        alert("Necesitas agregar al menos un participante para poder sortear.");
        return;
    }

    const indice = Math.floor(Math.random() * participantes.length);
    const participanteSorteado = participantes[indice];

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `El participante sorteado es ${participanteSorteado}`;

    if (participantes.length === 0) {
        alert("Ya se han sorteado todos los participantes.");
    }

    participantes.splice(indice, 1);
    seleccionados.push(participanteSorteado);
    actualizarParticipantes();

    if (participanteSorteado.trim().toLowerCase() === "johnny silverhand") {
        const audioFragmento = new Audio("assets/johnny1.m4a");
        audioActual = audioFragmento;
        audioFragmento.load();
        audioFragmento.play()
            .then(() => {
                document.getElementById("controles-audio").style.display = "flex";
                document.getElementById("btnPausar").textContent = "Pausar Canción";
            })
            .catch(error => {
                console.error("Error al reproducir el fragmento:", error);
            });

        audioFragmento.addEventListener("ended", () => {
            document.getElementById("controles-audio").style.display = "none";
            mostrarBotonContinuar();
        });
    }

    if (seleccionados.length === longitudInicial.length) {
        mostrarBotonReiniciar();
    }
}

function mostrarBotonContinuar() {
    const contenedor = document.getElementById("continuar-contenedor");
    contenedor.style.display = "flex";
}

function mostrarBotonReiniciar() {
    const botonReiniciar = document.getElementById("botonReiniciar");
    botonReiniciar.style.display = "block";
}

document.getElementById("btnContinuar").addEventListener("click", () => {
    document.getElementById("continuar-contenedor").style.display = "none";

    const audioCompleto = new Audio("./assets/neverfade.m4a");
    audioActual = audioCompleto;
    audioCompleto.load();
    audioCompleto.play()
        .then(() => {
            document.getElementById("controles-audio").style.display = "flex";
            document.getElementById("btnPausar").textContent = "Pausar Canción";
        })
        .catch(error => {
            console.error("Error al reproducir la canción completa:", error);
        });

    audioCompleto.addEventListener("ended", () => {
        document.getElementById("controles-audio").style.display = "none";
    });
});

document.getElementById("btnPausar").addEventListener("click", () => {
    if (audioActual) {
        if (audioActual.paused) {
            audioActual.play()
                .then(() => {
                    document.getElementById("btnPausar").textContent = "Pausar Canción";
                })
                .catch(error => {
                    console.error("Error al reanudar la canción:", error);
                });
        } else {
            audioActual.pause();
            document.getElementById("btnPausar").textContent = "Reanudar Canción";
        }
    }
});

document.getElementById("botonReiniciar").addEventListener("click", reiniciarJuego);

function reiniciarJuego() {
    participantes = [];
    actualizarParticipantes();
    document.getElementById("resultado").innerHTML = ""; 

    const botonSortear = document.querySelector(".boton-sortear");
    botonSortear.classList.remove("fijo");

    document.getElementById("listaParticipantes").classList.remove("compacta");

    document.getElementById("continuar-contenedor").style.display = "none"; 
    document.getElementById("controles-audio").style.display = "none"; 

    const botonSortearNuevo = document.querySelector(".boton-sortear");
    botonSortearNuevo.style.display = "inline-block"; 
}
