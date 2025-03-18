const ELEMENTOS = {
    INPUT_PARTICIPANTE: "participante",
    LISTA_PARTICIPANTES: "listaParticipantes",
    SELECCIONADO: "seleccionado",
    BTN_INCLUIR: "btnIncluir",
    BTN_ELEGIR: "btnElegir"
};

let participantes = [];

function obtenerInputParticipante() {
    return document.getElementById(ELEMENTOS.INPUT_PARTICIPANTE);
}

function esParticipanteValido(participante) {
    const regexParticipante = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return participante !== "" && regexParticipante.test(participante);
}

function limpiarEntrada(input) {
    input.value = "";
    input.focus();
}

function incluirParticipante() {
    const inputParticipante = obtenerInputParticipante();
    const nombreParticipante = inputParticipante.value.trim();

    if (!esParticipanteValido(nombreParticipante)) {
       alert("Por favor, ingrese un nombre válido.");
        limpiarEntrada(inputParticipante);
        return;
    }

    alert("Se incluyó al participante: " + nombreParticipante);
    participantes.push(nombreParticipante);
    actualizarParticipantes();
    limpiarEntrada(inputParticipante);
}

function actualizarParticipantes() {
    const listaParticipantesUl = document.getElementById(ELEMENTOS.LISTA_PARTICIPANTES);
    listaParticipantesUl.innerHTML = "";

    const fragmento = document.createDocumentFragment();

    participantes.forEach(participante => {
        const li = document.createElement("li");
        li.textContent = participante;
        fragmento.appendChild(li);
    });

    listaParticipantesUl.appendChild(fragmento);
}

function elegirParticipante() {
    if (participantes.length === 0) {
        alert("No hay participantes agregados para elegir. Ingresa nombres primero.");
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * participantes.length);
    const participanteElegido = participantes[indiceAleatorio];

    const seleccionadoUl = document.getElementById(ELEMENTOS.SELECCIONADO);
    seleccionadoUl.innerHTML = `<li>${participanteElegido}</li>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const btnIncluir = document.getElementById(ELEMENTOS.BTN_INCLUIR);
    const btnElegir = document.getElementById(ELEMENTOS.BTN_ELEGIR);

    btnIncluir.addEventListener("click", incluirParticipante);
    btnElegir.addEventListener("click", elegirParticipante);
});
