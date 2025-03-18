const IDS = {
    INPUT_AMIGO: "amigo",
    LISTA_AMIGOS: "listaAmigos",
    RESULTADO: "resultado",
    BTN_ADICCIONAR: "btnAdiccionar",
    BTN_SORTEAR: "btnSortear"
};

let amigos = [];

function obtenerInputAmigo() {
    return document.getElementById(IDS.INPUT_AMIGO);
}

function esNombreValido(nombre) {
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return nombre !== "" && regexNombre.test(nombre);
}

function limpiarCampo(input) {
    input.value = "";
    input.focus();
}

function agregarAmigo() {
    const inputAmigo = obtenerInputAmigo();
    const nombreAmigo = inputAmigo.value.trim();

    if (!esNombreValido(nombreAmigo)) {
       alert("Por favor, inserte un nombre válido.");
        limpiarCampo(inputAmigo);
        return;
    }

    alert("Se agrego el nombre del amigo: " + nombreAmigo);
    amigos.push(nombreAmigo);
    actualizarLista();
    limpiarCampo(inputAmigo);
}

function actualizarLista() {
    const listaAmigosUl = document.getElementById(IDS.LISTA_AMIGOS);
    listaAmigosUl.innerHTML = "";

    const fragment = document.createDocumentFragment();

    amigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        fragment.appendChild(li);
    });

    listaAmigosUl.appendChild(fragment);
}

function sortearAmigo() {
    if (amigos.length === 0) {
        alert("No hay amigos agregados para sortear. Ingresa nombres primero.");
        return;
    }

    const indiceRandom = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceRandom];

    const resultadoUl = document.getElementById(IDS.RESULTADO);
    resultadoUl.innerHTML = `<li>${amigoSorteado}</li>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const btnAdiccionar = document.getElementById(IDS.BTN_ADICCIONAR);
    const btnSortear = document.getElementById(IDS.BTN_SORTEAR);

    btnAdiccionar.addEventListener("click", agregarAmigo);
    btnSortear.addEventListener("click", sortearAmigo);
});